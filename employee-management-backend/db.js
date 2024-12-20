const mysql = require('mysql');

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'db', // Docker service name or default value
  user: process.env.DB_USER || 'root', // MySQL username
  password: process.env.DB_PASSWORD || 'Hasnahasna', // MySQL password
  database: process.env.DB_NAME || 'employee_management', // Database name
  port: process.env.DB_PORT || 3306, // MySQL port (default is 3306)
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1); // Exit process if connection fails
  }
  console.log('Connected to the MySQL database!');
});

module.exports = db;
