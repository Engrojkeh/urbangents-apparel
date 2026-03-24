import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    if (!localStorage.getItem('token') || !user) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/orders/myorders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="container mt-2" style={{ paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="animate-fade-in" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>My Account</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user.name}!</p>
        </div>
        <button onClick={handleLogout} className="btn" style={{ padding: '0.5rem 1.5rem', border: '1px solid var(--danger)', color: 'var(--danger)', backgroundColor: 'transparent' }}>
          Logout
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: '12px' }}>
        <h3 style={{ borderBottom: '1px solid rgba(166, 138, 100, 0.2)', paddingBottom: '1rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
          Order History
        </h3>

        {loading ? (
          <p style={{ color: 'var(--text-secondary)' }}>Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>You haven't placed any orders yet.</p>
            <button onClick={() => navigate('/shop')} className="btn btn-primary">Start Shopping</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map((order) => (
              <div key={order.order_id} style={{ border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'var(--bg-dark)', padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Order ID</div>
                    <div style={{ fontWeight: 600, letterSpacing: '1px' }}>#{order.order_id.substring(0, 8).toUpperCase()}</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Date</div>
                    <div>{new Date(order.created_at).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Status</div>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '50px', 
                      fontSize: '0.8rem', 
                      fontWeight: 600,
                      backgroundColor: order.delivery_status === 'Delivered' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(212, 175, 55, 0.1)',
                      color: order.delivery_status === 'Delivered' ? '#4caf50' : 'var(--accent-color)'
                    }}>
                      {order.delivery_status}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Total Amount</div>
                    <div style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '1.1rem' }}>₦{Number(order.total_amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
