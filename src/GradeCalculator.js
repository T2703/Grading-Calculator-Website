import React, { useState, useEffect } from 'react';

function GradeCalculator() {
  // Rows/Arrays for each one.
  const [assignmentName, setAssignmentName] = useState('');
  const [assignmentWeight, setAssignmentWeight] = useState('');
  const [grades, setGrades] = useState('');
  const [assignmentItself, setAssignmentItself] = useState([]);

  // Handles the change event.
  const handleChange = (event, field) => {
    const [property, index] = field.split('_');
    setAssignmentItself((prevAssignments) => {
      const newAssignments = [...prevAssignments];
      newAssignments[index] = {
        ...newAssignments[index],
        [property]: event.target.value,
      };
      return newAssignments;
    });
  };

  // Start off with 3 rows.
  useEffect(() => {
    setAssignmentItself([
      { name: '', weight: '', grade: '' },
      { name: '', weight: '', grade: '' },
      { name: '', weight: '', grade: '' },
    ]);
  }, []);

  const AssignmentRow = ({ assignment, index, handleChange }) => (
    <div key={index}>
      <input
        type="text"
        name={`assignmentName_${index}`}
        value={assignment.name}
        onChange={(e) => handleChange(e, `name_${index}`)}
        placeholder="Assignment Name"
      />
      <input
        type="text"
        name={`assignmentWeight_${index}`}
        value={assignment.weight}
        onChange={(e) => handleChange(e, `weight_${index}`)}
        placeholder="Weight"
      />
      <input
        type="text"
        name={`grades_${index}`}
        value={assignment.grade}
        onChange={(e) => handleChange(e, `grade_${index}`)}
        placeholder="Grade"
      />
    </div>
  );

  // Handles the submission.
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new object representing the assignment.
    const newAssignment = {
      name: assignmentName,
      weight: assignmentWeight,
      grade: grades,
    };

    // Add the new assignment to the array of assignments.
    setAssignmentItself((prevAssignments) => [...prevAssignments, newAssignment]);

  };

  // Adds a new empty row.
  const addRow = () => {
        setAssignmentItself((prevAssignments => [...prevAssignments, {nmae: '', weight: '', grade: ''}]));
  };

  // The HTML return how it returns the contents of the page.
  return (
    <div>
      <p>Calculate My Grades</p>
      <form onSubmit={handleSubmit}>
        {assignmentItself.map((assignment, index) => (
          <AssignmentRow
            key={index}
            assignment={assignment}
            index={index}
            handleChange={handleChange}
          />
        ))}
        <button type="submit">Submit</button>
        <button type="button" onClick={addRow}>
          Add Row
        </button>
      </form>
    </div>
  );
}

export default GradeCalculator;
