const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function init() {
  try {
    console.log('Connecting to MySQL (Default XAMPP credentials: root, no password)...');
    
    // Connect without a specific database to create it first
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    const dbName = process.env.DB_NAME || 'urbangents_db';
    console.log(`Creating database: ${dbName}...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    
    console.log(`Switching to database: ${dbName}...`);
    await connection.query(`USE \`${dbName}\`;`);

    console.log('Reading schema.sql...');
    const schemaPath = path.join(__dirname, '..', 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    // Execute queries
    console.log('Executing tables creation...');
    const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);
    
    for (let statement of statements) {
      if (statement) {
        await connection.query(statement);
      }
    }
    
    console.log('✅ Database schema initialized successfully!');
    
    // Ensure uploads directory exists
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)){
        fs.mkdirSync(uploadsDir);
        console.log('✅ Created backend/uploads directory for product images.');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to initialize database:', error.message);
    console.error('Please make sure XAMPP (MySQL) is running in the background!');
    process.exit(1);
  }
}

init();
