import React from 'react';
import { Brain, Clock, PieChart, MessageSquare } from 'lucide-react';

const features = [
  {
    name: 'AI-Powered Pricing',
    description: 'Smart pricing based on your historical data and business rules.',
    icon: Brain,
  },
  {
    name: '24/7 Availability',
    description: 'Provide instant quotes to customers anytime, anywhere.',
    icon: Clock,
  },
  {
    name: 'Data Insights',
    description: 'Gain valuable insights from your pricing and customer data.',
    icon: PieChart,
  },
  {
    name: 'Smart Chat Widget',
    description: 'Customizable chat widget that learns from every interaction.',
    icon: MessageSquare,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Faster Quotes
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to automate your pricing
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Save time and increase accuracy with our AI-powered quoting system. Perfect for contractors, service providers, and small businesses.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.name} className="flex flex-col items-start">
                  <div className="rounded-lg bg-blue-600 p-2 ring-1 ring-blue-600">
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <dt className="mt-4 font-semibold text-gray-900">
                    {feature.name}
                  </dt>
                  <dd className="mt-2 leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
}