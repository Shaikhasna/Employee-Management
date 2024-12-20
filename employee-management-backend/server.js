const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

// Import the database connection
const db = require('./db');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Routes

// Home route: Render the main page with employee data
app.get('/', (req, res) => {
  const query = 'SELECT * FROM employees';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving employees:', err.message);
      return res.status(500).send('Error retrieving employees');
    }
    res.render('index', { employees: results });
  });
});

// API route: Get all employees
app.get('/api/employees', (req, res) => {
  const query = 'SELECT * FROM employees';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving employees:', err.message);
      return res.status(500).json({ error: 'Error retrieving employees' });
    }
    res.json(results);
  });
});

// API route: Add a new employee
app.post('/api/employees', (req, res) => {
  const { name, position, department } = req.body;
  const query = 'INSERT INTO employees (name, position, department) VALUES (?, ?, ?)';
  db.query(query, [name, position, department], (err, results) => {
    if (err) {
      console.error('Error adding employee:', err.message);
      return res.status(500).json({ error: 'Error adding employee' });
    }
    res.status(201).json({
      id: results.insertId,
      name,
      position,
      department,
    });
  });
});

// API route: Update an employee
app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, position, department } = req.body;
  const query = 'UPDATE employees SET name = ?, position = ?, department = ? WHERE id = ?';
  db.query(query, [name, position, department, id], (err) => {
    if (err) {
      console.error('Error updating employee:', err.message);
      return res.status(500).json({ error: 'Error updating employee' });
    }
    res.json({ message: 'Employee updated successfully' });
  });
});

// API route: Delete an employee
app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM employees WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting employee:', err.message);
      return res.status(500).json({ error: 'Error deleting employee' });
    }
    res.json({ message: 'Employee deleted successfully' });
  });
});

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
