import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePaystackPayment } from 'react-paystack';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Auto-fill from logged-in user if available
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const [formData, setFormData] = useState({
    email: user ? user.email : '',
    fullName: user ? user.name : '',
    address: '',
    city: '',
    state: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const config = {
    reference: (new Date()).getTime().toString(),
    email: formData.email || 'guest@urbangents.com',
    amount: cartTotal * 100, // Paystack operates in kobo (multiply by 100)
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_123456789abcdef', // Safely falls back if missing
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference, order_id) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.put(`${API_URL}/api/orders/${order_id}/pay`, { reference: reference.reference });
      alert('Payment successful! Your order is being processed.');
    } catch (err) {
      console.error('Failed to mark as paid in DB', err);
    } finally {
      clearCart();
      navigate(user ? '/profile' : '/');
    }
  };

  const onClose = () => {
    alert('Payment cancelled. Your order has been saved as Pending.');
    clearCart();
    navigate(user ? '/profile' : '/');
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.address || !formData.phone) {
      return alert("Please fill out all required shipping details.");
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const orderPayload = {
        orderItems: cartItems,
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          phone: formData.phone,
          email: formData.email
        },
        paymentMethod: 'Paystack',
        totalAmount: cartTotal
      };

      const axiosConfig = { headers: {} };
      if (token) axiosConfig.headers.Authorization = `Bearer ${token}`;

      // Create Order in DB (Pending)
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/orders`, orderPayload, axiosConfig);
      const newOrderId = res.data.order_id;
      
      // Trigger Paystack Popup locally
      initializePayment({
         onSuccess: (ref) => onSuccess(ref, newOrderId), 
         onClose: onClose
      });

    } catch (err) {
      alert('Failed to initialize checkout. Please check connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-2 text-center">
        <h2>Your Cart is Empty</h2>
        <button onClick={() => navigate('/shop')} className="btn btn-primary mt-2">Go to Shop</button>
      </div>
    );
  }

  return (
    <div className="container mt-2" style={{ paddingBottom: '4rem' }}>
      <h1 className="text-center" style={{ marginBottom: '2rem', color: 'var(--accent-color)' }}>Secure Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(166,138,100,0.2)', paddingBottom: '0.5rem' }}>Shipping Details</h3>
          
          <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} id="checkout-form">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(166,138,100,0.3)', backgroundColor: 'var(--bg-dark)', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(166,138,100,0.3)', backgroundColor: 'var(--bg-dark)', color: 'white' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Delivery Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(166,138,100,0.3)', backgroundColor: 'var(--bg-dark)', color: 'white' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(166,138,100,0.3)', backgroundColor: 'var(--bg-dark)', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(166,138,100,0.3)', backgroundColor: 'var(--bg-dark)', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(166,138,100,0.3)', backgroundColor: 'var(--bg-dark)', color: 'white' }} />
              </div>
            </div>
          </form>
        </div>

        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(166,138,100,0.2)', paddingBottom: '0.5rem' }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {cartItems.map(item => (
              <div key={item.product_id} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>{item.name} (x{item.quantity})</span>
                <span>₦{(Number(item.price) * item.quantity).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.25rem', fontWeight: 'bold', paddingTop: '1rem', borderTop: '1px solid rgba(166,138,100,0.2)' }}>
            <span>Total to Pay:</span>
            <span style={{ color: 'var(--accent-color)' }}>₦{cartTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
          </div>

          <button 
            type="submit" 
            form="checkout-form" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '2rem', padding: '1rem', fontSize: '1.1rem' }}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay with Paystack'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
