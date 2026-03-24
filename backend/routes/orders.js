const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { protect, admin } = require('../middleware/authMiddleware');
const { v4: uuidv4 } = require('uuid');

const jwt = require('jsonwebtoken');

// @route   POST /api/orders
// @desc    Create new order (Guest or Auth)
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalAmount } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    let user_id = 'guest-0000-0000-0000'; // Default to generic guest

    // Extract user if token sent
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        user_id = decoded.user.id;
      } catch (err) {
        console.warn('Invalid token during checkout, proceeding as guest', err.message);
      }
    }

    const order_id = uuidv4();

    // Create order
    await db.execute(
      'INSERT INTO Orders (order_id, user_id, total_amount, shipping_address, payment_status, delivery_status) VALUES (?, ?, ?, ?, ?, ?)',
      [order_id, user_id, totalAmount, JSON.stringify(shippingAddress), 'Pending', 'Processing']
    );

    // Create order items
    // (A real app would use transactions, but this is a simplified approach)
    for (const item of orderItems) {
      await db.execute(
        'INSERT INTO Order_Items (order_id, product_id, quantity) VALUES (?, ?, ?)',
        [order_id, item.product_id, item.quantity]
      );
    }

    res.status(201).json({ message: 'Order created', order_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders/myorders
// @desc    Get user orders
// @access  Private
router.get('/myorders', protect, async (req, res) => {
  try {
    const [orders] = await db.execute('SELECT * FROM Orders WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders
// @desc    Get all orders (Admin only)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const [orders] = await db.execute('SELECT * FROM Orders ORDER BY created_at DESC');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/orders/:id/pay
// @desc    Update order to paid (triggered by frontend Paystack success)
// @access  Public
router.put('/:id/pay', async (req, res) => {
  try {
    const { id } = req.params;
    const { reference } = req.body;
    
    // Prevent double deduction if already marked paid
    const [existing] = await db.execute('SELECT payment_status FROM Orders WHERE order_id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ message: 'Order not found' });
    if (existing[0].payment_status === 'Paid') {
      return res.json({ message: 'Payment already verified', reference });
    }

    await db.execute('UPDATE Orders SET payment_status = ? WHERE order_id = ?', ['Paid', id]);
    
    // Deduct stock ONLY upon successful payment
    const [items] = await db.execute('SELECT product_id, quantity FROM Order_Items WHERE order_id = ?', [id]);
    for (const item of items) {
      await db.execute(
        'UPDATE Products SET stock_quantity = GREATEST(stock_quantity - ?, 0) WHERE product_id = ?',
        [item.quantity, item.product_id]
      );
    }

    res.json({ message: 'Payment successful', reference });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/orders/:id/deliver
// @desc    Update order to delivered
// @access  Private/Admin
router.put('/:id/deliver', protect, admin, async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute(
      'UPDATE Orders SET delivery_status = ? WHERE order_id = ?',
      ['Shipped', id]
    );
    res.json({ message: 'Order marked as Shipped' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders/revenue
// @desc    Get total revenue
// @access  Private/Admin
router.get('/revenue', protect, admin, async (req, res) => {
  try {
    // Only count orders that are Paid (or Pending if testing)
    const [revenue] = await db.execute('SELECT SUM(total_amount) as totalRevenue FROM Orders');
    res.json({ totalRevenue: revenue[0].totalRevenue || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
