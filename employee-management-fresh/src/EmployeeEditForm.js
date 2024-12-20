// EmployeeEditForm.js
import React, { useState, useEffect } from 'react';

const EmployeeEditForm = ({ employee, onUpdate }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState(employee);

  useEffect(() => {
    setUpdatedEmployee(employee); // Reset form if employee prop changes
  }, [employee]);

  const handleChange = (e) => {
    setUpdatedEmployee({
      ...updatedEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedEmployee); // Pass updated employee back to the parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={updatedEmployee.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="position"
        value={updatedEmployee.position}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="department"
        value={updatedEmployee.department}
        onChange={handleChange}
        required
      />
      <button type="submit">Update Employee</button>
    </form>
  );
};

export default EmployeeEditForm;
