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

// Initialize state from localStorage if available
const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');
const initialUser = storedUser ? JSON.parse(storedUser) : null;

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken,
  user: initialUser,
  isAuthenticated: !!storedToken && !!initialUser,
  login: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },
  setUser: (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    set({ user, isAuthenticated: !!user });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null, isAuthenticated: false });
  },
  loginAsDemo: () => {
    const demoToken = 'demo-token';
    localStorage.setItem('token', demoToken);
    localStorage.setItem('user', JSON.stringify(demoUser));
    set({ token: demoToken, user: demoUser, isAuthenticated: true });
  },
}));