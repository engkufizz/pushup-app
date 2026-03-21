import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import PlacementTestView from './views/PlacementTestView';
import DashboardView from './views/DashboardView';
import WorkoutView from './views/WorkoutView';
import HistoryView from './views/HistoryView';
import SettingsView from './views/SettingsView';
import { LayoutGrid, Dumbbell, History, Settings } from 'lucide-react';
import './styles/theme.css';

type View = 'dashboard' | 'workout' | 'history' | 'settings';

function App() {
  const { user, hasCompletedPlacement, loading } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [currentView, setCurrentView] = useState<View>('dashboard');

  if (loading) {
    return (
      <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: 'var(--primary-green)', fontWeight: '700' }}>Loading your journey...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app-container">
        {isLogin ? (
          <LoginView onToggle={() => setIsLogin(false)} />
        ) : (
          <SignUpView onToggle={() => setIsLogin(true)} />
        )}
      </div>
    );
  }

  if (!hasCompletedPlacement) {
    return (
      <div className="app-container">
        <PlacementTestView />
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView onStartWorkout={() => setCurrentView('workout')} />;
      case 'workout':
        return <WorkoutView onComplete={() => setCurrentView('dashboard')} />;
      case 'history':
        return <HistoryView />;
      case 'settings':
        return <SettingsView onBack={() => setCurrentView('dashboard')} />;
      default:
        return <DashboardView onStartWorkout={() => setCurrentView('workout')} />;
    }
  };

  return (
    <div className="app-container">
      {renderView()}
      
      <nav className="bottom-nav">
        <button 
          className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
          style={{ background: 'none' }}
        >
          <LayoutGrid size={24} />
          <span>Dashboard</span>
        </button>
        <button 
          className={`nav-item ${currentView === 'workout' ? 'active' : ''}`}
          onClick={() => setCurrentView('workout')}
          style={{ background: 'none' }}
        >
          <Dumbbell size={24} />
          <span>Workout</span>
        </button>
        <button 
          className={`nav-item ${currentView === 'history' ? 'active' : ''}`}
          onClick={() => setCurrentView('history')}
          style={{ background: 'none' }}
        >
          <History size={24} />
          <span>History</span>
        </button>
        <button 
          className={`nav-item ${currentView === 'settings' ? 'active' : ''}`}
          onClick={() => setCurrentView('settings')}
          style={{ background: 'none' }}
        >
          <Settings size={24} />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
