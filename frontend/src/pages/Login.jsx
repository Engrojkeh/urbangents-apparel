import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Handle Login
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        if (res.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      } else {
        // Handle Register
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        await axios.post(`${API_URL}/api/auth/register`, { full_name: name, email, password });
        // Automatically switch to login after successful registration
        setIsLogin(true);
        setError('Registration successful! Please log in.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#171210] text-[#ebe0db] font-['Work_Sans',sans-serif] min-h-screen flex flex-col overflow-x-hidden selection:bg-[#e1c298]/30">
      <style>{`
        .font-serif { font-family: 'Noto Serif', serif; }
        .font-sans { font-family: 'Work Sans', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }
        .glass-panel { background: rgba(36, 31, 27, 0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .metallic-gradient { background: linear-gradient(135deg, #e1c298 0%, #a88c66 100%); }
        .floating-input:focus ~ label, .floating-input:not(:placeholder-shown) ~ label {
            transform: translateY(-1.5rem) scale(0.85); color: #e1c298;
        }
        /* Hide password toggle default eye in Edge/IE */
        input[type="password"]::-ms-reveal, input[type="password"]::-ms-clear { display: none; }
      `}</style>
      
      <nav className="absolute top-0 w-full z-50 flex justify-between items-center px-8 py-8 transition-all duration-500">
        <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src="/ug-logo.jpg" alt="Urbangents" className="h-10 md:h-12 w-auto object-contain" />
        </Link>
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#d1c5b8] hover:text-[#e1c298] transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="hidden md:inline">Return To Archives</span>
          </Link>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center relative min-h-screen pb-20 md:pb-0">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale" 
            alt="Editorial Streetwear Background" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8iOEVc1bFeU8Nba2xpF_FQN4pTrsIxJSrn0cghsxjO1YchGR8liflu__Lj3ERU23w4kgi5-5qdg51SH4dUs7MhDkxnDnkrHSW_bxHhtuHACYmCXff3DOGNUYb1_4j72yCApiE2I5ZtNomWmEBXqTI8EkUKzm4DhSBcSz1CgKYZPIElrsAaZuculSMEw1S4P9Yk2LwqyssynWE-h99Og8Dk9xttmg6jcsnodo8kMRp7wTnwZnJsjIigm4-zewIxGUTsmVEIQIe9Os"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-tr from-[#171210] via-[#171210]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-xl px-6 py-24 md:py-12 mt-12 md:mt-0">
          <div className="glass-panel p-8 md:p-16 rounded-xl shadow-2xl overflow-hidden relative group border border-[#4e453c]/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e1c298]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-[#e1c298]/10 transition-colors duration-700"></div>
            
            <div className="mb-12">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#e1c298] mb-3 block">
                {isLogin ? 'Welcome Back' : 'Join The Archives'}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-[#ebe0db] leading-tight font-bold tracking-tight">
                {isLogin ? 'Urbangents ' : 'Exclusive '}
                <br/><span className="text-[#d8c598] italic">{isLogin ? 'Access' : 'Membership'}</span>
              </h1>
            </div>

            {error && (
              <div className={`mb-8 p-4 rounded text-center text-[10px] font-bold uppercase tracking-widest ${error.includes('successful') ? 'bg-[#e1c298]/10 text-[#e1c298] border border-[#e1c298]/30' : 'bg-red-500/10 text-red-500 border border-red-500/30'}`}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              {!isLogin && (
                <div className="relative group">
                  <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    required={!isLogin} 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="floating-input w-full bg-transparent border-0 border-b border-[#4e453c]/20 py-3 px-0 focus:ring-0 focus:border-[#e1c298] text-[#ebe0db] transition-colors duration-300 placeholder-transparent outline-none" 
                    placeholder=" " 
                  />
                  <label htmlFor="name" className="absolute left-0 top-3 text-[#d1c5b8] uppercase text-[10px] tracking-widest transition-all duration-300 pointer-events-none group-focus-within:text-[#e1c298]">
                    Full Name
                  </label>
                </div>
              )}

              <div className="relative group">
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="floating-input w-full bg-transparent border-0 border-b border-[#4e453c]/20 py-3 px-0 focus:ring-0 focus:border-[#e1c298] text-[#ebe0db] transition-colors duration-300 placeholder-transparent outline-none" 
                  placeholder=" " 
                />
                <label htmlFor="email" className="absolute left-0 top-3 text-[#d1c5b8] uppercase text-[10px] tracking-widest transition-all duration-300 pointer-events-none group-focus-within:text-[#e1c298]">
                  Email Address
                </label>
              </div>

              <div className="relative group">
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="floating-input w-full bg-transparent border-0 border-b border-[#4e453c]/20 py-3 px-0 focus:ring-0 focus:border-[#e1c298] text-[#ebe0db] transition-colors duration-300 placeholder-transparent outline-none pr-10" 
                  placeholder=" " 
                />
                <label htmlFor="password" className="absolute left-0 top-3 text-[#d1c5b8] uppercase text-[10px] tracking-widest transition-all duration-300 pointer-events-none group-focus-within:text-[#e1c298]">
                  Password
                </label>
              </div>

              <div className="flex justify-end pt-1">
                {isLogin && (
                  <button type="button" className="bg-transparent border-none p-0 m-0 text-[10px] uppercase tracking-wider text-[#a88c66] hover:text-[#e1c298] transition-colors underline underline-offset-4 decoration-[#4e453c]/50 leading-none">
                    Forgot Entry?
                  </button>
                )}
              </div>

              <div className="pt-2">
                <button type="submit" disabled={loading} className="w-full metallic-gradient text-[#402d0f] py-4 rounded-full font-sans font-bold text-[11px] uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-300 focus:outline-none disabled:opacity-70 disabled:hover:scale-100 disabled:hover:translate-y-0">
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
              </div>
            </form>

            <div className="mt-10 md:mt-12 text-center border-t border-[#4e453c]/20 pt-6">
              <p className="text-[10px] md:text-[11px] text-[#d1c5b8] tracking-wide uppercase flex items-center justify-center gap-2">
                {isLogin ? "New to the Maison?" : "Already a Member?"} 
                <button 
                  type="button" 
                  onClick={() => { setIsLogin(!isLogin); setError(''); }}
                  className="bg-transparent border-none p-0 m-0 text-[#e1c298] hover:underline underline-offset-4 font-bold transition-colors leading-none"
                >
                  {isLogin ? 'Request an Account' : 'Access your Account'}
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden xl:block absolute right-24 top-1/2 -translate-y-1/2 w-64 space-y-12">
          <div className="space-y-4">
            <span className="block w-8 h-[1px] bg-[#e1c298]"></span>
            <h3 className="font-serif text-2xl text-[#ebe0db]">Curated by <br/>Urbangents</h3>
            <p className="text-xs leading-relaxed text-[#d1c5b8] italic">
                "Crafting the future of street luxury through intentional design and architectural silhouettes."
            </p>
          </div>
          <div className="p-6 bg-[#201b18]/80 border border-[#4e453c]/20 rounded-lg backdrop-blur text-left">
            <span className="text-[10px] text-[#e1c298] uppercase tracking-widest block mb-2 font-bold">Exclusively Online</span>
            <p className="text-[10px] text-[#d1c5b8] uppercase tracking-widest">Archive Drop No. 04</p>
            <p className="text-[9px] text-[#d1c5b8]/60 mt-2 italic">Available to members only</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
