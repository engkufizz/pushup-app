import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import LoginView from './views/LoginView';
import SignUpView from './views/SignUpView';
import PlacementTestView from './views/PlacementTestView';
import DashboardView from './views/DashboardView';
import WorkoutView from './views/WorkoutView';
import HistoryView from './views/HistoryView';
import { LayoutGrid, Dumbbell, History, LogOut } from 'lucide-react';
import './styles/theme.css';

type View = 'dashboard' | 'workout' | 'history';

function App() {
  const { user, hasCompletedPlacement, logout } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [currentView, setCurrentView] = useState<View>('dashboard');

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
          className="nav-item"
          onClick={logout}
          style={{ background: 'none' }}
        >
          <LogOut size={24} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
