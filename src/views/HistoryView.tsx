import React from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Calendar } from 'lucide-react';
import { getPlanForDay } from '../utils/plans';

const HistoryView: React.FC = () => {
  const { history, level } = useApp();

  return (
    <div className="main-content">
      <h1 style={{ fontSize: '2rem', marginBottom: 10 }}>Workout History</h1>
      <p className="subtitle" style={{ marginBottom: 30 }}>Your journey so far.</p>

      {history.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 100 }}>
          <p style={{ color: 'var(--text-gray)', fontSize: '1.2rem' }}>No workouts recorded yet. Start training!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {history.map((session: any, index: number) => {
            // Calculate a fallback set list if data is missing for old sessions
            // This is just to make the UI look complete for older data.
            let displaySets = session.sets;
            if (!displaySets || displaySets.length === 0) {
              const sessionIndexFromEnd = history.length - 1 - index;
              const { plan } = getPlanForDay(level, sessionIndexFromEnd);
              displaySets = plan?.sets || [];
            }

            return (
              <div key={session.id} className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: 20 }}>
                  <div style={{ 
                    backgroundColor: 'rgba(16, 185, 129, 0.05)', 
                    padding: '15px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    border: '1px solid rgba(16, 185, 129, 0.1)'
                  }}>
                    <Trophy size={30} color="var(--primary-green)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '1.4rem', marginBottom: 6 }}>WEEK {session.week} / DAY {session.day}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                      <Calendar size={14} />
                      <span>{new Date(session.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'left', minWidth: '100px' }}>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', marginBottom: 5 }}>Total Reps</p>
                    <p style={{ color: 'var(--primary-green)', fontWeight: '900', fontSize: '2rem' }}>{session.reps}</p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' }}>
                    {displaySets.map((reps: number, i: number) => (
                      <div key={i} style={{ 
                        width: '40px', 
                        height: '40px', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        flexShrink: 0
                      }}>
                        {reps}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
