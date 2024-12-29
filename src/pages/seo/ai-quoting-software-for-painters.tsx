import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/layout/Container';
import { MessageSquare, Clock, Calculator } from 'lucide-react';

const benefits = [
  {
    title: 'Save Hours on Painting Estimates',
    description: 'AI-powered automation handles your painting estimates while you focus on growing your painting business',
    icon: Clock,
  },
  {
    title: 'Capture More Painting Leads',
    description: 'Provide instant, professional painting quotes to potential clients 24/7',
    icon: MessageSquare,
  },
  {
    title: 'Accurate Painting Job Pricing',
    description: 'Set custom rules that match your exact pricing strategy for different types of painting jobs - interior, exterior, commercial, and residential',
    icon: Calculator,
  },
];

const steps = [
  {
    title: 'Upload Your Painting Data',
    description: 'Add your past painting invoices and job details to personalize your quoting experience',
  },
  {
    title: 'Set Your Painting Pricing Rules',
    description: 'Customize the software to match your unique painting service pricing structure',
  },
  {
    title: 'Engage Painting Customers',
    description: 'Let the AI chatbot provide quick painting estimates and capture qualified leads automatically',
  },
];

export function PaintersLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>AI Quoting Software for Painters | Automated Painting Estimates</title>
        <meta name="description" content="Transform your painting business with our AI quoting software. Get accurate painting estimates in seconds, automate lead capture, and grow your painting company. Start free trial!" />
        <meta name="keywords" content="painting estimates software, ai quoting for painters, painting business software, painting estimate calculator, automated painting quotes" />
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="AI Quoting Software for Painters | Automated Painting Estimates" />
        <meta property="og:description" content="Transform your painting business with our AI quoting software. Get accurate painting estimates in seconds, automate lead capture, and grow your painting company." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/ai-quoting-software-for-painters" />
        {/* Schema.org markup for rich snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "AI Quoting Software for Painters",
            "applicationCategory": "BusinessApplication",
            "description": "Automated quoting software specifically designed for painting contractors and businesses.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <Container className="pt-20 pb-16 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
          AI Quoting Software for{' '}
          <span className="relative whitespace-nowrap text-blue-600">
            <span className="relative">Painting Contractors</span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Get accurate painting estimates in seconds, capture more leads, and grow your painting business with AI-powered quoting software.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Button href="/signup" color="blue">
            Start Your Free Painting Software Trial
          </Button>
        </div>
      </Container>

      {/* How It Works Section */}
      <section aria-labelledby="how-it-works-title" className="bg-white">
        <Container className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 id="how-it-works-title" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                How Our Painting Estimate Software Works: 3 Simple Steps
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
      </section>

      {/* Benefits Section */}
      <section aria-labelledby="benefits-title">
        <Container className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 id="benefits-title" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Why Painting Contractors Choose Our AI Quoting Software
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
      </section>

      {/* Sign Up Section */}
      <section aria-labelledby="cta-title" className="bg-blue-50">
        <Container className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 id="cta-title" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              Start Automating Your Painting Estimates Today
            </h2>
            <Button href="/signup" color="blue" className="mx-auto">
              Try Our Painting Estimate Software Free
            </Button>
            <p className="mt-4 text-sm text-gray-600">No credit card required. Cancel anytime.</p>
          </div>
        </Container>
      </section>
    </div>
  );
} 