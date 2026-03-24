const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'urbangents_db'
    });
    const [rows] = await db.query('SELECT product_id, name, image_url FROM Products');
    console.log("DB ROWS:", rows);
  } catch(e) {
    console.error("DB ERROR:", e.message);
  }
  process.exit();
}
check();
