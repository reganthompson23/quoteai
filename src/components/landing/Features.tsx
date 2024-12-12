import React from 'react';
import { MessageSquare, Zap, Brain, BarChart } from 'lucide-react';

const features = [
  {
    name: 'Smart Lead Capture',
    description: 'Automatically collect project requirements and contact details from every website visitor, ensuring no opportunity slips away.',
    icon: MessageSquare,
  },
  {
    name: 'Instant Estimates',
    description: 'Provide accurate estimates 24/7 based on your pricing structure and project scope—no more late-night quote requests sitting in your inbox.',
    icon: Zap,
  },
  {
    name: 'Custom Learning',
    description: 'Your bot learns your exact pricing logic and business rules, delivering estimates that match how you would price each job.',
    icon: Brain,
  },
  {
    name: 'Growth Analytics',
    description: 'Track conversion rates, popular services, and customer interactions to optimize your pricing and grow your business.',
    icon: BarChart,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            From Website Visits to Qualified Leads
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Never Miss an Opportunity
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Convert every website visit into a detailed project scope and qualified lead—all while providing instant estimates that match your pricing structure.
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