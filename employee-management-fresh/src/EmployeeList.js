import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  const [fetchedEmployees, setFetchedEmployees] = useState(employees);

  useEffect(() => {
    // Fetch employee data from the backend when the component mounts
    if (employees.length === 0) {
      axios.get('http://localhost:5000/employees')
        .then((response) => {
          setFetchedEmployees(response.data);
        })
        .catch((error) => {
          console.error('Error fetching employees:', error);
        });
    }
  }, [employees]);

  return (
    <div>
      <h2>Employee List</h2>
      {fetchedEmployees.length === 0 ? (
        <p>No employees available.</p>
      ) : (
        <ul>
          {fetchedEmployees.map((employee, index) => (
            <li key={index}>
              <strong>{employee.name}</strong> - {employee.email} - {employee.position}
              <button onClick={() => onEdit(employee)}>Edit</button>
              <button onClick={() => onDelete(employee.name)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeList;
