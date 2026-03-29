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

  const getGridStyles = (index) => {
    const i = index % 7;
    switch (i) {
      case 0: return { wrapper: "md:col-span-7 flex flex-col gap-6 reveal", aspect: "aspect-[4/5]" };
      case 1: return { wrapper: "md:col-span-5 md:pt-40 flex flex-col gap-6 reveal", aspect: "aspect-[1/1]" };
      case 2: return { wrapper: "md:col-span-4 flex flex-col gap-6 reveal", aspect: "aspect-[3/4]" };
      case 3: return { wrapper: "md:col-span-4 md:-mt-20 flex flex-col gap-6 reveal", aspect: "aspect-[3/4]" };
      case 4: return { wrapper: "md:col-span-4 flex flex-col gap-6 reveal", aspect: "aspect-[3/4]" };
      case 5: return { wrapper: "md:col-span-8 flex flex-col gap-6 reveal", aspect: "aspect-[16/9]" };
      case 6: return { wrapper: "md:col-span-4 flex flex-col gap-6 reveal", aspect: "aspect-[3/4]" };
      default: return { wrapper: "md:col-span-4 flex flex-col gap-6 reveal", aspect: "aspect-[3/4]" };
    }
  };

  return (
    <div style={{ backgroundColor: '#171210', color: '#ebe0db', fontFamily: "'Work Sans', sans-serif", minHeight: '100vh' }}>
      <style>{`
        .font-serif { font-family: 'Noto Serif', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }
      `}</style>
      
      <main className="pt-24 min-h-screen">
        <header className="px-8 py-20 max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8 reveal">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-serif text-[#ebe0db] leading-none mb-6">Refined<br/><span className="italic ml-12">Streetwear</span></h1>
            <p className="text-[#c9bda5] max-w-md text-lg leading-relaxed font-light">
              A dialogue between architectural precision and the raw energy of modern metropolis. Explore our curated selection of high-end essentials.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 w-full md:w-auto">
             <input
              type="text"
              placeholder="Search for a style..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-6 py-3 rounded-full border border-[#4e453c] bg-[#241f1b] text-[#f8e3b4] font-label text-sm outline-none focus:border-[#a68a64] transition-colors w-full md:w-80 shadow-lg"
            />
          </div>
        </header>

        {loading ? (
          <div className="text-center" style={{ padding: '5rem 0' }}>Loading products...</div>
        ) : (
          <section className="px-8 pb-32 max-w-none grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12">
            {filteredProducts.length === 0 && (
               <div className="col-span-full text-center text-[#c9bda5] py-20">No active products match your refined search.</div>
            )}
            {filteredProducts.map((product, index) => {
                const styles = getGridStyles(index);
                const sizes = getSizes(product);
                const colors = getColors(product);
                const sel = selections[product.product_id] || {};

                return (
                  <div key={product.product_id} className={styles.wrapper}>
                    <div className={`relative group overflow-hidden rounded-lg ${styles.aspect} bg-[#241f1b]`}>
                      <img 
                        src={product.image_url?.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${product.image_url}` : product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                      />
                      {index === 0 && <div className="absolute top-6 left-6 px-4 py-1 bg-[#e1c298] text-[#402d0f] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full shadow-lg border border-[#e1c298]/20 backdrop-blur">New Release</div>}
                      
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                        {sizes.length > 0 && (
                          <select
                            value={sel.size || ''}
                            onChange={(e) => updateSelection(product.product_id, 'size', e.target.value)}
                            className="bg-[#171210]/90 text-[#f8e3b4] text-xs p-2 rounded outline-none border border-[#4e453c]"
                          >
                            <option value="">Select Size</option>
                            {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        )}
                        {colors.length > 0 && (
                          <select
                            value={sel.color || ''}
                            onChange={(e) => updateSelection(product.product_id, 'color', e.target.value)}
                            className="bg-[#171210]/90 text-[#f8e3b4] text-xs p-2 rounded outline-none border border-[#4e453c]"
                          >
                            <option value="">Select Color</option>
                            {colors.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        )}
                        {product.stock_quantity > 0 ? (
                          <button
                            className="mt-2 w-full px-4 py-3 bg-[#e1c298] hover:bg-[#a88c66] text-[#402d0f] font-bold text-xs uppercase tracking-[0.2em] rounded transition-colors shadow-lg"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <div className="text-center text-red-500 font-bold text-xs py-2 uppercase tracking-widest bg-black/40 rounded">Sold Out</div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-start pt-2">
                      <div>
                        <h3 className="text-2xl font-serif text-[#f8e3b4]">{product.name}</h3>
                        <p className="text-[#c9bda5] font-light text-sm tracking-wide mt-1">Premium Collection</p>
                      </div>
                      <span className="text-xl font-light text-[#e1c298]">₦{Number(product.price).toLocaleString('en-NG')}</span>
                    </div>
                  </div>
                );
            })}
          </section>
        )}
      </main>
      
      <footer className="bg-[#171210] w-full py-16 md:py-20 px-8 relative z-10 border-t border-[#a68a64]/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full max-w-7xl mx-auto">
          <div>
            <p className="text-[#c9bda5]/40 font-body text-xs leading-relaxed max-w-[200px] m-0 p-0">
              Curating high-end streetwear for the discerning contemporary wardrobe.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[#f8e3b4] font-label text-[10px] uppercase tracking-[0.2em] mb-2">Navigation</span>
            <a className="text-[#c9bda5]/60 font-label text-[10px] uppercase tracking-[0.2em] hover:text-[#a68a64] transition-colors" href="/shop">Shop Archives</a>
            <a className="text-[#c9bda5]/60 font-label text-[10px] uppercase tracking-[0.2em] hover:text-[#a68a64] transition-colors" href="/returns">Shipping & Returns</a>
            <a className="text-[#c9bda5]/60 font-label text-[10px] uppercase tracking-[0.2em] hover:text-[#a68a64] transition-colors" href="#">Privacy Policy</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[#f8e3b4] font-label text-[10px] uppercase tracking-[0.2em] mb-2">Connect</span>
            <a className="text-[#c9bda5]/60 font-label text-[10px] uppercase tracking-[0.2em] hover:text-[#a68a64] transition-colors" href="#">Instagram</a>
            <a className="text-[#c9bda5]/60 font-label text-[10px] uppercase tracking-[0.2em] hover:text-[#a68a64] transition-colors" href="#">Twitter</a>
          </div>
          <div className="flex flex-col justify-end">
            <span className="text-[#c9bda5]/40 font-sans text-[10px] uppercase tracking-[0.2em] leading-relaxed">
              &copy; {new Date().getFullYear()} URBANGENTS APPARELS. ALL RIGHTS RESERVED.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Shop;
