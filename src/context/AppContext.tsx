import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WorkoutSession {
  id: string;
  date: string;
  reps: number;
  sets: number[];
  week: number;
  day: number;
}

interface UserData {
  level: number;
  maxPushups: number;
  totalReps: number;
  sessionsCompleted: number;
  history: WorkoutSession[];
  hasCompletedPlacement: boolean;
}

interface AppState extends UserData {
  user: string | null;
}

const DEFAULT_USER_DATA: UserData = {
  level: 0,
  maxPushups: 0,
  totalReps: 0,
  sessionsCompleted: 0,
  history: [],
  hasCompletedPlacement: false,
};

interface AppContextType extends AppState {
  signIn: (username: string) => void;
  signUp: (username: string) => void;
  logout: () => void;
  finishPlacement: (reps: number) => void;
  completeWorkout: (session: WorkoutSession) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Global store of all users
  const [allUsersData, setAllUsersData] = useState<Record<string, UserData>>(() => {
    const saved = localStorage.getItem('pushup_app_users');
    return saved ? JSON.parse(saved) : {};
  });

  // Current session state
  const [state, setState] = useState<AppState>(() => {
    const lastUser = localStorage.getItem('pushup_app_current_user');
    const allUsers = JSON.parse(localStorage.getItem('pushup_app_users') || '{}');
    if (lastUser && allUsers[lastUser]) {
      return { user: lastUser, ...allUsers[lastUser] };
    }
    return { user: null, ...DEFAULT_USER_DATA };
  });

  // Save specific user data whenever their session data changes
  useEffect(() => {
    if (state.user) {
      const updatedData: UserData = {
        level: state.level,
        maxPushups: state.maxPushups,
        totalReps: state.totalReps,
        sessionsCompleted: state.sessionsCompleted,
        history: state.history,
        hasCompletedPlacement: state.hasCompletedPlacement,
      };
      
      const newAllUsers = { ...allUsersData, [state.user]: updatedData };
      setAllUsersData(newAllUsers);
      localStorage.setItem('pushup_app_users', JSON.stringify(newAllUsers));
      localStorage.setItem('pushup_app_current_user', state.user);
    } else {
      localStorage.removeItem('pushup_app_current_user');
    }
  }, [state.level, state.maxPushups, state.totalReps, state.sessionsCompleted, state.history, state.hasCompletedPlacement, state.user]);

  const signIn = (username: string) => {
    const existingData = allUsersData[username];
    if (existingData) {
      setState({ user: username, ...existingData });
    } else {
      // In a real app, you'd check a password and fail. 
      // Here, if user doesn't exist, we'll initialize them.
      setState({ user: username, ...DEFAULT_USER_DATA });
    }
  };

  const signUp = (username: string) => {
    // Initialize new user with default data
    setState({ user: username, ...DEFAULT_USER_DATA });
  };

  const logout = () => {
    setState({ user: null, ...DEFAULT_USER_DATA });
  };

  const finishPlacement = (reps: number) => {
    let level = 1;
    if (reps > 20) level = 3;
    else if (reps >= 6) level = 2;
    
    setState(s => ({
      ...s,
      level,
      maxPushups: reps,
      hasCompletedPlacement: true,
    }));
  };

  const completeWorkout = (session: WorkoutSession) => {
    setState(s => ({
      ...s,
      history: [session, ...s.history],
      totalReps: s.totalReps + session.reps,
      maxPushups: Math.max(s.maxPushups, session.reps),
      sessionsCompleted: s.sessionsCompleted + 1,
    }));
  };

  return (
    <AppContext.Provider value={{ ...state, signIn, signUp, logout, finishPlacement, completeWorkout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
