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
      <div className="container mt-2 text-center" style={{ padding: '8rem 0', minHeight: '60vh' }}>
        <h2 style={{ fontFamily: 'Noto Serif', color: '#e1c298', fontSize: '3rem', marginBottom: '2rem' }}>Your Wardrobe is Empty</h2>
        <Link to="/shop" className="px-10 py-4 rounded-full" style={{ background: 'linear-gradient(135deg, #e1c298 0%, #a88c66 100%)', color: '#1a1512', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem' }}>Continue Discovering</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#171210', color: '#ebe0db', fontFamily: "'Work Sans', sans-serif", minHeight: '100vh' }}>
      <style>{`
        .font-serif { font-family: 'Noto Serif', serif; }
        .font-sans { font-family: 'Work Sans', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }
        .metallic-gradient { background: linear-gradient(135deg, #e1c298 0%, #a88c66 100%); }
      `}</style>

      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto min-h-screen">
        <header className="mb-16 reveal">
          <h1 className="font-serif text-5xl md:text-7xl text-[#e1c298] tracking-tight mb-4">The Wardrobe</h1>
          <div className="flex items-center gap-4 text-sm font-sans tracking-[0.2em] text-[#d8c598] uppercase">
            <span>Your Curated Selection</span>
            <span className="w-12 h-px bg-[#4e453c]/30"></span>
            <span>{cartItems.length} Items</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            {cartItems.map((item, index) => {
              const cartKey = getCartKey(item);
              return (
                <React.Fragment key={cartKey}>
                  <div className="group relative flex flex-col md:flex-row gap-8 items-start md:items-center reveal">
                    <div className="w-full md:w-48 aspect-[3/4] overflow-hidden bg-[#241f1b] rounded-lg">
                      <img 
                        src={item.image_url?.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${item.image_url}` : item.image_url} 
                        alt={item.name} 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-2 w-full">
                      <div className="flex justify-between items-start">
                        <div className="pr-4">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#d8c598]/60 mb-1">URBANGENTS CORE</p>
                          <h3 className="font-serif text-xl md:text-2xl text-[#ebe0db] uppercase tracking-tight">{item.name}</h3>
                        </div>
                        <span className="font-serif text-xl text-[#e1c298]">₦{Number(item.price).toLocaleString('en-NG')}</span>
                      </div>
                      
                      <div className="mt-6 flex flex-wrap items-center gap-6 md:gap-8">
                        <div className="flex items-center border border-[#4e453c]/40 rounded-full px-4 py-2 gap-4">
                          <button onClick={() => updateQuantity(cartKey, -1)} className="text-[#e1c298] hover:opacity-50 transition-opacity">
                            <span className="material-symbols-outlined text-sm">remove</span>
                          </button>
                          <span className="text-sm font-sans w-4 text-center text-[#ebe0db]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(cartKey, 1)} className="text-[#e1c298] hover:opacity-50 transition-opacity">
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>
                        
                        {(item.selectedSize || item.selectedColor) ? (
                          <div className="text-xs uppercase tracking-widest text-[#d8c598]/60">
                            {item.selectedSize && `Size: ${item.selectedSize}`}
                            {item.selectedSize && item.selectedColor && ' | '}
                            {item.selectedColor && `Color: ${item.selectedColor}`}
                          </div>
                        ) : null}
                        
                        <button onClick={() => removeFromCart(cartKey)} className="text-[10px] uppercase tracking-[0.2em] text-[#d8c598]/40 hover:text-[#ffb4ab] transition-colors ml-auto mt-2 md:mt-0">Remove Item</button>
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && (
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#4e453c]/30 to-transparent"></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <aside className="lg:col-span-4 reveal">
            <div className="bg-[#201b18] p-8 rounded-lg sticky top-32 border border-[#4e453c]/20">
              <h2 className="font-serif text-3xl text-[#ebe0db] mb-8">Summary</h2>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#d1c5b8] font-light">Subtotal</span>
                  <span className="text-[#ebe0db]">₦{cartTotal.toLocaleString('en-NG')}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#d1c5b8] font-light">Express Delivery</span>
                  <span className="text-[#ebe0db]">Free</span>
                </div>
                
                <div className="pt-6 border-t border-[#4e453c]/30">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#d8c598]">Total Amount</span>
                    <span className="font-serif text-2xl text-[#e1c298]">₦{cartTotal.toLocaleString('en-NG')}</span>
                  </div>
                </div>
              </div>
              
              <button onClick={handleCheckout} className="w-full py-5 rounded-full metallic-gradient text-[#402d0f] font-sans text-xs uppercase tracking-[0.3em] font-bold hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-black/40 mb-6 focus:outline-none">
                Proceed to Checkout
              </button>
              
              <div className="mt-12 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-[#d8c598]/50 text-[10px] uppercase tracking-[0.2em]">
                  <span className="material-symbols-outlined text-sm">local_shipping</span>
                  <span>Complimentary shipping statewide</span>
                </div>
                <div className="flex items-center gap-3 text-[#d8c598]/50 text-[10px] uppercase tracking-[0.2em]">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>Secure checkout & easy returns</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Complete The Look Section (Static) */}
        <section className="mt-32 reveal">
          <h2 className="font-serif text-4xl text-[#ebe0db] mb-12">Complete The Look</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="group cursor-pointer" onClick={() => navigate('/shop')}>
              <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-[#241f1b]">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Sniper Tech" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCSWHtg6BVvPfSPCO8Nykw5LGDaEoK8yqWKgwKvQPrqBBqUvn0bLeD-T9bsyvzgQ7g2W1nub2Z6ZFLLBIK4tiBw_bTDQEURyDL6iS1uBp64gjSXPQTdi5lJMYflKOlr4gYyBfd6bkCsjHHZJjpnZ2BleGlZyqqnsbSlfwPjWEB1At_KW0JM6ZEQDt_osTsgfGouNhP5CiN24izYTOufWMluEwFYj_YIhwGVo6j0G8uIbq-zxWIi_4MKkabvVWEl0vBgvQoVXXNVRg"/>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#d8c598]/60 mb-1">FOOTWEAR</p>
              <h4 className="font-serif text-lg text-[#ebe0db] group-hover:text-[#e1c298] transition-colors">Ghost-Runner Techs</h4>
            </div>
            <div className="group cursor-pointer" onClick={() => navigate('/shop')}>
              <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-[#241f1b]">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Accessory" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF8Ldj2_y5cZooWpqjJgBMtYbUvXjvT4N3GF2zgcXliPaqPqKLbeP0d7OeCRg75JV_sqhD8rpCeZ4zUP-hWxM-Gn-wyP2pANIQaWL-oH_dTtscC_SFbOIhKxJqdeqPxLYP4kaSrsqPbY4PHW54LwCJuoIFIJuH-2aLnIaM31x0523m9uYKsDePuWnkgKxEWp6W82ksD-gIafDBS5zlYraVGLO9s30R7oXyiL5xu82h3yIlC8LNrJFgPUQrVXYC4wbG3sw7Z-mXd7c"/>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#d8c598]/60 mb-1">ACCESSORIES</p>
              <h4 className="font-serif text-lg text-[#ebe0db] group-hover:text-[#e1c298] transition-colors">Sterling Link Chain</h4>
            </div>
            <div className="group cursor-pointer hidden md:block" onClick={() => navigate('/shop')}>
              <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-[#241f1b]">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Jacket" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK8mMyNznehdSy3GX28sf2fdQJrqQ0auOSrWgYswluGHDK8yK-t2kokNSsajxCT7ylDvjEeY8QVEChKOnHjWxE_CNMxigx-5ug7zZquK04G1TasGqUJA43XC9ZO1Th5u-cxc7Tx4HX-NdxAuxKUK0uBbiE49o056bkJ4dGKRYUdbxUhJrNmfOp-MPNtWw3uOfkrlN8uWr2Wswsozh3qoKhhaYfq5ghX2onPhRpvENN9N0mHrF1tLXUSeBtF8gVzOiRa2a6FfUDals"/>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#d8c598]/60 mb-1">OUTERWEAR</p>
              <h4 className="font-serif text-lg text-[#ebe0db] group-hover:text-[#e1c298] transition-colors">Biker-01 Archive</h4>
            </div>
            <div className="group cursor-pointer hidden md:block" onClick={() => navigate('/shop')}>
              <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-[#241f1b]">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Headwear" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3tnblGRbPImVijSmSymp5NPDWSFxNNvLHIfB3i845wcS9SAZqPuOcg1BRym36y2NocfnjsdMQhfWmoSN85aZ2FAOYD1-6OkxsMxtVJ1UgDMntg-6mRpCuUuYWoAWvwofexm6lVw2iGoaRdEg1BrZvcH5CUe1aJNAqqOnj6pPGKzVo7ZJ_jS3t3_-nrSs1tpekY68oYTXlVn-gBiNO0ptIwDYEQXFzIU0JgF8H6xRiRgXvIhMwVVYT75NRS50LvFh4eM8d78TGg6k"/>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#d8c598]/60 mb-1">HEADWEAR</p>
              <h4 className="font-serif text-lg text-[#ebe0db] group-hover:text-[#e1c298] transition-colors">Thermal Rib Beanie</h4>
            </div>
          </div>
        </section>

      </main>

      <footer className="w-full py-16 md:py-20 px-8 bg-[#171210] relative z-10 border-t border-[#4e453c]/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full max-w-7xl mx-auto">
          <div>
            <p className="text-lg font-serif text-[#a68a64] mb-4 uppercase tracking-widest">URBANGENTS APPARELS</p>
            <p className="font-sans text-[10px] text-[#c9bda5]/60 leading-relaxed max-w-xs">
               Curating the intersection of heritage craftsmanship and modern street aesthetic. Designed for the architectural mind.
            </p>
          </div>
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#f8e3b4] mb-6">Client Service</p>
            <ul className="space-y-4">
              <li><Link className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#c9bda5]/60 hover:text-[#a68a64] transition-colors" to="/returns">Shipping & Returns</Link></li>
              <li><Link className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#c9bda5]/60 hover:text-[#a68a64] transition-colors" to="/shop">Shop Archives</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#f8e3b4] mb-6">Connect</p>
            <ul className="space-y-4">
              <li><a className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#c9bda5]/60 hover:text-[#a68a64] transition-colors" href="#">Instagram</a></li>
              <li><a className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#c9bda5]/60 hover:text-[#a68a64] transition-colors" href="#">Twitter</a></li>
            </ul>
          </div>
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#f8e3b4] mb-6">Legal</p>
            <ul className="space-y-4">
              <li><Link className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#c9bda5]/60 hover:text-[#a68a64] transition-colors" to="#">Privacy Policy</Link></li>
              <li><Link className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#c9bda5]/60 hover:text-[#a68a64] transition-colors" to="#">Terms of Use</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#c9bda5]/30">© {new Date().getFullYear()} URBANGENTS APPARELS. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
