import React, { useState, useEffect } from 'react';

// The grade calculator page. 
function GradeCalculator() {
  const [assignmentItself, setAssignmentItself] = useState([
    { name: '', weight: '', grade: '' },
    { name: '', weight: '', grade: '' },
    { name: '', weight: '', grade: '' },
  ]);
  
  const [calculatedGrades, setCalculatedGrades] = useState([]);

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

    const calculatedAssignments = assignmentItself.map(gradeCalulationForAssignment);
    setCalculatedGrades(calculatedAssignments);
    console.log("Calculated Grades:", calculatedAssignments);
  };

  const addRow = () => {
    setAssignmentItself((prevAssignments) => [...prevAssignments, { name: '', weight: '', grade: '' }]);
  };

  function gradeCalulationForAssignment(assignment) {
    const { weight, grade } = assignment;
    const newWeight = weight / 100;
    const finalGrade = newWeight * grade;
    return finalGrade; 
  }

  return (
    <div>
      <p>Grade Calculator</p>
      <form onSubmit={handleSubmit}>
        {assignmentItself.map((assignment, index) => (
          <div key={index}>
            <input
              type="text"
              name={`assignmentName_${index}`}
              value={assignment.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="Assignment Name"
            />
            <input
              type="text"
              name={`assignmentWeight_${index}`}
              value={assignment.weight}
              onChange={(e) => handleChange(index, 'weight', e.target.value)}
              placeholder="Weight"
            />
            <input
              type="text"
              name={`grades_${index}`}
              value={assignment.grade}
              onChange={(e) => handleChange(index, 'grade', e.target.value)}
              placeholder="Grade"
            />
            <p>Calculated Grade: {calculatedGrades[index]}</p>
          </div>
        ))}
        <button type="submit">Submit</button>
        <button type="button" onClick={addRow}>Add Row</button>
      </form>
    </div>
  );
}

export default GradeCalculator;

export function App() {
  return (
    <div>
      <GradeCalculator />
    </div>
  );
}