export interface User {
  id: string;
  email: string;
  businessName: string;
  industry: string;
  needsPasswordChange?: boolean;
}

export interface Job {
  id: string;
  businessId: string;
  title: string;
  description: string;
  price: number;
  createdAt: string;
}

export interface PricingRule {
  id: string;
  businessId: string;
  title: string;
  description: string;
  isActive: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Chat {
  id: string;
  businessId: string;
  chatNumber: number;
  summary: string;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  messages: ChatMessage[];
  createdAt: string;
}