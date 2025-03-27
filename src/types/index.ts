export interface User {
  id: string;
  email: string;
  businessName: string;
  industry: string;
  needsPasswordChange?: boolean;
  name: string;
  business_address?: string;
  phone: string;
  about?: string;
  services?: string[];
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
  business_id: string;
  summary: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

// Alias for PricingRule to maintain compatibility
export type Rule = PricingRule;