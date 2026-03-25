import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('urbangents_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('urbangents_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Each cart entry is unique per product + size + color
  const getCartKey = (item) =>
    `${item.product_id}__${item.selectedSize || ''}__${item.selectedColor || ''}`;

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const key = getCartKey(product);
      const existing = prevItems.find(item => getCartKey(item) === key);
      if (existing) {
        return prevItems.map(item =>
          getCartKey(item) === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (cartKey) => {
    setCartItems(prevItems => prevItems.filter(item => getCartKey(item) !== cartKey));
  };

  const updateQuantity = (cartKey, amount) => {
    setCartItems(prevItems => prevItems.map(item => {
      if (getCartKey(item) === cartKey) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, getCartKey }}>
      {children}
    </CartContext.Provider>
  );
};
