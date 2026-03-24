const mysql = require('mysql2/promise');
require('dotenv').config();

async function fix() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'urbangents_db'
  });

  try {
    await db.query('ALTER TABLE Products ADD COLUMN size VARCHAR(50);');
    console.log('✅ Added missing "size" column to Products table.');
  } catch(e) {
    if (e.code === 'ER_DUP_FIELDNAME') {
      console.log('✅ "size" column already exists in Products table.');
    } else {
      console.error('Error:', e.message);
    }
  }
  
  process.exit();
}

fix();
