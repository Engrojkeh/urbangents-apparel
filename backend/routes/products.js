const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Multer Config for Image Uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Images only!');
    }
  }
});

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
    const { name, description, price, stock_quantity, category, size } = req.body;
    let image_url = '';

    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }

    const product_id = uuidv4();
    
    await db.execute(
      'INSERT INTO Products (product_id, name, description, price, stock_quantity, category, size, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [product_id, name, description || null, price, stock_quantity, category || null, size || null, image_url]
    );

    res.status(201).json({ message: 'Product created successfully', product_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
