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

  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#171210', color: '#ebe0db', fontFamily: "'Work Sans', sans-serif" }}>
      <style>{`
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .font-serif-header { font-family: 'Noto Serif', serif; }
        .metallic-gradient {
            background: linear-gradient(135deg, #e1c298 0%, #a88c66 100%);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-[921px] flex items-center px-8 md:px-20 overflow-hidden" style={{ marginTop: '-85px', paddingTop: '85px' }}>
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[#171210]">
            <img className="w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Editorial shot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEI0VGu-1LdkXk-Tl3rLPYZqAckiWtlWcQ9xbl_4fZqn6fwGJq9ocVe8LX_Xi159huYS9jeqYy4IO0WKVUJL-gy91-2FSgfUbpBQBr5vzC2rOoxQfJUIdWiyeWm5sKTINzz3NZDhatMMiebvPAMqb9gXZID5T3KZ-cpu7zDO84_HSbFJjZPplg2byUiO4EYNgPCb2XpkJvjN7oEAqhUC4zYwJkZ-fgy-GDuVW1ArXxP11aQ_-031E5xsOG1RgL0bSTF2aansZEDuM"/>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#171210] via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-4xl py-24">
          <h1 className="text-6xl md:text-8xl font-serif-header text-[#f8e3b4] leading-[0.9] tracking-tighter mb-8" style={{ margin: 0, paddingBottom: 32 }}>
            THE NEW <br/> <span className="italic font-light opacity-80">STREET ARCHIVE</span>
          </h1>
          <p className="font-body text-[#c9bda5] text-lg md:text-xl max-w-md mb-12 leading-relaxed" style={{ margin: 0, paddingBottom: 48, letterSpacing: 'normal', color: '#c9bda5' }}>
            Redefining luxury through architectural silhouettes and premium essentialism. 
          </p>
          <div className="flex gap-4">
            <button onClick={() => { document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) || navigate('/shop') }} className="metallic-gradient text-[#1a1512] px-10 py-4 rounded-full font-label uppercase text-xs tracking-[0.2em] font-semibold hover:opacity-90 transition-all active:scale-95 shadow-xl">
              Explore Collection
            </button>
          </div>
        </div>
        <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end gap-2 text-[#a68a64]">
          <span className="font-label text-[10px] uppercase tracking-widest opacity-60">Curated Release</span>
          <span className="font-serif-header text-3xl italic tracking-tighter">Spring/Summer</span>
        </div>
      </section>

      {/* Category Bento Grid */}
      <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full md:h-[800px]">
          {/* Main Category */}
          <div className="md:col-span-7 bg-surface-container-low rounded-lg overflow-hidden relative group h-[400px] md:h-auto">
            <img className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="Close up" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASpjXsRPgewIInRhJiOm_t_VpLsa-gbXTeEg5QDLUveDZaDK38MbN8L5yQ2k9vxwVOgvIO8XlltDDB4R2dUGOlmGcKN_9ZdWxR5o2HEDuJJHWfyMM2kMmDpkQqmP6xaan3PKzMaHWB_-7fQxSNIKuzyc63SexUm4FAnv0oyRPVEGuUpezkHOVZemS9mWGosvXbZoaE-0s8VLBX7Du_W3sZjv6FpmKSKJq1k6kfflbJFMEvuBGtsAK7U7g7cWhPKmtj4C5nR1rtun0"/>
            <div className="absolute bottom-10 left-10">
              <h3 className="font-serif-header text-4xl text-[#f8e3b4] mb-2 uppercase italic">Essentials</h3>
              <Link className="text-[#a68a64] font-label text-[10px] uppercase tracking-[0.3em] hover:underline" to="/shop">View All Piece</Link>
            </div>
          </div>
          <div className="md:col-span-5 grid grid-rows-2 gap-6 h-[600px] md:h-auto">
            <div className="bg-surface-container-high rounded-lg overflow-hidden relative group">
              <img className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" alt="Minimalist streetwear" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXNVWu2da7Hz-EdFlp1zVJumfNMaMZXD15Koye3yJMfvxqYFwKg4aX1LzKWRFjeV1iWg5a76U0t-GweEP2XBhh06_zoAHysEOZUfSK-9ZkdDsypzuPnqaGK8d5KM_5o2M9_IiK9Re_-DU4MjfbXlQlS4OyenAasLM14n4ammgS7ykrhjyvoINvMWcebkVswqG2RDbxZJrXUcxww5t0w6EMEL499-yxU0AF44Yd5Ojm6qvxs9SKQixjcKmmebekclx6QQQTToEHUUo"/>
              <div className="absolute top-8 right-8 text-right">
                <h3 className="font-serif-header text-2xl text-[#f8e3b4] mb-1 uppercase">Footwear</h3>
                <span className="text-[#c9bda5] font-label text-[10px] uppercase tracking-widest">Sculpted Soles</span>
              </div>
            </div>
            <div className="bg-[#2c2522] rounded-lg overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center p-12 text-center flex-col z-10">
                <span className="text-[#a68a64] font-label text-[10px] uppercase tracking-[0.4em] mb-4">Coming Soon</span>
                <h3 className="font-serif-header text-3xl text-[#f8e3b4] mb-6 leading-tight italic">THE CONCRETE <br/> SERIES</h3>
                <button className="text-[#f8e3b4] border border-[#f8e3b4]/20 px-6 py-2 rounded-full font-label text-[9px] uppercase tracking-widest hover:bg-[#f8e3b4] hover:text-[#171210] transition-colors">Notify Me</button>
              </div>
              <div className="absolute inset-0 bg-[#3a3430]/40 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="shop" className="py-24 bg-surface-container-low/30">
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-4">
            <div>
              <span className="text-[#a68a64] font-label text-[10px] uppercase tracking-[0.4em]">Current Focus</span>
              <h2 className="font-serif-header text-4xl md:text-5xl text-[#f8e3b4] mt-4 p-0 m-0">Selected Pieces</h2>
            </div>
            <Link className="text-[#f8e3b4] font-label text-xs uppercase tracking-widest border-b border-[#a68a64] pb-2" to="/shop">View Archive</Link>
          </div>
          
          {loading ? (
            <div className="text-center mt-2" style={{ padding: '5rem 0' }}>Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
              {products.map((product, index) => (
                <div key={product.product_id} className={`relative ${index === 1 ? 'md:-mt-12' : (index === 0 ? 'md:mt-12' : 'md:mt-8')}`}>
                  <div className="aspect-[4/5] bg-surface-container overflow-hidden rounded-lg mb-6 group cursor-pointer relative" onClick={() => addToCart(product)}>
                    <img 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      alt={product.name} 
                      src={product.image_url?.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${product.image_url}` : product.image_url} 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[#f8e3b4] border border-[#f8e3b4] px-6 py-2 rounded-full uppercase tracking-widest text-xs">Add to Cart</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start px-2">
                    <div className="pr-4">
                      <h4 className="font-serif-header text-xl text-[#f8e3b4] m-0 p-0 leading-tight">{product.name}</h4>
                      <p className="font-label text-[10px] text-[#c9bda5]/60 uppercase tracking-widest mt-1 m-0 p-0">
                        {product.size ? `Size: ${product.size}` : 'Premium Cut'}
                      </p>
                    </div>
                    <span className="text-[#a68a64] font-body font-medium whitespace-nowrap">₦{Number(product.price).toLocaleString('en-NG')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brand Ethos Section */}
      <section className="py-24 md:py-40 px-4 md:px-8 text-center bg-[#171210]">
        <div className="max-w-3xl mx-auto">
          <span className="text-[#a68a64] font-label text-[10px] uppercase tracking-[0.5em] mb-8 md:mb-12 block">The Philosophy</span>
          <h2 className="font-serif-header text-3xl md:text-6xl text-[#f8e3b4] leading-tight mb-8 md:mb-12 italic p-0 m-0">
            "Clothing is the architecture <br/> of our movements."
          </h2>
          <p className="text-[#c9bda5]/80 font-body text-sm md:text-base leading-loose max-w-xl mx-auto m-0 p-0">
            We create artifacts for the modern nomad. Every seam, every textile, and every silhouette is engineered for durability and effortless expression. No labels, just identity.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#171210] w-full py-16 md:py-20 px-8 relative z-10 border-t border-[#a68a64]/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full max-w-7xl mx-auto">
          <div>
            <h3 className="text-lg font-serif-header text-[#a68a64] mb-4 uppercase tracking-wider p-0 m-0">URBANGENTS APPARELS</h3>
            <p className="text-[#c9bda5]/40 font-body text-xs leading-relaxed max-w-[200px] m-0 p-0">
              Curating high-end streetwear for the discerning contemporary wardrobe.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[#f8e3b4] font-label text-[10px] uppercase tracking-[0.2em] mb-2">Navigation</span>
            <Link className="text-[#c9bda5]/60 font-label text-[10px] uppercase tracking-[0.2em] hover:text-[#a68a64] transition-colors" to="/shop">Shop Archives</Link>
            <Link className="text-[#c9bda5]/60 font-label text-[10px] uppercase tracking-[0.2em] hover:text-[#a68a64] transition-colors" to="/returns">Shipping & Returns</Link>
            <Link className="text-[#c9bda5]/60 font-label text-[10px] uppercase tracking-[0.2em] hover:text-[#a68a64] transition-colors" to="#">Privacy Policy</Link>
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
};

export default Home;
