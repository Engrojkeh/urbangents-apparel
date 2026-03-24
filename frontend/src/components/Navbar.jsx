import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const location = useLocation();

  // Hide the shopper navbar completely on admin pages
  if (location.pathname.startsWith('/admin') || location.pathname === '/login') {
    return null; 
  }

  return (
    <nav className="navbar" style={{ background: 'transparent', borderBottom: 'none' }}>
      <div className="nav-brand">
        <Link to="/">URBANGENTS APPARELS</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart {cartCount > 0 && <span className="badge-sold-out">{cartCount}</span>}</Link>
        <Link to="/profile" title="My Account" style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
