import { Job, PricingRule, User } from '../types';
import { supabase } from './supabase';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  const url = `${API_URL}${endpoint}`;
  
  try {
    console.log(`Making ${options.method || 'GET'} request to:`, url);
    console.log('Request options:', {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    });

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    // First check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // If not JSON, get the text and throw it as an error
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error(`Server error: ${text.slice(0, 200)}...`);
    }

    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    console.error('API Error for', url, ':', error);
    throw error;
  }
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    fetchApi('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    }),

  signup: (data: Partial<User> & { password: string }) =>
    fetchApi('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Admin
  getUsers: () => fetchApi('/admin/users'),
  
  markUserAsViewed: (userId: string) =>
    fetchApi(`/admin/users/${userId}/mark-viewed`, {
      method: 'POST',
    }),

  // Jobs
  getJobs: () => fetchApi('/jobs'),
  
  createJob: (job: Partial<Job>) =>
    fetchApi('/jobs', {
      method: 'POST',
      body: JSON.stringify(job),
    }),

  updateJob: (id: string, job: Partial<Job>) =>
    fetchApi(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(job),
    }),

  // Rules
  getRules: () => fetchApi('/rules'),
  
  createRule: (rule: Partial<PricingRule>) =>
    fetchApi('/rules', {
      method: 'POST',
      body: JSON.stringify(rule),
    }),

  updateRule: (id: string, rule: Partial<PricingRule>) =>
    fetchApi(`/rules/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: rule.title,
        description: rule.description,
        isActive: rule.isActive,
      }),
    }),

  // Chats
  getChats: (page = 0, pageSize = 20) => 
    fetchApi(`/chats?page=${page}&pageSize=${pageSize}`),
  
  getChat: (chatId: string) => 
    fetchApi(`/chats/${chatId}`),

  // AI Quote Generation
  generateQuote: (data: { message: string, businessId: string, isPreview?: boolean, chatId?: string | null, messages?: Array<{ role: string, content: string }> }) =>
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

  updateUserDetails: (data: Partial<User>) =>
    fetchApi('/auth/update-details', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};