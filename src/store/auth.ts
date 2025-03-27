import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User as AppUser } from '../types';
import { persist, createJSONStorage } from 'zustand/middleware';

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
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

      signup: async (email, password, businessName, industry) => {
        try {
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

          if (authError) throw authError;
          if (!authData.user) throw new Error('Signup failed - no user returned');

          // Create their profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: authData.user.id,
                businessName,
                industry,
                name: '',
                phone: '',
              }
            ])
            .select()
            .single();

          if (profileError) {
            await supabase.auth.signOut();
            throw new Error(`Failed to create profile: ${profileError.message}`);
          }

          set({ 
            user: authData.user, 
            isAuthenticated: true,
            profile
          });

        } catch (error) {
          console.error('Signup process error:', error);
          throw error;
        }
      },

      logout: async () => {
        try {
          // Sign out from Supabase
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          
          // Clear all auth-related storage
          localStorage.removeItem('auth-storage');
          localStorage.removeItem('supabase-auth');
          
          // Reset the store state
          set({ 
            user: null, 
            isAuthenticated: false, 
            profile: null 
          }, true); // true here means we replace the state entirely

          // Force a page reload to clear any remaining state
          window.location.href = '/login';
        } catch (error) {
          console.error('Logout error:', error);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        profile: state.profile
      })
    }
  )
);