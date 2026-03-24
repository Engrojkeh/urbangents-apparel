const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

async function test() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'urbangents_db'
  });
  
  try {
    const product_id = uuidv4();
    const name = "Test Tee";
    const description = null;
    const price = "16000";
    const stock_quantity = "13";
    const category = "general";
    const size = "L to XXL";
    const image_url = "/uploads/test.png";
    
    await db.execute(
      'INSERT INTO Products (product_id, name, description, price, stock_quantity, category, size, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [product_id, name, description || null, price, stock_quantity, category || null, size || null, image_url]
    );
    console.log("SUCCESS");
  } catch(e) {
    console.error("FAILED:", e.message);
  }
  process.exit();
}
test();
