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

    // Calling the math stuff & doing more calculations. 
    const calculatedCourseGrade = assignmentItself.map(gradeCalulationForCourse);
    const totalGradePoints = calculatedCourseGrade.reduce((acc, course) => acc + course.courseGrade * course.credits, 0);
    const totalCredits = calculatedCourseGrade.reduce((acc, course) => acc + course.credits, 0);
    const calculatedGPA = (totalGradePoints / totalCredits || 0).toFixed(2);

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
  
    // Ensure that credits is treated as a number
    const numericCredits = parseFloat(credits) || 0;
    
  
    // Calculations & Default value.
    const courseGradePoints = gradePoints[(grade || 'A+').toUpperCase()] || 0;
  
    return {
      courseGrade: courseGradePoints,
      credits: numericCredits,
    };
  }

  // The HTML page.
  return (
    <div>
      <header className="Calc-header">
      <p style={{ textAlign: 'center' }}>GPA Calculator <br /> GPA: {gpa}</p>
      <form onSubmit={handleSubmit}>
        {assignmentItself.map((assignment, index) => (
          <div key={index}>
            <input
              type="text"
              name={`assignmentName_${index}`}
              value={assignment.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="Course Name (Optional)"
            />
            <input
              type="text"
              name={`assignmentWeight_${index}`}
              value={assignment.credits}
              onChange={(e) => handleChange(index, 'credits', e.target.value)}
              placeholder="Credits"
            />
            <select
                name={`grades_${index}`}
                value={assignment.grade}
                onChange={(e) => handleChange(index, 'grade', e.target.value)}
              >
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="D-">D-</option>
                <option value="F">F</option>
              </select>
            <button type="delete" onClick={() => deleteRow(index)}>Delete</button>
          </div>
        ))}
        <div className='button-container'>
        <button type="submit">Calculate</button>
        <button type="button" onClick={addRow}>Add Row</button>
        </div>
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