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
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', paddingBottom: '4rem' }}>
      
      <div style={{ width: '100%', maxWidth: '450px', marginBottom: '1rem' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{
            background: 'transparent',
            color: 'var(--accent-color)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 0',
            fontSize: '0.9rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'var(--transition)'
          }}
          onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateX(-5px)'; }}
          onMouseOut={(e) => { e.currentTarget.style.color = 'var(--accent-color)'; e.currentTarget.style.transform = 'translateX(0)'; }}
        >
          &#8592; Back to Home
        </button>
      </div>

      <div className="login-card" style={{ backgroundColor: 'var(--bg-secondary)', padding: '2.5rem', borderRadius: '12px', width: '100%', maxWidth: '450px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <h2 className="text-center" style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>
        
        {error && (
          <div style={{ 
            color: error.includes('successful') ? '#4caf50' : 'white', 
            backgroundColor: error.includes('successful') ? 'rgba(76, 175, 80, 0.1)' : 'var(--danger)', 
            border: `1px solid ${error.includes('successful') ? '#4caf50' : 'var(--danger)'}`,
            padding: '0.75rem', 
            borderRadius: '4px', 
            marginBottom: '1.5rem', 
            textAlign: 'center' 
          }}>
            {error}
          </div>
        )}

        {/* Social Login Placeholders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          <button type="button" className="btn" style={{ backgroundColor: '#ffffff', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} onClick={() => alert('Google OAuth integration requires live domain verification.')}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{ width: '18px' }}/>
            {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
          </button>
          <button type="button" className="btn" style={{ backgroundColor: '#1877f2', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} onClick={() => alert('Facebook OAuth integration requires live domain verification.')}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" alt="Facebook" style={{ width: '18px' }}/>
            {isLogin ? 'Sign in with Facebook' : 'Sign up with Facebook'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', color: 'var(--text-secondary)' }}>
          <hr style={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
          <span style={{ padding: '0 10px', fontSize: '0.85rem' }}>OR CONTINUE WITH EMAIL</span>
          <hr style={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {!isLogin && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(166, 138, 100, 0.3)', backgroundColor: 'var(--bg-dark)', color: 'white' }}
                required={!isLogin} 
              />
            </div>
          )}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(166, 138, 100, 0.3)', backgroundColor: 'var(--bg-dark)', color: 'white' }}
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.85rem', borderRadius: '4px', border: '1px solid rgba(166, 138, 100, 0.3)', backgroundColor: 'var(--bg-dark)', color: 'white' }}
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '1rem' }} disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => { setIsLogin(!isLogin); setError(''); }} 
            style={{ color: 'var(--accent-color)', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline' }}
          >
            {isLogin ? 'Sign up here' : 'Log in here'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
