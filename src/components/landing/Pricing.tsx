import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const growthFeatures = [
  'Unlimited free trial in admin dashboard',
  'AI-powered estimate bot with custom pricing rules',
  'Automated lead capture & qualification',
  'Project requirement collection',
  'Self-service or assisted widget setup',
  'Email support',
];

const transformFeatures = [
  'Everything in Growth, plus:',
  'Custom website design & development',
  'Expert bot configuration & training',
  'Business-specific integrations (booking, payments)',
  'SEO optimization & content strategy',
  'Monthly performance review & priority support',
];

export function Pricing() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Powerful Pricing, Simple Choice
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Start with a free trial, pay only when you're ready to go live
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {/* Growth Plan */}
          <div className="relative rounded-3xl p-8 ring-1 ring-gray-200 lg:rounded-l-3xl lg:rounded-r-none h-full">
            <h3 className="text-lg font-semibold leading-8 text-blue-600">
              Growth Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-600 min-h-[48px]">
              Everything you need to automate estimates
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">$10</span>
              <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-600 min-h-[48px]">
              Start free, pay only when you're ready to add the widget to your site
            </p>
            <Link
              to="/signup"
              className="mt-6 block rounded-md bg-white px-3 py-2 text-center text-sm font-semibold leading-6 text-blue-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ring-1 ring-inset ring-blue-200"
            >
              Start Free Trial
            </Link>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
              {growthFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Transform Plan */}
          <div className="relative rounded-3xl p-8 ring-1 ring-gray-200 bg-blue-600 lg:rounded-l-none lg:rounded-r-3xl h-full">
            <h3 className="text-lg font-semibold leading-8 text-white">
              Transform Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-blue-100 min-h-[48px]">
              Complete digital transformation for your business
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-white">$100</span>
              <span className="text-sm font-semibold leading-6 text-blue-100">/month</span>
            </p>
            <p className="mt-2 text-sm leading-6 text-blue-100 min-h-[48px]">
              Perfect for businesses wanting a complete digital upgrade
            </p>
            <Link
              to="/signup"
              className="mt-6 block rounded-md bg-white px-3 py-2 text-center text-sm font-semibold leading-6 text-blue-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get Started
            </Link>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-blue-100">
              {transformFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 