const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

async function run() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'urbangents_db'
    });

    // Check if admin already exists
    const [rows] = await connection.execute('SELECT email FROM Users WHERE email = ?', ['admin@urbangents.com']);
    if (rows.length > 0) {
      console.log('✅ Admin user already exists!');
      process.exit(0);
    }

    const id = uuidv4();
    const hash = await bcrypt.hash('admin123', 10);
    
    await connection.execute(
      'INSERT INTO Users (user_id, full_name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)', 
      [id, 'Super Admin', 'admin@urbangents.com', hash, 'admin']
    );
    
    console.log('✅ Master Admin user securely created! (admin@urbangents.com / admin123)');
    process.exit(0);
  } catch (err) {
    console.error('Failed to create admin:', err.message);
    process.exit(1);
  }
}

run();
