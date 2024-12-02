import React from 'react';
import { Brain, Gauge, BarChart, MessageSquare } from 'lucide-react';

const features = [
  {
    name: 'AI-Powered Precision',
    description: 'Our advanced AI engine learns from your pricing history to deliver consistently accurate estimates.',
    icon: Brain,
  },
  {
    name: 'Real-Time Automation',
    description: 'Instantly generate precise quotes based on your business rules and market conditions.',
    icon: Gauge,
  },
  {
    name: 'Business Intelligence',
    description: 'Track performance metrics and gain actionable insights to optimize your pricing strategy.',
    icon: BarChart,
  },
  {
    name: 'Smart Chat Interface',
    description: 'Engage customers 24/7 with our intelligent chat widget that speaks your business language.',
    icon: MessageSquare,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Automated Precision
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Streamline Your Pricing Process
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            PricePilot combines AI intelligence with your business expertise to deliver accurate, consistent pricing across all channels.
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