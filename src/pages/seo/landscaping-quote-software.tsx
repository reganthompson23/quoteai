import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/layout/Container';
import { MessageSquare, Clock, Calculator } from 'lucide-react';

const benefits = [
  {
    title: 'Streamline Your Landscaping Quotes',
    description: 'Let AI handle the quote calculations while you focus on designing and creating beautiful outdoor spaces',
    icon: Calculator,
  },
  {
    title: 'Never Miss a Landscaping Lead',
    description: 'Your website works 24/7 to capture new landscaping projects and provide instant quotes to potential clients',
    icon: MessageSquare,
  },
  {
    title: 'Custom Pricing Made Simple',
    description: 'Factor in materials, labor, equipment, and seasonal variations with customizable pricing rules for every type of landscaping project',
    icon: Clock,
  },
];

const steps = [
  {
    title: 'Import Your Project History',
    description: 'Upload your completed landscaping projects and pricing data to help the AI understand your business',
  },
  {
    title: 'Configure Your Pricing Logic',
    description: 'Set up rules for different services - from lawn maintenance to complete landscape transformations',
  },
  {
    title: 'Start Converting Leads',
    description: 'Watch as the AI chatbot qualifies leads and provides professional landscaping quotes based on your criteria',
  },
];

export function LandscapingLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Landscaping Quoting Software | AI-Powered Landscape Estimates</title>
        <meta name="description" content="Transform your landscaping business with intelligent quoting software. Automate estimates for lawn care, garden design, and hardscaping projects. Start your free trial today!" />
        <meta name="keywords" content="landscaping quote software, landscape estimate system, lawn care pricing software, garden design quotes, hardscape estimator" />
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="Landscaping Quoting Software | AI-Powered Landscape Estimates" />
        <meta property="og:description" content="Transform your landscaping business with intelligent quoting software. Automate estimates for lawn care, garden design, and hardscaping projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/landscaping-quoting-software" />
        {/* Schema.org markup for rich snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Landscaping Quote Software",
            "applicationCategory": "BusinessApplication",
            "description": "Automated quoting software designed specifically for landscaping businesses and contractors.",
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
          Transform Your
          <span className="relative whitespace-nowrap text-blue-600">
            <span className="relative"> Landscaping Business</span>
          </span>
          <br />
          with Smart Quoting
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Turn your website visitors into qualified landscaping leads with AI-powered quotes. From simple lawn care to complex garden designs, automate your estimation process.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Button href="/signup" color="blue">
            Start Your Free Landscaping Software Trial
          </Button>
        </div>
      </Container>

      {/* How It Works Section */}
      <section aria-labelledby="how-it-works-title" className="bg-white">
        <Container className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 id="how-it-works-title" className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Automate Your Landscape Quoting in Three Steps
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
                Built for Modern Landscaping Businesses
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
                Questions About Our Landscaping Software
              </h2>
            </div>
            <div className="mx-auto mt-16 max-w-2xl">
              <dl className="space-y-8">
                <div>
                  <dt className="text-lg font-semibold leading-8 text-gray-900">
                    How does the software handle different types of landscaping services?
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-gray-600">
                    You'll set up custom pricing rules for each service type - whether it's regular maintenance, garden installations, or hardscaping projects. Upload your past projects and define your pricing structure, and the AI will follow your specific approach for each service category.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-semibold leading-8 text-gray-900">
                    What project details does the AI collect from potential clients?
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-gray-600">
                    The chatbot gathers essential information like yard dimensions, desired services, material preferences, and any specific requirements. Based on your pricing rules, it generates an estimate and saves all project details in your dashboard for follow-up.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-semibold leading-8 text-gray-900">
                    Can I review leads before confirming the final quote?
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-gray-600">
                    Absolutely! While the AI provides initial estimates, you have full control. Each lead appears in your dashboard with complete project details, allowing you to review and adjust the quote based on any additional factors before finalizing it with the client.
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
                Real Landscaping Scenarios
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                See how landscaping professionals use our software to streamline their quoting process:
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="relative block p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Lawn Maintenance</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    "The chatbot collects property size, service frequency, and specific requirements. It applies our seasonal rates and service packages to generate accurate maintenance quotes."
                  </p>
                </div>
                <div className="relative block p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Garden Design Projects</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    "Clients input their garden vision, and the AI factors in plant costs, labor, and design time. It helps us quickly quote both small gardens and large landscapes."
                  </p>
                </div>
                <div className="relative block p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Hardscaping Installation</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    "Our chatbot gathers project scope, material choices, and site conditions. The software calculates materials, labor, and equipment costs for patios, walkways, and retaining walls."
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
              Ready to Modernize Your Landscaping Business?
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