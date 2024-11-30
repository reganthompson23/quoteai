export interface User {
  id: string;
  email: string;
  businessName: string;
  industry: string;
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