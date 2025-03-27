import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  profile: {
    businessName: string;
    industry: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, businessName: string, industry: string) => Promise<void>;
  logout: () => Promise<void>;
  setProfile: (profile: AuthState['profile']) => void;
  setSession: (session: { user: User } | null) => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  profile: null,

  setSession: (session) => {
    set({
      user: session?.user || null,
      isAuthenticated: !!session?.user,
    });
  },

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      // Fetch profile data from profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('businessName, industry')
        .eq('id', data.user.id)
        .single();

      set({ 
        user: data.user, 
        isAuthenticated: true,
        profile: profile || null
      });
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

  setProfile: (profile) => set({ profile }),

  setUser: (user) => set({ user }),
}));