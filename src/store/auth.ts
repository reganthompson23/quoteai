import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  loginAsDemo: () => void;
}

const demoUser: User = {
  id: 'demo-user',
  email: 'regan@syndicatestore.com.au',
  businessName: 'Syndicate Painting',
  industry: 'Painting',
  createdAt: new Date(),
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
  loginAsDemo: () => set({ user: demoUser, isAuthenticated: true }),
}));