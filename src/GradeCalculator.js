import React, { useState, useEffect } from 'react';

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
    if (weightedAverage >= 90) {
      letterGrade = "A";
      if (weightedAverage >= 93) {
        letterGrade += "+";
      } else if (weightedAverage >= 90.7) {
        letterGrade += "-";
      }
    } else if (weightedAverage >= 80) {
      letterGrade = "B";
      if (weightedAverage >= 86) {
        letterGrade += "+";
      } else if (weightedAverage >= 80.7) {
        letterGrade += "-";
      }
    } else if (weightedAverage >= 70) {
      letterGrade = "C";
      if (weightedAverage >= 76) {
        letterGrade += "+";
      } else if (weightedAverage >= 70.7) {
        letterGrade += "-";
      }
    } else if (weightedAverage >= 60) {
      letterGrade = "D";
      if (weightedAverage >= 66) {
        letterGrade += "+";
      } else if (weightedAverage >= 60.7) {
        letterGrade += "-";
      }
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
      <header className="Home-header">
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
            <button type="delete" onClick={() => deleteRow(index)}>Delete</button>
          </div>
        ))}
        <p>Total Grade: {totalGrade}</p>
        <p>Letter Grade: {currentGrade}</p>
        <button type="submit">Submit</button>
        <button type="button" onClick={addRow}>Add Row</button>
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