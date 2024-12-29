import React from 'react';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/layout/Container';
import { MessageSquare, Clock, Calculator } from 'lucide-react';

const benefits = [
  {
    title: 'Save hours on quoting',
    description: 'AI-powered automation handles your estimates while you focus on your painting business',
    icon: Clock,
  },
  {
    title: 'Capture more leads',
    description: 'Provide instant, professional estimates to potential clients 24/7',
    icon: MessageSquare,
  },
  {
    title: 'Accurate pricing',
    description: 'Set custom rules that match your exact pricing strategy for different types of painting jobs',
    icon: Calculator,
  },
];

const steps = [
  {
    title: 'Upload Your Data',
    description: 'Add past invoices and job details to personalize your experience',
  },
  {
    title: 'Set Your Pricing Rules',
    description: 'Customize the software to match your unique pricing structure',
  },
  {
    title: 'Engage Customers',
    description: 'Let the AI chatbot provide quick estimates and capture leads automatically',
  },
];

export function PaintersLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Container className="pt-20 pb-16 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
          Simplify Painting Job Estimates with{' '}
          <span className="relative whitespace-nowrap text-blue-600">
            <span className="relative">AI-Powered Software</span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Provide quick estimates, capture leads, and save time—all in one simple tool for painters.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Button href="/signup" color="blue">
            Start Your Free Trial Today
          </Button>
        </div>
      </Container>

      {/* How It Works Section */}
      <Container className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How It Works: Simplify Your Quoting Process in 3 Easy Steps
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-gray-900">
                    <div className="rounded-full bg-blue-600 px-3 py-1 text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    {step.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{step.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>

      {/* Benefits Section */}
      <Container className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Painters Love Our AI Quoting Software
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="flex flex-col items-start">
                    <div className="rounded-lg bg-blue-600 p-2 ring-1 ring-blue-600">
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <dt className="mt-4 font-semibold text-gray-900">{benefit.title}</dt>
                    <dd className="mt-2 leading-7 text-gray-600">{benefit.description}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </Container>

      {/* Sign Up Section */}
      <Container className="py-16 bg-blue-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
            Start Simplifying Your Painting Quotes Today
          </h2>
          <Button href="/signup" color="blue" className="mx-auto">
            Sign Up for Your Free Trial Now
          </Button>
          <p className="mt-4 text-sm text-gray-600">No credit card required. Cancel anytime.</p>
        </div>
      </Container>
    </div>
  );
} 