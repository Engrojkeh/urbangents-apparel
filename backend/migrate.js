const fs = require('fs');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function migrate() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 4000,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: true },
      multipleStatements: true
    });

    console.log('Connected to TiDB Serverless successfully.');
    
    let sql = fs.readFileSync('../schema.sql', 'utf8');
    
    // Remove database creation specific to local setups that might block TiDB
    sql = sql.replace(/CREATE DATABASE IF NOT EXISTS urbangents_db;/g, '');
    sql = sql.replace(/USE urbangents_db;/g, '');

    console.log('Executing schema.sql...');
    await connection.query(sql);
    console.log('Schema migrated successfully!');

    await connection.end();
  } catch (error) {
    console.error('Error migrating database:', error.message);
  }
}

migrate();
