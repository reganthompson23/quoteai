import { Job, PricingRule, User } from '../types';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }

  return data;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signup: (data: Partial<User> & { password: string }) =>
    fetchApi('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Admin
  getUsers: () => fetchApi('/admin/users'),

  // Jobs
  getJobs: () => fetchApi('/jobs'),
  
  createJob: (job: Partial<Job>) =>
    fetchApi('/jobs', {
      method: 'POST',
      body: JSON.stringify(job),
    }),

  // Rules
  getRules: () => fetchApi('/rules'),
  
  createRule: (rule: Partial<PricingRule>) =>
    fetchApi('/rules', {
      method: 'POST',
      body: JSON.stringify(rule),
    }),

  // Chats
  getChats: () => fetchApi('/chats'),
  
  getChat: (chatId: string) => fetchApi(`/chats/${chatId}`),

  // AI Quote Generation
  generateQuote: (data: { businessId: string; description: string }) =>
    fetchApi('/quote/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  async resetUserPassword(userId: string, temporaryPassword: string) {
    const response = await fetch(`${API_URL}/admin/users/${userId}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ temporaryPassword }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to reset password');
    }

    return response.json();
  },

  async changePassword(data: { currentPassword?: string; newPassword: string }) {
    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to change password');
    }

    return response.json();
  },
};