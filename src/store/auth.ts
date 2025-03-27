import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User as AppUser } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  profile: AppUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, businessName: string, industry: string) => Promise<void>;
  logout: () => Promise<void>;
  setProfile: (profile: AuthState['profile']) => void;
  setSession: (session: { user: User } | null) => void;
  refreshProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  profile: null,

  refreshProfile: async () => {
    const { user } = get();
    if (!user) return;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profile) {
      set({ profile });
    }
  },

  setSession: async (session) => {
    set({ user: session?.user || null, isAuthenticated: !!session?.user });
    
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        set({ profile });
      }
    } else {
      set({ profile: null });
    }
  },

  setProfile: (profile) => set({ profile }),

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    set({ 
      user: data.user,
      isAuthenticated: true
    });

    // Fetch profile data after login
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profile) {
      set({ profile });
    }
  },

  signup: async (email: string, password: string, businessName: string, industry: string) => {
    try {
      console.log('Starting signup process...');
      
      // First, sign up the user and sign in immediately
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            businessName,
            industry
          }
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        throw authError;
      }

      if (!authData.user) {
        console.error('No user returned from signup');
        throw new Error('Signup failed - no user returned');
      }

      console.log('User created successfully:', authData.user.id);

      // Immediately sign in after signup
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        console.error('Sign in error:', signInError);
        throw signInError;
      }

      if (!signInData.session) {
        console.error('No session after sign in');
        throw new Error('No session available after sign in');
      }

      console.log('Session established');

      // Then create their profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            businessName,
            industry
          }
        ])
        .select()
        .single();

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // If profile creation fails, we should clean up the auth user
        await supabase.auth.signOut();
        throw new Error(`Failed to create profile: ${profileError.message}`);
      }

      console.log('Profile created successfully:', profileData);

      set({ 
        user: authData.user, 
        isAuthenticated: true,
        profile: { businessName, industry }
      });

      console.log('State updated successfully');
    } catch (error) {
      console.error('Signup process error:', error);
      throw error;
    }
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null, isAuthenticated: false, profile: null });
  },

  setUser: (user) => set({ user }),
}));