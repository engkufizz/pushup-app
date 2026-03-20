import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Zap, Trophy, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import { getPlanForDay } from '../utils/plans';

const ActivityChart = ({ history, maxPushups }: { history: any[], maxPushups: number }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  if (history.length === 0) {
    return <p style={{ textAlign: 'center', color: 'var(--text-gray)', padding: '40px 0' }}>No workout data yet</p>;
  }

  // Last 7 workouts
  const recentWorkouts = [...history].slice(0, 7).reverse();

  return (
    <div className="card" style={{ padding: '20px', position: 'relative' }}>
      <div style={{ height: '150px', display: 'flex', alignItems: 'flex-end', gap: '15px', padding: '10px 0' }}>
        {recentWorkouts.map((session) => {
          const heightPercent = Math.max(15, (session.reps / (maxPushups || 1)) * 100);
          const dateLabel = new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          const isActive = activeTooltip === session.id;

          return (
            <div 
              key={session.id} 
              style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', position: 'relative', cursor: 'pointer' }}
              onClick={() => setActiveTooltip(isActive ? null : session.id)}
            >
              {isActive && (
                <div style={{
                  position: 'absolute',
                  bottom: `${heightPercent + 5}%`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#1c2533',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                  zIndex: 10,
                  whiteSpace: 'nowrap',
                  border: '1px solid #2d3748'
                }}>
                  <p style={{ fontSize: '0.8rem', color: 'white', marginBottom: '4px' }}>{dateLabel}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--primary-green)', fontWeight: '700' }}>
                    reps : {session.reps}
                  </p>
                </div>
              )}
              <div style={{ 
                width: '100%',
                minWidth: '30px',
                maxWidth: '60px',
                backgroundColor: 'var(--primary-green)', 
                height: `${heightPercent}%`,
                borderRadius: '6px 6px 0 0',
                opacity: isActive ? 1 : 0.8,
                transition: 'all 0.2s ease'
              }}></div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-gray)', marginTop: 10, whiteSpace: 'nowrap' }}>
                {dateLabel}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DashboardView: React.FC<{ onStartWorkout: () => void }> = ({ onStartWorkout }) => {
  const { user, level, maxPushups, totalReps, sessionsCompleted, history } = useApp();
  const { week, day } = getPlanForDay(level, sessionsCompleted);

  const StatCard = ({ icon: Icon, label, value, subValue }: any) => (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '16px' }}>
      <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px' }}>
        <Icon size={24} color="var(--primary-green)" />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-gray)', textTransform: 'uppercase', fontWeight: '700', marginBottom: 5 }}>{label}</p>
        <p style={{ fontSize: '1.8rem', fontWeight: '800' }}>{value}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>{subValue}</p>
      </div>
    </div>
  );

  return (
    <div className="main-content">
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: '2rem' }}>Overview</h1>
        <p className="subtitle">Welcome back, {user}.</p>
      </div>

      <div style={{ display: 'grid', gap: '10px' }}>
        <StatCard icon={Zap} label="Current Level" value={level} subValue="Keep pushing" />
        <StatCard icon={Trophy} label="Max Pushups" value={maxPushups} subValue="Personal Best" />
        <StatCard icon={TrendingUp} label="Total Reps" value={totalReps} subValue="All time volume" />
        <StatCard icon={Calendar} label="Workouts" value={sessionsCompleted} subValue="Sessions completed" />
      </div>

      <div className="card" style={{ marginTop: 20, padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 20 }}>
          <div style={{ width: '6px', height: '30px', backgroundColor: 'var(--primary-green)', borderRadius: '3px' }}></div>
          <h2 style={{ fontSize: '1.4rem' }}>Next Session</h2>
        </div>
        
        <h3 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: 10 }}>WEEK {week} / <span style={{ color: 'var(--text-gray)' }}>DAY {day}</span></h3>
        <p style={{ color: 'var(--text-gray)', marginBottom: 25 }}>Your next programmed session is ready. Get stronger today.</p>
        
        <button className="btn-primary" onClick={onStartWorkout}>
          Start Workout
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: 20 }}>Recent Activity</h2>
        <ActivityChart history={history} maxPushups={maxPushups} />
      </div>
    </div>
  );
};

export default DashboardView;
