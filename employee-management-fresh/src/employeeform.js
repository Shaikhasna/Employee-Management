import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ onSubmit, existingEmployee }) => {
  // State to manage form fields, pre-populated if editing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
  });

  // Populate form with existing employee data when editing
  useEffect(() => {
    if (existingEmployee) {
      setFormData({
        name: existingEmployee.name || '',
        email: existingEmployee.email || '',
        position: existingEmployee.position || '',
      });
    }
  }, [existingEmployee]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the parent function (add or update)
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{existingEmployee ? 'Edit Employee' : 'Add Employee'}</h2>

      <label style={{color:'white'}}>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>Position:</label>
      <input
        type="text"
        name="position"
        value={formData.position}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {existingEmployee ? 'Update Employee' : 'Add Employee'}
      </button>
    </form>
  );
};

export default EmployeeForm;
