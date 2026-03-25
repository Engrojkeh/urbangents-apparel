import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart, getCartKey } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-2 text-center">
        <h2>Your Cart is Empty</h2>
        <Link to="/" className="btn btn-primary mt-2">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mt-2">
      <h2>Shopping Cart</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        {cartItems.map(item => {
          const cartKey = getCartKey(item);
          return (
            <div key={cartKey} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', gap: '1rem' }}>
              <img src={item.image_url} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
              <div style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                {(item.selectedSize || item.selectedColor) && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    {item.selectedSize && item.selectedColor && <span> · </span>}
                    {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                  </div>
                )}
                <div style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>₦{Number(item.price).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={() => updateQuantity(cartKey, -1)} style={{ padding: '0.25rem 0.75rem', fontSize: '1.2rem', backgroundColor: '#333', color: 'white', borderRadius: '4px' }}>-</button>
                <span style={{ fontSize: '1.2rem' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(cartKey, 1)} style={{ padding: '0.25rem 0.75rem', fontSize: '1.2rem', backgroundColor: '#333', color: 'white', borderRadius: '4px' }}>+</button>
              </div>
              <button onClick={() => removeFromCart(cartKey)} style={{ backgroundColor: 'var(--danger)', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px' }}>Remove</button>
            </div>
          );
        })}
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'right' }}>
        <h3>Total: <span style={{ color: 'var(--accent-color)' }}>₦{cartTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span></h3>
        <button onClick={handleCheckout} className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', maxWidth: '300px' }}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
