import React, { useState, useEffect } from 'react';

//(4×1.00+4×2.33+3×4.00+3×2.67) / (4+4+3+3) = 2.38 formula 

// The grade calculator page. 
function GpaCalculator() {
  // Creating the assignment object. 
  const [assignmentItself, setAssignmentItself] = useState([
    { name: '', credits: '', letter: '' },
    { name: '', credits: '', letter: '' },
    { name: '', credits: '', letter: '' },
    { name: '', credits: '', letter: '' },
  ]);
  
  // Grade stuff.
  const [calculatedGrades, setCalculatedGrades] = useState([]);
  const [totalGrade, setTotalGrade] = useState(0);
  const [gpa, setGPA] = useState(0);


  // Handles the changes like the rows for this instance.
  const handleChange = (index, property, value) => {
    setAssignmentItself((prevAssignments) => {
      const newAssignments = [...prevAssignments];
      newAssignments[index] = {
        ...newAssignments[index],
        [property]: value,
      };
      return newAssignments;
    });
  };

  // Handle the on click events.
  const handleSubmit = (event) => {
    event.preventDefault();

    // Calling the math stuff. 
    const calculatedCourseGrade = assignmentItself.map(gradeCalulationForCourse);
    const totalGradePoints = calculatedCourseGrade.reduce((acc, course) => acc + course.courseGrade * course.credits, 0);
    const totalCredits = calculatedCourseGrade.reduce((acc, course) => acc + course.credits, 0);
    const calculatedGPA = totalGradePoints / totalCredits || 0;

    setCalculatedGrades(calculatedCourseGrade);
    setTotalGrade(totalGradePoints);
    setGPA(calculatedGPA);

  };

  // Method to add a new row. 
  const addRow = () => {
    setAssignmentItself((prevAssignments) => [...prevAssignments, { name: '', weight: '', grade: '' }]);
  };

  // Method to delete a row. 
  const deleteRow = (index) => {
    setAssignmentItself((prevAssignments) => prevAssignments.filter((_, i) => i !== index));
  };


  // Calculates the grade for a course.
  function gradeCalulationForCourse(course) {
    const { credits, grade } = course;


    const gradePoints = {
      'A+': 4.0,
      'A': 4.0,
      'A-': 3.67,
      'B+': 3.33,
      'B': 3.0,
      'B-': 2.67,
      'C+': 2.33,
      'C': 2.0,
      'C-': 1.67,
      'D+': 1.33,
      'D': 1.0,
      'D-': 0.67,
      'F': 0.0,
    };

    // Calculations.
    const courseGradePoints = gradePoints[grade.toUpperCase()] || 0;

    return {
      courseGrade: courseGradePoints,
      credits: credits,
    };
  }

  // The HTML page.
  return (
    <div>
      <header className="Home-header">
      <p>GPA Calculator</p>
      <form onSubmit={handleSubmit}>
        {assignmentItself.map((assignment, index) => (
          <div key={index}>
            <input
              type="text"
              name={`assignmentName_${index}`}
              value={assignment.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="Course Name"
            />
            <input
              type="text"
              name={`assignmentWeight_${index}`}
              value={assignment.credits}
              onChange={(e) => handleChange(index, 'credits', e.target.value)}
              placeholder="Credits"
            />
            <input
              type="text"
              name={`grades_${index}`}
              value={assignment.grade}
              onChange={(e) => handleChange(index, 'grade', e.target.value)}
              placeholder="Grade"
            />
            <button type="delete" onClick={() => deleteRow(index)}>Delete</button>
          </div>
        ))}
        <p>GPA: {gpa}</p>
        <button type="submit">Submit</button>
        <button type="button" onClick={addRow}>Add Row</button>
      </form>
      </header>
    </div>
  );
}

// Exports
export default GpaCalculator;

export function App() {
  return (
    <div>
      <GpaCalculator />
    </div>
  );
}