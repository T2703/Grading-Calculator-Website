import React, { useState, useEffect } from 'react';
import './GradeCalculator.css';

// The grade calculator page. 
function GradeCalculator() {
  // Creating the assignment object. 
  const [assignmentItself, setAssignmentItself] = useState([
    { name: '', weight: '', grade: '' },
    { name: '', weight: '', grade: '' },
    { name: '', weight: '', grade: '' },
  ]);
  
  // Grade stuff.
  const [calculatedGrades, setCalculatedGrades] = useState([]);
  const [totalGrade, setTotalGrade] = useState(0);
  const [currentGrade, setCurrentGrade] = useState('');


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
    const calculatedAssignments = assignmentItself.map(gradeCalulationForAssignment);
    const totalWeightedGrade = calculatedAssignments.reduce((acc, assignment) => acc + assignment.weightedGrade, 0);
    const totalWeight = calculatedAssignments.reduce((acc, assignment) => acc + assignment.weight, 0);
    const weightedAverage = (totalWeightedGrade / totalWeight).toFixed(2);
    let letterGrade;

  // Checking if the weightedAverage and determining what the currentGrade should be.
  if (weightedAverage >= 93) {
    letterGrade = "A";
  } else if (weightedAverage >= 90) {
    letterGrade = "A-";
  } else if (weightedAverage >= 87) {
    letterGrade = "B+";
  } else if (weightedAverage >= 83) {
    letterGrade = "B";
  } else if (weightedAverage >= 80) {
    letterGrade = "B-";
  } else if (weightedAverage >= 77) {
    letterGrade = "C+";
  } else if (weightedAverage >= 73) {
    letterGrade = "C";
  } else if (weightedAverage >= 70) {
    letterGrade = "C-";
  } else if (weightedAverage >= 67) {
    letterGrade = "D+";
  } else if (weightedAverage >= 63) {
    letterGrade = "D";
  } else if (weightedAverage >= 60) {
    letterGrade = "D-";
  } else {
    letterGrade = "F";
  }

    setCalculatedGrades(calculatedAssignments);
    setTotalGrade(weightedAverage);
    setCurrentGrade(letterGrade)
  };

  // Method to add a new row. 
  const addRow = () => {
    setAssignmentItself((prevAssignments) => [...prevAssignments, { name: '', weight: '', grade: '' }]);
  };

  // Method to delete a row. 
  const deleteRow = (index) => {
    setAssignmentItself((prevAssignments) => prevAssignments.filter((_, i) => i !== index));
  };

  // Calculates the final grade for an assignment.
  function gradeCalulationForAssignment(assignment) {
    const { weight, grade } = assignment;
    return {
      weightedGrade: (weight / 100) * grade,
      weight: weight / 100,
    };
  }

  // The HTML page.
  return (
    <div>
      <header className="Calc-header">
      <p style={{ textAlign: 'center' }}>Grade Calculator  
      <br /> Total Grade: {totalGrade}           
      <br />Letter Grade: {currentGrade}</p>
      <form onSubmit={handleSubmit}>
        {assignmentItself.map((assignment, index) => (
          <div key={index}>
            <input
              type="text"
              name={`assignmentName_${index}`}
              value={assignment.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="Assignment Name (Optional)"
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
export default GradeCalculator;

export function App() {
  return (
    <div>
      <GradeCalculator />
    </div>
  );
}