import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

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
  loading: boolean;
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
  signIn: (username: string, password: string) => Promise<boolean>;
  signUp: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  finishPlacement: (reps: number) => Promise<void>;
  completeWorkout: (session: WorkoutSession) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    user: localStorage.getItem('pushup_app_current_user'),
    ...DEFAULT_USER_DATA,
    loading: true
  });

  // Load user data from Supabase on start or user change
  useEffect(() => {
    const loadUserData = async () => {
      if (state.user) {
        setState(s => ({ ...s, loading: true }));
        const { data, error } = await supabase
          .from('users')
          .select('data')
          .eq('username', state.user)
          .single();

        if (data && !error) {
          setState(s => ({ ...s, ...data.data, loading: false }));
        } else {
          setState(s => ({ ...s, loading: false }));
        }
      } else {
        setState(s => ({ ...s, loading: false }));
      }
    };

    loadUserData();
  }, [state.user]);

  // Sync data to Supabase whenever it changes
  const syncToCloud = async (username: string, updatedData: UserData) => {
    const { error } = await supabase
      .from('users')
      .update({ 
        data: updatedData,
        updated_at: new Date().toISOString() 
      })
      .eq('username', username);
    
    if (error) {
      console.error("Cloud Sync Error:", error.message);
    }
  };

  const signIn = async (username: string, password: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('data, password')
      .eq('username', username)
      .single();

    if (data && !error) {
      if (data.password === password) {
        localStorage.setItem('pushup_app_current_user', username);
        // Ensure we only put the actual data into state
        setState({ user: username, ...data.data, loading: false });
        return true;
      } else {
        alert("Incorrect password.");
        return false;
      }
    } else {
      alert("Account not found. Please sign up first.");
      return false;
    }
  };

  const signUp = async (username: string, password: string) => {
    // Check if user exists
    const { data } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single();

    if (data) {
      alert("Username already exists.");
      return false;
    }

    const { error } = await supabase.from('users').insert({
      username,
      password,
      data: DEFAULT_USER_DATA
    });

    if (!error) {
      localStorage.setItem('pushup_app_current_user', username);
      setState({ user: username, ...DEFAULT_USER_DATA, loading: false });
      return true;
    } else {
      alert("Error creating account: " + error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('pushup_app_current_user');
    setState({ user: null, ...DEFAULT_USER_DATA, loading: false });
  };

  const finishPlacement = async (reps: number) => {
    let level = 1;
    if (reps > 20) level = 3;
    else if (reps >= 6) level = 2;
    
    // Create a clean data object without 'user' or 'loading' fields
    const updatedUserData: UserData = {
      level,
      maxPushups: reps,
      totalReps: state.totalReps,
      sessionsCompleted: state.sessionsCompleted,
      history: state.history,
      hasCompletedPlacement: true,
    };
    
    setState(s => ({ ...s, ...updatedUserData }));
    if (state.user) await syncToCloud(state.user, updatedUserData);
  };

  const completeWorkout = async (session: WorkoutSession) => {
    const newHistory = [session, ...state.history];
    const newTotalReps = state.totalReps + session.reps;
    const newMax = Math.max(state.maxPushups, session.reps);
    const newSessions = state.sessionsCompleted + 1;

    const updatedUserData: UserData = {
      level: state.level,
      maxPushups: newMax,
      totalReps: newTotalReps,
      sessionsCompleted: newSessions,
      history: newHistory,
      hasCompletedPlacement: state.hasCompletedPlacement,
    };

    setState(s => ({ ...s, ...updatedUserData }));
    if (state.user) await syncToCloud(state.user, updatedUserData);
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
