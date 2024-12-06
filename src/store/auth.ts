import create from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

// Initialize state from localStorage
const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');
const initialUser = storedUser ? JSON.parse(storedUser) : null;

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  isAuthenticated: !!storedToken && !!initialUser,
  token: storedToken,
  login: (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },
  updateUser: (user) => {
    const updatedUser = {
      ...user,
      id: user.id || (initialUser?.id ?? ''),  // Preserve the user ID
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    set((state) => ({
      ...state,
      user: updatedUser,
    }));
  },
}));