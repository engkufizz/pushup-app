import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import DumbbellIcon from '../components/DumbbellIcon';
import { ChevronRight } from 'lucide-react';

const PlacementTestView: React.FC = () => {
  const { finishPlacement } = useApp();
  const [reps, setReps] = useState<string>('');

  const handleSubmit = () => {
    finishPlacement(parseInt(reps) || 0);
  };

  return (
    <div className="main-content" style={{ textAlign: 'center' }}>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <DumbbellIcon size={30} color="var(--primary-green)" />
      </div>
      
      <h1 style={{ fontSize: '1.8rem', marginBottom: 15 }}>Placement Test</h1>
      <p style={{ color: 'var(--text-gray)', fontSize: '1rem', lineHeight: '1.5', padding: '0 20px', marginBottom: 40 }}>
        Do as many good-form pushups as you can in one set. Be honest—this sets your program level.
      </p>

      <div style={{ 
        border: '2px solid var(--primary-green)', 
        borderRadius: '16px', 
        padding: '30px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'baseline',
        gap: '10px',
        marginBottom: 30,
        backgroundColor: 'rgba(16, 185, 129, 0.05)'
      }}>
        <input 
          type="number" 
          value={reps} 
          placeholder="0"
          onChange={(e) => setReps(e.target.value)}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'white', 
            fontSize: '3.5rem', 
            fontWeight: '800',
            width: '100px',
            textAlign: 'center',
            outline: 'none'
          }}
        />
        <span style={{ color: 'var(--text-gray)', fontSize: '0.9rem', fontWeight: '700' }}>REPS</span>
      </div>

      <button className="btn-primary" onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        Set My Level <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default PlacementTestView;
