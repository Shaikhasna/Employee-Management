// src/components/EmployeeCard.js
import React from 'react';
import '../styles/EmployeeCard.css'; // Import CSS for styling

const EmployeeCard = ({ employee }) => {
  return (
    <div className="employee-card">
      <h2>{employee.name}</h2>
      <p>Position: {employee.position}</p>
      <p>Email: {employee.email}</p>
    </div>
  );
};

export default EmployeeCard;
