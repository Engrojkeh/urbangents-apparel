const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'urbangents_db'
  });
  
  try {
    await db.execute(`INSERT IGNORE INTO Users (user_id, full_name, email, password_hash, role) VALUES ('guest-0000-0000-0000', 'Guest', 'guest@urbangents.com', 'none', 'shopper')`);
    console.log('✅ Generic Guest user seated in database.');
  } catch(e) {
    console.error(e);
  }
  process.exit();
}
run();
