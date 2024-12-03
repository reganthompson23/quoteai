import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Check, HelpCircle } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  explanation: string;
}

const growthFeatures: Feature[] = [
  {
    title: 'Unlimited free trial in admin dashboard',
    description: 'Test and configure your estimate bot without any time limits',
    explanation: 'Access all features in your admin dashboard indefinitely. Only start paying when you\'re ready to embed the widget on your website and start collecting real leads.'
  },
  {
    title: 'AI-powered estimate bot with custom pricing rules',
    description: 'Your intelligent assistant that knows your pricing',
    explanation: 'Train the AI with your specific pricing structure and business rules. The bot learns how you price different scenarios and applies this knowledge consistently across all customer interactions.'
  },
  {
    title: 'Automated lead capture & qualification',
    description: 'Never miss a potential customer',
    explanation: 'Every website visitor interaction is captured with contact details and project requirements. The bot qualifies leads by collecting key information before providing estimates.'
  },
  {
    title: 'Project requirement collection',
    description: 'Detailed scope gathering from every lead',
    explanation: 'The bot intelligently asks questions to understand project scope, ensuring you get all the information needed to provide accurate estimates. No more back-and-forth emails.'
  },
  {
    title: 'Self-service or assisted widget setup',
    description: 'Easy implementation, your way',
    explanation: 'Choose to implement the widget yourself with our step-by-step guide, or let us handle the technical setup for you. Either way, you\'ll be up and running quickly.'
  },
  {
    title: 'Email support',
    description: 'Help when you need it',
    explanation: 'Get assistance with any questions or issues via email. Our team is here to help you make the most of your estimate bot.'
  },
];

const transformFeatures: Feature[] = [
  {
    title: 'Everything in Growth, plus:',
    description: 'All Growth features included',
    explanation: 'Get all the powerful features from the Growth plan, plus everything listed below for a complete business transformation.'
  },
  {
    title: 'Custom website design & development',
    description: 'Professional web presence',
    explanation: 'Get a modern, professionally designed website that converts visitors into customers. We handle everything from design to development, optimized for your business.'
  },
  {
    title: 'Expert bot configuration & training',
    description: 'Hands-on setup and optimization',
    explanation: 'We work directly with you to understand your business and configure the bot perfectly. We\'ll train it with your pricing structure and business rules for optimal performance.'
  },
  {
    title: 'Business-specific integrations (booking, payments)',
    description: 'Seamless business tools',
    explanation: 'Connect your estimate bot with booking systems, payment processors, and other tools specific to your business. Create a smooth end-to-end experience for your customers.'
  },
  {
    title: 'SEO optimization & content strategy',
    description: 'Attract more customers',
    explanation: 'We optimize your website for search engines and develop a content strategy that brings more qualified leads to your business. Includes keyword research and implementation.'
  },
  {
    title: 'Monthly performance review & priority support',
    description: 'Ongoing optimization',
    explanation: 'Regular check-ins to review bot performance, lead quality, and conversion rates. Get priority support for any issues and continuous improvements based on real data.'
  },
];

function FeatureTooltip({ isOpen, content }: { isOpen: boolean; content: string }) {
  if (!isOpen) return null;
  
  return (
    <div className="absolute left-0 top-full mt-2 w-64 z-10 p-3 rounded-lg bg-gray-900 text-white text-sm shadow-lg">
      {content}
      <div className="absolute left-4 -top-2">
        <div className="h-3 w-3 -rotate-45 bg-gray-900" />
      </div>
    </div>
  );
}

function FeatureItem({ feature, isBlue = false }: { feature: Feature; isBlue?: boolean }) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setIsTooltipOpen(false);
      }
    }

    // Only add the listener if the tooltip is open
    if (isTooltipOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isTooltipOpen]);
  
  return (
    <li ref={itemRef} className="flex gap-x-3 relative group">
      <Check 
        className={`h-6 w-5 flex-none ${isBlue ? 'text-white' : 'text-blue-600'}`} 
        aria-hidden="true" 
      />
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <span className={isBlue ? 'text-blue-100' : 'text-gray-600'}>
            {feature.title}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsTooltipOpen(!isTooltipOpen);
            }}
            className="inline-flex items-center focus:outline-none"
            aria-label="Show feature details"
          >
            <HelpCircle className={`h-4 w-4 ${
              isBlue 
                ? 'text-blue-200 hover:text-blue-100' 
                : 'text-gray-400 hover:text-gray-500'
            }`} />
          </button>
        </div>
        <FeatureTooltip 
          isOpen={isTooltipOpen} 
          content={feature.explanation}
        />
      </div>
    </li>
  );
}

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
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6">
              {growthFeatures.map((feature, index) => (
                <FeatureItem 
                  key={feature.title} 
                  feature={feature}
                  index={index}
                />
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
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6">
              {transformFeatures.map((feature, index) => (
                <FeatureItem 
                  key={feature.title} 
                  feature={feature}
                  isBlue
                  index={index}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 