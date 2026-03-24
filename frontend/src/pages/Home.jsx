import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // For now, load dummy data if API fails to fetch.
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/products`);
        // Only show last 3 for 'New Arrivals'
        setProducts(res.data.slice(-3).reverse());
      } catch (err) {
        console.error('Error fetching products', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Redefining Urban Elegance
          </h1>
          <p className="hero-subtitle animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Discover our curated collection of premium male fashion designed for the modern gentleman. Elevate your wardrobe with URBANGENTS APPARELS.
          </p>
          <button 
            className="btn btn-primary animate-fade-up" 
            style={{ animationDelay: '0.5s', fontSize: '1.1rem', padding: '1rem 2.5rem' }}
            onClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })}
          >
            Shop the Collection
          </button>
        </div>
      </div>

      <div id="shop" className="container mt-2">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 className="animate-fade-in" style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>New Arrivals</h2>
            <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>The latest styles curated for you.</p>
          </div>
          <Link to="/shop" style={{ color: 'var(--accent-color)', textDecoration: 'underline', fontSize: '0.9rem', fontWeight: 600 }}>View All</Link>
        </div>
        
        {loading ? (
          <div className="text-center mt-2" style={{ padding: '5rem 0' }}>Loading products...</div>
        ) : (
          <div className="product-grid">
            {products.map((product, index) => (
              <div key={product.product_id} className="product-card" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                <div className="product-image-container">
                  <img 
                    src={product.image_url?.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${product.image_url}` : product.image_url} 
                    alt={product.name} 
                    className="product-image" 
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  {product.size && <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Size: {product.size}</div>}
                  <div className="product-price">₦{Number(product.price).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</div>
                  
                  {product.stock_quantity > 0 ? (
                    <button 
                      className="btn btn-primary" 
                      style={{ marginTop: 'auto', width: '100%' }}
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div style={{ marginTop: 'auto', width: '100%' }}>
                      <div className="badge-sold-out" style={{ display: 'block' }}>Sold Out</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer style={{ backgroundColor: 'var(--bg-primary)', padding: '5rem 2rem 2rem 2rem', marginTop: '5rem', borderTop: '1px solid rgba(166, 138, 100, 0.2)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-header)', color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.8rem', textShadow: '0 0 15px rgba(166,138,100,0.3)' }}>URBANGENTS APPARELS</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>Enhancing sales through premium quality and exceptional style. The number one modern male retail brand.</p>
          </div>
          <div>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Contact Us</h3>
            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '2' }}>
              <li>📍 12 Fashion Avenue, Lekki Phase 1, Lagos, Nigeria</li>
              <li>📞 +234 800 123 4567</li>
              <li>✉️ support@urbangents.com.ng</li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', lineHeight: '2' }}>
              <li><Link to="/shop" style={{ color: 'transition: var(--transition)' }}>Shop Collections</Link></li>
              <li><Link to="/about" style={{ color: 'transition: var(--transition)' }}>About Us</Link></li>
              <li><Link to="/returns" style={{ color: 'transition: var(--transition)' }}>Return Policy</Link></li>
              <li><Link to="/size-guide" style={{ color: 'transition: var(--transition)' }}>Size Guide</Link></li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} URBANGENTS APPARELS. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Home;
