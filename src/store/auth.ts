import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  loginAsDemo: () => void;
}

const demoUser: User = {
  id: 'demo-user',
  email: 'regan@syndicatestore.com.au',
  businessName: 'Syndicate Painting',
  industry: 'Painting',
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  login: (token, user) => set({ token, user, isAuthenticated: true }),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ token: null, user: null, isAuthenticated: false }),
  loginAsDemo: () => set({ user: demoUser, isAuthenticated: true }),
}));