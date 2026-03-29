import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ugLogo from '../assets/ug-logo.jpg';

const Navbar = () => {
  const { cartCount } = useCart();
  const location = useLocation();

  // Hide the shopper navbar completely on admin pages
  if (location.pathname.startsWith('/admin') || location.pathname === '/login') {
    return null; 
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-10 py-4 transition-all duration-500 bg-transparent border-none">
      
      {/* LEFT: Logo & Brand Name */}
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <img 
          src={ugLogo} 
          alt="UG Logo" 
          className="h-8 md:h-10 w-auto object-contain mix-blend-screen" 
        />
        <span className="text-[10px] md:text-[13px] font-serif text-[#e1c298] tracking-widest font-bold uppercase max-w-[90px] md:max-w-none leading-tight">
          Urbangents<br className="md:hidden"/> Apparels
        </span>
      </Link>

      {/* RIGHT: Navigation Icons */}
      <div className="flex items-center gap-5 md:gap-8">
        <Link to="/" className="text-[#c9bda5] hover:text-[#e1c298] transition-colors flex items-center justify-center p-1" title="Home">
          <span className="material-symbols-outlined text-[20px] md:text-[22px] font-light">home</span>
        </Link>
        <Link to="/shop" className="text-[#c9bda5] hover:text-[#e1c298] transition-colors flex items-center justify-center p-1" title="Shop Archives">
          <span className="material-symbols-outlined text-[20px] md:text-[22px] font-light">grid_view</span>
        </Link>
        <Link to="/cart" className="relative text-[#c9bda5] hover:text-[#e1c298] transition-colors flex items-center justify-center p-1" title="Cart">
          <span className="material-symbols-outlined text-[20px] md:text-[22px] font-light">local_mall</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#e1c298] text-[#171210] text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        <Link to="/profile" className="text-[#c9bda5] hover:text-[#e1c298] transition-colors flex items-center justify-center p-1" title="Account">
          <span className="material-symbols-outlined text-[20px] md:text-[22px] font-light">person</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
