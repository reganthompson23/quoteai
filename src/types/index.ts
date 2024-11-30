export interface User {
  id: string;
  email: string;
  businessName: string;
  industry: string;
  createdAt: Date;
}

export interface Job {
  id: string;
  businessId: string;
  title: string;
  description: string;
  price: number;
  createdAt: Date;
}

export interface Rule {
  id: string;
  businessId: string;
  title: string;
  description: string;
  isActive: boolean;
}