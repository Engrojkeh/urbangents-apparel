import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { About, Returns, SizeGuide } from './pages/InfoPages';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
