import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import DumbbellIcon from '../components/DumbbellIcon';

const LoginView: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  const { signIn } = useApp();
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) signIn(username);
  };

  return (
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="logo-container">
        <div className="logo-box">
          <DumbbellIcon />
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <h1 style={{ fontSize: '2.2rem' }}>50 Pushups</h1>
        <p className="subtitle">Welcome back, athlete.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input 
            type="text" 
            className="input-field" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            className="input-field" 
            placeholder="Password" 
          />
        </div>

        <button type="submit" className="btn-primary">Sign In</button>
      </form>

      <div style={{ textAlign: 'center', marginTop: 25 }}>
        <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: 15 }}>OR</p>
        <button className="btn-secondary" onClick={onToggle}>
          Need an account? <span style={{ color: 'white' }}>Sign Up</span>
        </button>
      </div>
    </div>
  );
};

export default LoginView;
