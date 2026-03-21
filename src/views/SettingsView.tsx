import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Timer, RotateCcw, Trash2, User, ChevronLeft, LogOut } from 'lucide-react';

const SettingsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { 
    user, 
    restDuration, 
    updateSettings, 
    resetProgress, 
    deleteAccount,
    logout
  } = useApp();

  const [localRest, setLocalRest] = useState(restDuration);

  const handleRestChange = (val: number) => {
    setLocalRest(val);
    updateSettings({ restDuration: val } as any);
  };

  const confirmReset = () => {
    if (window.confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      resetProgress();
      alert("Progress has been reset.");
      onBack();
    }
  };

  const confirmDelete = () => {
    if (window.confirm("DANGER: This will permanently delete your account and all data. Proceed?")) {
      deleteAccount();
    }
  };

  return (
    <div className="main-content">
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: 30 }}>
        <button 
          onClick={onBack} 
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0 }}
        >
          <ChevronLeft size={28} />
        </button>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Settings</h1>
      </div>

      <div className="card" style={{ padding: '24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: 20 }}>
          <User color="var(--primary-green)" />
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Account Information</h2>
        </div>
        <p style={{ color: 'var(--text-gray)', marginBottom: 5 }}>Logged in as</p>
        <p style={{ fontSize: '1.1rem', fontWeight: '700' }}>{user}</p>
      </div>

      <div className="card" style={{ padding: '24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: 20 }}>
          <Timer color="var(--primary-green)" />
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Workout Preferences</h2>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontWeight: '600' }}>Rest Timer Duration</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>Time between sets in seconds</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              className="card" 
              style={{ padding: '8px 12px', margin: 0 }}
              onClick={() => handleRestChange(Math.max(10, localRest - 5))}
            >-</button>
            <span style={{ fontSize: '1.2rem', fontWeight: '800', minWidth: '40px', textAlign: 'center' }}>{localRest}s</span>
            <button 
              className="card" 
              style={{ padding: '8px 12px', margin: 0 }}
              onClick={() => handleRestChange(Math.min(300, localRest + 5))}
            >+</button>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: 20 }}>
          <Settings color="var(--primary-green)" />
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Data Management</h2>
        </div>

        <button 
          onClick={confirmReset}
          style={{ 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            backgroundColor: 'rgba(255,255,255,0.05)', 
            border: 'none', 
            padding: '15px', 
            borderRadius: '12px',
            color: 'white',
            cursor: 'pointer',
            marginBottom: 10,
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
        >
          <RotateCcw size={20} />
          <span style={{ fontWeight: '600' }}>Reset Training Progress</span>
        </button>

        <button 
          onClick={confirmDelete}
          style={{ 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
            border: 'none', 
            padding: '15px', 
            borderRadius: '12px',
            color: '#ef4444',
            cursor: 'pointer',
            transition: 'background 0.2s',
            marginBottom: 20
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
        >
          <Trash2 size={20} />
          <span style={{ fontWeight: '600' }}>Delete Account Permanently</span>
        </button>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', marginBottom: 20 }} />

        <button 
          onClick={logout}
          style={{ 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '12px', 
            backgroundColor: 'white', 
            border: 'none', 
            padding: '15px', 
            borderRadius: '12px',
            color: 'black',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
            fontWeight: '700'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>

      <p style={{ textAlign: 'center', color: 'var(--text-gray)', fontSize: '0.8rem', marginTop: 40 }}>
        Pushup Trainer v1.1.0
      </p>
    </div>
  );
};

export default SettingsView;
