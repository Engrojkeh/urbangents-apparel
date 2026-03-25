const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

const upload = multer({ storage: multer.memoryStorage() });

// @route   GET /api/products
// @desc    Get all products
router.get('/', async (req, res) => {
  try {
    const [products] = await db.execute('SELECT * FROM Products');
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/products
// @desc    Create a product
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, stock_quantity, category, size, colors } = req.body;
    let image_url = '';

    if (req.file) {
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'urbangents_products', resource_type: 'auto' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      
      const result = await uploadPromise;
      image_url = result.secure_url;
    }

    const product_id = uuidv4();
    
    await db.execute(
      'INSERT INTO Products (product_id, name, description, price, stock_quantity, category, size, colors, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [product_id, name, description || null, price, stock_quantity, category || null, size || null, colors || null, image_url]
    );

    res.status(201).json({ message: 'Product created successfully', product_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
