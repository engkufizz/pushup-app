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
  restDuration: number;
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
  restDuration: 60,
};

interface AppContextType extends AppState {
  signIn: (username: string, password: string) => Promise<boolean>;
  signUp: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  finishPlacement: (reps: number) => Promise<void>;
  completeWorkout: (session: WorkoutSession) => Promise<void>;
  updateSettings: (settings: Partial<UserData>) => Promise<void>;
  resetProgress: () => Promise<void>;
  deleteAccount: () => Promise<void>;
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
          // Merge defaults to ensure missing keys (like restDuration) are filled
          setState(s => ({ 
            ...s, 
            ...DEFAULT_USER_DATA, 
            ...data.data, 
            loading: false 
          }));
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
        // Merge defaults with fetched data to ensure new fields (like restDuration) exist for old users
        setState({ 
          user: username, 
          ...DEFAULT_USER_DATA, // Start with defaults
          ...data.data,        // Override with DB data
          loading: false 
        });
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

  const updateSettings = async (settings: Partial<UserData>) => {
    const updatedUserData: UserData = {
      level: settings.level ?? state.level,
      maxPushups: settings.maxPushups ?? state.maxPushups,
      totalReps: settings.totalReps ?? state.totalReps,
      sessionsCompleted: settings.sessionsCompleted ?? state.sessionsCompleted,
      history: settings.history ?? state.history,
      hasCompletedPlacement: settings.hasCompletedPlacement ?? state.hasCompletedPlacement,
      restDuration: settings.restDuration ?? state.restDuration,
    };

    setState(s => ({ ...s, ...updatedUserData }));
    if (state.user) await syncToCloud(state.user, updatedUserData);
  };

  const resetProgress = async () => {
    const updatedUserData: UserData = {
      ...DEFAULT_USER_DATA,
      restDuration: state.restDuration // Keep rest duration even on reset
    };
    setState(s => ({ ...s, ...updatedUserData }));
    if (state.user) await syncToCloud(state.user, updatedUserData);
  };

  const deleteAccount = async () => {
    if (!state.user) return;
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('username', state.user);
    
    if (!error) {
      logout();
    } else {
      alert("Error deleting account: " + error.message);
    }
  };

  const finishPlacement = async (reps: number) => {
    let level = 1;
    if (reps > 40) level = 9;
    else if (reps >= 36) level = 8;
    else if (reps >= 31) level = 7;
    else if (reps >= 26) level = 6;
    else if (reps >= 21) level = 5;
    else if (reps >= 16) level = 4;
    else if (reps >= 12) level = 3;
    else if (reps >= 9) level = 2;
    
    const updatedUserData: UserData = {
      level,
      maxPushups: reps,
      totalReps: state.totalReps,
      sessionsCompleted: state.sessionsCompleted,
      history: state.history,
      hasCompletedPlacement: true,
      restDuration: state.restDuration,
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
      restDuration: state.restDuration,
    };

    setState(s => ({ ...s, ...updatedUserData }));
    if (state.user) await syncToCloud(state.user, updatedUserData);
  };

  return (
    <AppContext.Provider value={{ 
      ...state, 
      signIn, 
      signUp, 
      logout, 
      finishPlacement, 
      completeWorkout,
      updateSettings,
      resetProgress,
      deleteAccount
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
