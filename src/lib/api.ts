import { Job, PricingRule, User } from '../types';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
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

  // AI Quote Generation
  generateQuote: (data: { businessId: string; description: string }) =>
    fetchApi('/quote/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};