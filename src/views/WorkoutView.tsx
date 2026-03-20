import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, Minus, Plus, Play } from 'lucide-react';
import { getPlanForDay } from '../utils/plans';

const WorkoutView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { level, sessionsCompleted, completeWorkout } = useApp();
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [repsCompleted, setRepsCompleted] = useState(0);
  const [sessionSets, setSessionSets] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const { week, day, plan } = getPlanForDay(level, sessionsCompleted);
  const sets = plan.sets;
  const isLastSet = currentSetIndex === sets.length - 1;
  const targetReps = sets[currentSetIndex];

  useEffect(() => {
    setRepsCompleted(targetReps);
  }, [currentSetIndex, targetReps]);

  useEffect(() => {
    let timer: any;
    if (isResting && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsResting(false);
      setTimeLeft(60);
    }
    return () => clearInterval(timer);
  }, [isResting, timeLeft]);

  const handleCompleteSet = () => {
    const newSets = [...sessionSets, repsCompleted];
    setSessionSets(newSets);
    
    if (isLastSet) {
      setIsFinished(true);
      const totalReps = newSets.reduce((a, b) => a + b, 0);
      completeWorkout({
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        reps: totalReps,
        sets: newSets,
        week: week,
        day: day
      });
    } else {
      setIsResting(true);
      setCurrentSetIndex(prev => prev + 1);
    }
  };

  if (isFinished) {
    return (
      <div className="main-content" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
          <CheckCircle size={60} color="var(--primary-green)" />
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: 15 }}>Workout Complete!</h1>
        <p style={{ color: 'var(--text-gray)', fontSize: '1.2rem', marginBottom: 50 }}>
          Great job! You finished Week {week}, Day {day}.
        </p>
        <button className="btn-primary" onClick={onComplete}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (isResting) {
    const progress = (timeLeft / 60) * 100;
    return (
      <div className="main-content" style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: 5 }}>WEEK {week} // <span style={{ color: 'var(--primary-green)' }}>DAY {day}</span></h3>
        <p style={{ color: 'var(--text-gray)', marginBottom: 30 }}>Set {currentSetIndex + 1}/{sets.length}</p>

        <div style={{ position: 'relative', width: '250px', height: '250px', margin: '40px auto' }}>
          <svg width="250" height="250" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--primary-green)" strokeWidth="5" 
                    strokeDasharray="282.7" strokeDashoffset={282.7 * (1 - progress / 100)} 
                    style={{ transition: 'stroke-dashoffset 1s linear' }} />
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '5rem', fontWeight: '800' }}>
            {timeLeft}s
          </div>
        </div>

        <h2 style={{ fontSize: '2rem', marginBottom: 40 }}>Rest & Recover</h2>
        
        <button 
          className="btn-primary" 
          onClick={() => {
            setIsResting(false);
            setTimeLeft(60);
          }} 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          Skip Rest <Play size={20} fill="currentColor" />
        </button>
      </div>
    );
  }

  return (
    <div className="main-content" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        <h3 style={{ fontSize: '2.2rem', fontWeight: '900' }}>WEEK {week} // <span style={{ color: 'var(--primary-green)' }}>DAY {day}</span></h3>
        <p style={{ fontWeight: '700' }}>Set <span style={{ fontSize: '1.8rem' }}>{currentSetIndex + 1}</span> / {sets.length}</p>
      </div>
      <p style={{ color: 'var(--text-gray)', textAlign: 'left', marginBottom: 20 }}>Target: {sets.length} sets, total volume focus</p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: 40 }}>
        {sets.map((_, i) => (
          <div key={i} style={{ flex: 1, height: '6px', backgroundColor: i <= currentSetIndex ? 'var(--primary-green)' : 'rgba(255,255,255,0.1)', borderRadius: '3px' }}></div>
        ))}
      </div>

      <div className="card" style={{ padding: '40px 20px', marginBottom: 40 }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)', textTransform: 'uppercase', fontWeight: '700', marginBottom: 10 }}>Target Reps</p>
        <h2 style={{ fontSize: '6rem', fontWeight: '900', marginBottom: 30 }}>{targetReps}{isLastSet ? '+' : ''}</h2>

        <p style={{ color: 'var(--text-gray)', fontSize: '1rem', marginBottom: 20 }}>Actual Reps Completed</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <button className="card" style={{ padding: '15px', borderRadius: '12px', marginBottom: 0 }} onClick={() => setRepsCompleted(Math.max(0, repsCompleted - 1))}>
            <Minus size={24} />
          </button>
          <div style={{ width: '100px', fontSize: '3rem', fontWeight: '800' }}>{repsCompleted}</div>
          <button className="card" style={{ padding: '15px', borderRadius: '12px', marginBottom: 0 }} onClick={() => setRepsCompleted(repsCompleted + 1)}>
            <Plus size={24} />
          </button>
        </div>
      </div>

      <button className="btn-primary" onClick={handleCompleteSet}>
        {isLastSet ? 'Finish Workout' : 'Complete Set'}
      </button>
    </div>
  );
};

export default WorkoutView;
