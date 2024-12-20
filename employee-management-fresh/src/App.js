import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import axios from 'axios';

// EmployeeForm Component
const EmployeeForm = ({ onSubmit, existingEmployee }) => {
  const [employee, setEmployee] = useState(
    existingEmployee || { name: "", position: "", department: "" }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!employee.name) newErrors.name = "Name is required";
    if (!employee.position) newErrors.position = "Position is required";
    if (!employee.department) newErrors.department = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(employee);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={employee.name}
          onChange={handleChange}
        />
        {errors.name && <small className="text-danger">{errors.name}</small>}
      </div>

      <div className="mb-3">
        <label htmlFor="position" className="form-label">Position</label>
        <input
          type="text"
          id="position"
          className="form-control"
          value={employee.position}
          onChange={handleChange}
        />
        {errors.position && <small className="text-danger">{errors.position}</small>}
      </div>

      <div className="mb-3">
        <label htmlFor="department" className="form-label">Department</label>
        <input
          type="text"
          id="department"
          className="form-control"
          value={employee.department}
          onChange={handleChange}
        />
        {errors.department && <small className="text-danger">{errors.department}</small>}
      </div>

      <button type="submit" className="btn btn-success w-100">
        {existingEmployee ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
};

// EmployeeList Component with Search Feature
const EmployeeList = ({ employees, onEdit, onDelete, searchQuery }) => {
  const filteredEmployees = employees.filter((emp) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      emp.name.toLowerCase().includes(searchTerm) ||
      emp.position.toLowerCase().includes(searchTerm) ||
      emp.department.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div>
      <h3>Employee List</h3>
      <ul className="list-group">
        {filteredEmployees.map((emp, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {emp.name} - {emp.position} ({emp.department})
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => onEdit(emp)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(emp.name)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main App Component
const App = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch employees from backend
  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  const handleEmployeeSubmit = (formData) => {
    if (editingEmployee) {
      const updatedEmployees = employees.map((emp) =>
        emp.name === editingEmployee.name ? formData : emp
      );
      setEmployees(updatedEmployees);
    } else {
      setEmployees([...employees, formData]);
    }
    setEditingEmployee(null);
    navigate("/employee-list");
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    navigate("/add-employee");
  };

  const handleDeleteEmployee = (name) => {
    setEmployees(employees.filter((emp) => emp.name !== name));
  };

  return (
    <div className="App">
      {/* Background Video */}
      <video autoPlay muted loop className="video-background">
        <source src="/videos/background-video.mp4" type="video/mp4" />
      </video>

      <div className="container mt-5">
        <h1 className="mb-4 text-center">Employee Management System</h1>
        <Routes>
          <Route
            path="/add-employee"
            element={
              <EmployeeForm
                onSubmit={handleEmployeeSubmit}
                existingEmployee={editingEmployee}
              />
            }
          />
          <Route
            path="/employee-list"
            element={
              <div>
                {/* Search Bar */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Employees"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                {/* Employee List */}
                <EmployeeList
                  employees={employees}
                  onEdit={handleEditEmployee}
                  onDelete={handleDeleteEmployee}
                  searchQuery={searchQuery}
                />
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div className="text-center">
                <h3>Welcome to the Employee Management System</h3>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => navigate("/add-employee")}
                >
                  Add Employee
                </button>
                <button
                  className="btn btn-secondary mt-3 ms-2"
                  onClick={() => navigate("/employee-list")}
                >
                  View Employees
                </button>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
