import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateLevel, getLevelRange } from '../utils/plans';
import { ChevronRight, RefreshCw, ArrowUpCircle, CheckCircle } from 'lucide-react';

const LevelTestView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { level, updateSettings, maxPushups } = useApp();
  const [reps, setReps] = useState<string>('');
  const [showOptions, setShowOptions] = useState(false);

  const handleNext = () => {
    if (!reps) return;
    setShowOptions(true);
  };

  const handleSelectLevel = async (newLevel: number) => {
    const repCount = parseInt(reps) || 0;
    await updateSettings({
      level: newLevel,
      sessionsCompleted: 0,
      maxPushups: Math.max(maxPushups, repCount),
      // We could add test history here if we wanted
    });
    onComplete();
  };

  if (showOptions) {
    const repCount = parseInt(reps) || 0;
    const recommendedLevel = calculateLevel(repCount);
    const nextLevel = level + 1;

    return (
      <div className="main-content" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 10 }}>Test Complete!</h1>
        <p style={{ color: 'var(--text-gray)', marginBottom: 30 }}>You did <span style={{ color: 'white', fontWeight: 'bold' }}>{repCount}</span> reps.</p>

        <h3 style={{ fontSize: '1.2rem', marginBottom: 20, textAlign: 'left' }}>Choose your next step:</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* Option 1: Recommended */}
          <button 
            className="card" 
            onClick={() => handleSelectLevel(recommendedLevel)}
            style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', textAlign: 'left', border: '1px solid var(--primary-green)' }}
          >
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '50%' }}>
              <CheckCircle size={24} color="var(--primary-green)" />
            </div>
            <div>
              <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>Recommended: Level {recommendedLevel}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>{getLevelRange(recommendedLevel)}</p>
            </div>
          </button>

          {/* Option 2: Next Level */}
          {nextLevel <= 9 && nextLevel !== recommendedLevel && (
            <button 
              className="card" 
              onClick={() => handleSelectLevel(nextLevel)}
              style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', textAlign: 'left' }}
            >
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '10px', borderRadius: '50%' }}>
                <ArrowUpCircle size={24} color="white" />
              </div>
              <div>
                <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>Go to Level {nextLevel}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>{getLevelRange(nextLevel)}</p>
              </div>
            </button>
          )}

          {/* Option 3: Repeat */}
          <button 
            className="card" 
            onClick={() => handleSelectLevel(level)}
            style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', textAlign: 'left' }}
          >
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '10px', borderRadius: '50%' }}>
              <RefreshCw size={24} color="var(--text-gray)" />
            </div>
            <div>
              <p style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-gray)' }}>Repeat Level {level}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>{getLevelRange(level)}</p>
            </div>
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="main-content" style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: 15 }}>Level {level} Test</h1>
      <p style={{ color: 'var(--text-gray)', fontSize: '1rem', lineHeight: '1.5', padding: '0 20px', marginBottom: 40 }}>
        Do as many pushups as you can. This will determine your next steps.
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

      <button className="btn-primary" onClick={handleNext} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        Next <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default LevelTestView;
