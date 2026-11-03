import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface StudentProfile {
  fullName: string;
  collegeEmail: string;
  college: string;
  branch: string;
  year: string;
  scholarNo?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: StudentProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, profileData: StudentProfile) => Promise<{ error: string | null; requiresConfirmation?: boolean }>;
  signOut: () => Promise<void>;
  signInDemoStudent: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'sati-demo-student-001',
  app_metadata: {},
  user_metadata: {
    full_name: 'Abhishek Sharma',
    college: 'Samrat Ashok Technological Institute (SATI), Vidisha',
    branch: 'Computer Science & Engineering (CSE)',
    year: '1st Year',
    scholar_no: '0108CS261042'
  },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  email: 'abhishek.sharma@satiengg.in'
} as User;

const DEMO_PROFILE: StudentProfile = {
  fullName: 'Abhishek Sharma',
  collegeEmail: 'abhishek.sharma@satiengg.in',
  college: 'Samrat Ashok Technological Institute (SATI), Vidisha',
  branch: 'Computer Science & Engineering (CSE)',
  year: '1st Year',
  scholarNo: '0108CS261042'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Sync Supabase Auth session on mount and listen to changes
  useEffect(() => {
    // Check if demo user is stored in local session
    const storedDemo = localStorage.getItem('sati_auth_demo_user');
    if (storedDemo) {
      setUser(DEMO_USER);
      setProfile(DEMO_PROFILE);
      setLoading(false);
      return;
    }

    // Supabase auth subscription
    const initAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setSession(data.session);
          setUser(data.session.user);
          extractProfile(data.session.user);
        }
      } catch (err) {
        console.error('Supabase session fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        if (currentSession?.user) {
          extractProfile(currentSession.user);
        } else {
          // If not demo user, clear profile
          if (!localStorage.getItem('sati_auth_demo_user')) {
            setProfile(null);
          }
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const extractProfile = (currentUser: User) => {
    const meta = currentUser.user_metadata || {};
    setProfile({
      fullName: meta.full_name || currentUser.email?.split('@')[0] || 'SATI Student',
      collegeEmail: currentUser.email || '',
      college: meta.college || 'Samrat Ashok Technological Institute (SATI), Vidisha',
      branch: meta.branch || 'Computer Science & Engineering (CSE)',
      year: meta.year || '1st Year',
      scholarNo: meta.scholar_no || ''
    });
  };

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    try {
      localStorage.removeItem('sati_auth_demo_user');
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        setUser(data.user);
        extractProfile(data.user);
      }
      return { error: null };
    } catch (err: any) {
      return { error: err?.message || 'Authentication failed. Please verify credentials.' };
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    profileData: StudentProfile
  ): Promise<{ error: string | null; requiresConfirmation?: boolean }> => {
    try {
      localStorage.removeItem('sati_auth_demo_user');
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: profileData.fullName,
            college: profileData.college,
            branch: profileData.branch,
            year: profileData.year,
            scholar_no: profileData.scholarNo
          }
        }
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        setUser(data.user);
        setProfile(profileData);
        // If Supabase requires email confirmation, session might be null
        const requiresConfirmation = !data.session;
        return { error: null, requiresConfirmation };
      }
      return { error: null };
    } catch (err: any) {
      return { error: err?.message || 'Registration failed. Please check network and try again.' };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('sati_auth_demo_user');
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const signInDemoStudent = () => {
    localStorage.setItem('sati_auth_demo_user', 'true');
    setUser(DEMO_USER);
    setProfile(DEMO_PROFILE);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signIn,
      signUp,
      signOut,
      signInDemoStudent
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
