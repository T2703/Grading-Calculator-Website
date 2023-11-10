import React, { useState } from 'react';

function GradeCalculator() {
  // Rows/Arrays for each one.
  const [assignmentName, setAssignmentName] = useState('');
  const [assignmentWeight, setAssignmentWeight] = useState('');
  const [grades, setGrades] = useState('');
  const [assignmentItself, setAssignmentItself] = useState([]);

  // Handles the change event.
  const handleChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  // Handles the submission.
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new object representing the assignment
    const newAssignment = {
      name: assignmentName,
      weight: assignmentWeight,
      grade: grades,
    };

    // Add the new assignment to the array of assignments
    setAssignmentItself((prevAssignments) => [...prevAssignments, newAssignment]);

  };

  // The HTML return how it returns the contents of the page.
  return (
    <div>
      <p>Calculate My Grades</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="assignmentName"
          value={assignmentName}
          onChange={(e) => handleChange(e, setAssignmentName)}
          placeholder="Assignment Name"
        />
        <input
          type="text"
          name="assignmentWeight"
          value={assignmentWeight}
          onChange={(e) => handleChange(e, setAssignmentWeight)}
          placeholder="Weight"
        />
        <input
          type="text"
          name="grades"
          value={grades}
          onChange={(e) => handleChange(e, setGrades)}
          placeholder="Grade"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GradeCalculator;
