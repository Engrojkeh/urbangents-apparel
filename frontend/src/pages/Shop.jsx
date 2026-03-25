import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selections, setSelections] = useState({}); // { productId: { size, color } }
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data);
        // Initialize selections for each product
        const init = {};
        res.data.forEach(p => { init[p.product_id] = { size: '', color: '' }; });
        setSelections(init);
      } catch (err) {
        console.error('Error fetching catalog', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSizes = (product) => {
    if (!product.size) return [];
    return product.size.split(',').map(s => s.trim()).filter(Boolean);
  };

  const getColors = (product) => {
    if (!product.colors) return [];
    return product.colors.split(',').map(c => c.trim()).filter(Boolean);
  };

  const handleAddToCart = (product) => {
    const sel = selections[product.product_id] || {};
    const sizes = getSizes(product);
    const colors = getColors(product);
    if (sizes.length > 0 && !sel.size) {
      alert('Please select a size before adding to cart.');
      return;
    }
    if (colors.length > 0 && !sel.color) {
      alert('Please select a color before adding to cart.');
      return;
    }
    addToCart({ ...product, selectedSize: sel.size, selectedColor: sel.color });
  };

  const updateSelection = (productId, field, value) => {
    setSelections(prev => ({ ...prev, [productId]: { ...prev[productId], [field]: value } }));
  };

  const selectStyle = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    borderRadius: '4px',
    border: '1px solid rgba(166, 138, 100, 0.4)',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '0.85rem',
    cursor: 'pointer',
  };

  return (
    <div className="container mt-2" style={{ paddingBottom: '4rem' }}>
      <h1 className="text-center animate-fade-in" style={{ color: 'var(--accent-color)' }}>Catalog</h1>
      <p className="text-center mb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>Explore our full collection of designer luxury apparel.</p>

      {/* Search Bar */}
      <div style={{ maxWidth: '600px', margin: '0 auto 3rem auto' }} className="animate-fade-in">
        <input
          type="text"
          placeholder="Search for a style, e.g., 'Tears' or 'Shorts'..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem 1.5rem',
            borderRadius: '50px',
            border: '1px solid rgba(166, 138, 100, 0.4)',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            outline: 'none',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
        />
      </div>

      {loading ? (
        <div className="text-center" style={{ padding: '5rem 0' }}>Loading products...</div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center" style={{ color: 'var(--text-secondary)', padding: '3rem 0' }}>No products match your search.</div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product, index) => {
                const sizes = getSizes(product);
                const colors = getColors(product);
                const sel = selections[product.product_id] || {};

                return (
                  <div key={product.product_id} className="product-card" style={{ animationDelay: `${0.1 * (index % 6 + 1)}s` }}>
                    <div className="product-image-container">
                      <img
                        src={product.image_url?.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${product.image_url}` : product.image_url}
                        alt={product.name}
                        className="product-image"
                      />
                    </div>
                    <div className="product-info">
                      <h3 className="product-title">{product.name}</h3>
                      <div className="product-price">₦{Number(product.price).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</div>

                      {sizes.length > 0 && (
                        <select
                          value={sel.size || ''}
                          onChange={e => updateSelection(product.product_id, 'size', e.target.value)}
                          style={selectStyle}
                        >
                          <option value="">Select Size</option>
                          {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      )}

                      {colors.length > 0 && (
                        <select
                          value={sel.color || ''}
                          onChange={e => updateSelection(product.product_id, 'color', e.target.value)}
                          style={selectStyle}
                        >
                          <option value="">Select Color</option>
                          {colors.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      )}

                      {product.stock_quantity > 0 ? (
                        <button
                          className="btn btn-primary"
                          style={{ marginTop: 'auto', width: '100%' }}
                          onClick={() => handleAddToCart(product)}
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
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;
