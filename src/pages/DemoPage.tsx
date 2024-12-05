import React from 'react';
import { ChatList } from '../components/demo/ChatList';
import { PricingRules } from '../components/demo/PricingRules';
import { Stats } from '../components/demo/Stats';

const DEMO_BUSINESS = {
  name: "Pete's Painting",
  description: "Professional Painting Services - Interior & Exterior",
  rules: [
    {
      id: 1,
      name: "Heritage Listed Building",
      description: "Additional care and specialized materials required",
      adjustment: "20% increase",
      type: "percentage",
      value: 20
    },
    {
      id: 2,
      name: "Multi-Story External",
      description: "Per story surcharge for external painting",
      adjustment: "10% per story",
      type: "percentage_per_unit",
      value: 10
    }
  ]
};

export function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {DEMO_BUSINESS.name}
            </h1>
            <p className="text-sm text-gray-500">{DEMO_BUSINESS.description}</p>
          </div>
          <div className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
            Demo Account
          </div>
        </div>
      </header>
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ChatList />
          </div>
          <div className="space-y-8">
            <Stats />
            <PricingRules rules={DEMO_BUSINESS.rules} />
          </div>
        </div>
      </main>
    </div>
  );
} 