import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/layout/Container';
import { MessageSquare, Clock, Calculator } from 'lucide-react';

const benefits = [
  {
    title: 'Accurate Drywall Quotes',
    description: 'Let AI handle measurements and calculations while you focus on delivering quality drywall installations',
    icon: Calculator,
  },
  {
    title: 'Automated Lead Capture',
    description: 'Your website works 24/7 to qualify leads and provide instant drywall quotes, never missing a potential project',
    icon: MessageSquare,
  },
  {
    title: 'Smart Pricing System',
    description: 'Account for wall dimensions, finishing levels, material costs, and installation complexity with flexible pricing rules',
    icon: Clock,
  },
];

const steps = [
  {
    title: 'Share Your Experience',
    description: 'Upload your past drywall projects and pricing data to help the AI understand your business model',
  },
  {
    title: 'Configure Your Rules',
    description: 'Set up pricing for different drywall types, finishing levels, and installation methods',
  },
  {
    title: 'Generate Smart Quotes',
    description: 'Let the AI chatbot gather requirements and provide accurate drywall quotes based on your criteria',
  },
];

export function DrywallLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Drywall Quote Software | AI-Powered Drywall Estimates</title>
        <meta name="description" content="Transform your drywall business with intelligent quoting software. Generate instant estimates for residential and commercial projects. Start free trial!" />
        <meta name="keywords" content="drywall quote software, drywall estimate system, drywall installation quotes, drywall contractor software" />
        <meta property="og:title" content="Drywall Quote Software | AI-Powered Drywall Estimates" />
        <meta property="og:description" content="Transform your drywall business with intelligent quoting software. Generate instant estimates for residential and commercial projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/drywall-quote-software" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Drywall Quote Software",
            "applicationCategory": "BusinessApplication",
            "description": "Automated quoting software designed specifically for drywall contractors and companies.",
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
          Streamline Your
          <span className="relative whitespace-nowrap text-blue-600">
            <span className="relative"> Drywall Business</span>
          </span>
          <br />
          With Smart Quotes
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Convert website visitors into qualified drywall leads with AI-powered quotes. From residential renovations to commercial build-outs, automate your estimation process.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Button href="/signup" color="blue">
            Start Your Free Trial
          </Button>
        </div>
      </Container>

      {/* How It Works Section */}
      <section aria-labelledby="how-it-works-title" className="bg-white">
        <Container className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 id="how-it-works-title" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Simplify Your Drywall Quotes
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
                Built for Drywall Professionals
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

      {/* FAQ Section */}
      <section aria-labelledby="faq-title" className="bg-white">
        <Container className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 id="faq-title" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Common Questions About Our Drywall Software
              </h2>
            </div>
            <div className="mx-auto mt-16 max-w-2xl">
              <dl className="space-y-8">
                <div>
                  <dt className="text-lg font-semibold leading-8 text-gray-900">
                    How does the software handle different drywall projects?
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-gray-600">
                    You'll set up custom pricing rules for each type of project - from basic installations to custom finishes. Upload your past jobs and define your pricing structure, and the AI will follow your specific approach for each category.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-semibold leading-8 text-gray-900">
                    What information does the AI collect from potential clients?
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-gray-600">
                    The chatbot gathers essential details like room dimensions, wall heights, finishing levels, and specific requirements. Based on your pricing rules, it generates an estimate and saves all project information in your dashboard.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-semibold leading-8 text-gray-900">
                    Can I review quotes before finalizing?
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-gray-600">
                    Absolutely! While the AI provides initial estimates, you maintain full control. Each lead appears in your dashboard with complete project details, allowing you to review and adjust quotes based on any additional factors before finalizing with the client.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* Use Cases */}
      <section aria-labelledby="use-cases-title" className="bg-gray-50">
        <Container className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 id="use-cases-title" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Real Drywall Scenarios
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                See how drywall professionals use our software to streamline their quoting process:
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="relative block p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">New Construction</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    "The chatbot assesses floor plans, ceiling heights, and finishing requirements. It factors in materials, labor, and complexity to provide comprehensive quotes."
                  </p>
                </div>
                <div className="relative block p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Commercial Renovations</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    "For office renovations, the AI helps create detailed quotes considering demolition needs, soundproofing requirements, and project timelines."
                  </p>
                </div>
                <div className="relative block p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Repair Work</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    "When clients need repairs or patches, our software quickly evaluates damage extent, matching requirements, and finishing needs to generate accurate quotes."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sign Up Section */}
      <section aria-labelledby="cta-title" className="bg-blue-50">
        <Container className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 id="cta-title" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              Ready to Transform Your Drywall Business?
            </h2>
            <Button href="/signup" color="blue" className="mx-auto">
              Start Your Free Trial Today
            </Button>
            <p className="mt-4 text-sm text-gray-600">No credit card required. Cancel anytime.</p>
          </div>
        </Container>
      </section>
    </div>
  );
} 