import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Form states for new product
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [size, setSize] = useState('');
  const [colors, setColors] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');

        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const [ordersRes, revRes, usersRes, prodRes] = await Promise.all([
          axios.get(`${API_URL}/api/orders`, config),
          axios.get(`${API_URL}/api/orders/revenue`, config),
          axios.get(`${API_URL}/api/auth/users`, config),
          axios.get(`${API_URL}/api/products`)
        ]);
        
        setOrders(ordersRes.data);
        setRevenue(revRes.data.totalRevenue);
        setUsers(usersRes.data);
        setProducts(prodRes.data);
      } catch (err) {
        console.error('Failed to fetch admin data', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchAdminData();
  }, [navigate]);

  const handleProductUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert('Please capture or select an image');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock_quantity', stock);
    formData.append('size', size);
    formData.append('colors', colors);
    formData.append('category', 'general');
    formData.append('image', imageFile);

    try {
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${API_URL}/api/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      alert('Product uploaded successfully!');
      setName(''); setPrice(''); setStock(''); setSize(''); setColors(''); setImageFile(null);
      // Refresh products manually
      const prodRes = await axios.get(`${API_URL}/api/products`);
      setProducts(prodRes.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upload product.');
    }
  };

  const lowStockProducts = products.filter(p => p.stock_quantity > 0 && p.stock_quantity <= 5);
  const outOfStockProducts = products.filter(p => Number(p.stock_quantity) === 0);

  return (
    <div className="container mt-2" style={{ paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ color: 'var(--accent-color)' }}>Admin Headquarters</h2>
        <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} className="btn" style={{ border: '1px solid var(--danger)', color: 'var(--danger)', background: 'transparent' }}>Exit Console</button>
      </div>

      {/* Analytics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-color)' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Revenue</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₦{Number(revenue).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</div>
        </div>
        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #4caf50' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Orders</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{orders.length}</div>
        </div>
        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #2196f3' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Registered Users</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{users.filter(u => u.role === 'shopper' && !u.email.includes('guest_internal')).length}</div>
        </div>
        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', borderLeft: `4px solid ${outOfStockProducts.length > 0 ? 'var(--danger)' : '#ff9800'}` }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Inventory Alerts</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{outOfStockProducts.length} <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>Out</span> | {lowStockProducts.length} <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>Low</span></div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <button className={`btn ${activeTab === 'orders' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('orders')} style={activeTab !== 'orders' ? { backgroundColor: 'var(--bg-secondary)', color: 'white' } : {}}>All Orders</button>
        <button className={`btn ${activeTab === 'users' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('users')} style={activeTab !== 'users' ? { backgroundColor: 'var(--bg-secondary)', color: 'white' } : {}}>Customers</button>
        <button className={`btn ${activeTab === 'inventory' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('inventory')} style={activeTab !== 'inventory' ? { backgroundColor: 'var(--bg-secondary)', color: 'white' } : {}}>Inventory</button>
        <button className={`btn ${activeTab === 'add-product' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('add-product')} style={activeTab !== 'add-product' ? { backgroundColor: 'var(--bg-secondary)', color: 'white' } : {}}>Upload Product</button>
      </div>

      <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: '12px', minHeight: '400px' }}>
        
        {activeTab === 'orders' && (
          <div className="animate-fade-in">
            <h3 style={{ marginBottom: '1.5rem' }}>Order Management</h3>
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>No orders have been placed yet.</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(166,138,100,0.3)', color: 'var(--accent-color)' }}>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Order ID</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Amount</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Payment</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.order_id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>#{o.order_id.substring(0,8)}</td>
                        <td style={{ padding: '1rem' }}>₦{Number(o.total_amount).toLocaleString()}</td>
                        <td style={{ padding: '1rem' }}><span style={{ color: o.payment_status === 'Paid' ? '#4caf50' : '#ff9800' }}>{o.payment_status}</span></td>
                        <td style={{ padding: '1rem' }}>{o.delivery_status}</td>
                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{new Date(o.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="animate-fade-in">
            <h3 style={{ marginBottom: '1.5rem' }}>Customer Directory</h3>
            {users.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>No customers registered yet.</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(166,138,100,0.3)', color: 'var(--accent-color)' }}>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Role</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter(u => !u.email.includes('guest_internal')).map(u => (
                      <tr key={u.user_id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>{u.full_name}</td>
                        <td style={{ padding: '1rem' }}>{u.email}</td>
                        <td style={{ padding: '1rem', color: u.role === 'admin' ? 'var(--accent-color)' : 'white' }}>{u.role.toUpperCase()}</td>
                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{new Date(u.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="animate-fade-in">
            <h3 style={{ marginBottom: '1.5rem' }}>Inventory Status</h3>
            {products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>No products in catalog.</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(166,138,100,0.3)', color: 'var(--accent-color)' }}>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Product</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Price</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Stock Level</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => {
                      const stockVal = Number(p.stock_quantity);
                      let statusColor = '#4caf50';
                      let statusText = 'In Stock';
                      if (stockVal === 0) { statusColor = 'var(--danger)'; statusText = 'Out of Stock'; }
                      else if (stockVal <= 5) { statusColor = '#ff9800'; statusText = 'Low Stock'; }

                      return (
                      <tr key={p.product_id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img src={p.image_url?.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${p.image_url}` : p.image_url} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} alt="" />
                          {p.name}
                        </td>
                        <td style={{ padding: '1rem' }}>₦{Number(p.price).toLocaleString()}</td>
                        <td style={{ padding: '1rem', fontWeight: 'bold', color: statusColor }}>{stockVal} units</td>
                        <td style={{ padding: '1rem' }}><span style={{ backgroundColor: `${statusColor}22`, color: statusColor, padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.8rem' }}>{statusText}</span></td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'add-product' && (
          <div className="animate-fade-in">
            <form onSubmit={handleProductUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Upload New Product</h3>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Product Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(166,138,100,0.3)', backgroundColor: 'var(--bg-dark)', color: 'white' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Price (₦)</label>
                  <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(166,138,100,0.3)', backgroundColor: 'var(--bg-dark)', color: 'white' }} />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Stock Quantity</label>
                  <input type="number" value={stock} onChange={e => setStock(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(166,138,100,0.3)', backgroundColor: 'var(--bg-dark)', color: 'white' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Size Options (Optional)</label>
                <input type="text" placeholder="e.g., S, M, L, XL" value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(166,138,100,0.3)', backgroundColor: 'var(--bg-dark)', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Available Colors (Optional)</label>
                <input type="text" placeholder="e.g., Black, White, Red" value={colors} onChange={e => setColors(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(166,138,100,0.3)', backgroundColor: 'var(--bg-dark)', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Product Image</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  onChange={e => setImageFile(e.target.files[0])}
                  required 
                  style={{ width: '100%', padding: '1.5rem', borderRadius: '4px', border: '1px dashed var(--accent-color)', backgroundColor: 'transparent', color: 'var(--accent-color)' }}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '1rem 3rem' }}>Upload Product</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
