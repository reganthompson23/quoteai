import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/layout/Container';
import { MessageSquare, Clock, Calculator } from 'lucide-react';

const benefits = [
  {
    title: 'Precise Roofing Estimates',
    description: 'Let AI handle measurements and calculations while you focus on delivering quality roofing work',
    icon: Calculator,
  },
  {
    title: 'Automated Lead Capture',
    description: 'Your website works around the clock to provide instant roofing quotes and capture new project opportunities',
    icon: MessageSquare,
  },
  {
    title: 'Customizable Pricing Logic',
    description: 'Account for roof pitch, materials, accessibility, and special requirements with flexible pricing rules',
    icon: Clock,
  },
];

const steps = [
  {
    title: 'Upload Your Data',
    description: 'Import your past roofing projects and pricing data to personalize the AI to your business',
  },
  {
    title: 'Define Your Pricing',
    description: 'Set up rules for different roofing types, materials, and project complexities',
  },
  {
    title: 'Automate Your Quotes',
    description: 'Let the AI chatbot gather project details and generate accurate roofing estimates instantly',
  },
];

export function RoofingLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Roofing Quote Software | AI-Powered Roof Estimates</title>
        <meta name="description" content="Modernize your roofing business with intelligent quoting software. Generate accurate estimates for repairs, replacements, and new installations automatically. Start free trial!" />
        <meta name="keywords" content="roofing quote software, roof estimate system, roofing contractor software, roof replacement calculator" />
        <meta property="og:title" content="Roofing Quote Software | AI-Powered Roof Estimates" />
        <meta property="og:description" content="Modernize your roofing business with intelligent quoting software. Generate accurate estimates for repairs, replacements, and new installations automatically." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/roofing-quote-software" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Roofing Quote Software",
            "applicationCategory": "BusinessApplication",
            "description": "Automated quoting software designed specifically for roofing contractors and companies.",
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
          Automate Your
          <span className="relative whitespace-nowrap text-blue-600">
            <span className="relative"> Roofing Quotes</span>
          </span>
          <br />
          With AI
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Transform website visitors into qualified roofing leads with AI-powered estimates. From simple repairs to complete roof replacements, streamline your quote process.
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
                Modernize Your Roofing Estimates
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
                Built for Modern Roofing Companies
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
                Common Questions About Our Roofing Software
              </h2>
            </div>
            <div className="mx-auto mt-16 max-w-2xl">
              <dl className="space-y-8">
                <div>
                  <dt className="text-lg font-semibold leading-8 text-gray-900">
                    How does the software handle different types of roofing projects?
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-gray-600">
                    You'll set up custom pricing rules for each type of project - from repairs to full replacements. Upload your past projects and define your pricing structure, and the AI will follow your specific approach for each category.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-semibold leading-8 text-gray-900">
                    What information does the AI collect from potential clients?
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-gray-600">
                    The chatbot gathers essential details like roof size, pitch, material preferences, and current conditions. Based on your pricing rules, it generates an estimate and saves all project information in your dashboard.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-semibold leading-8 text-gray-900">
                    Can I review estimates before they're sent to clients?
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
                Real Roofing Scenarios
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                See how roofing professionals use our software to streamline their quoting process:
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="relative block p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Residential Replacements</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    "The chatbot collects roof measurements, material choices, and current conditions. It factors in pitch and accessibility to generate comprehensive replacement quotes."
                  </p>
                </div>
                <div className="relative block p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Storm Damage Repairs</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    "For emergency repairs, the AI quickly assesses damage extent and repair requirements. It helps us respond faster with accurate estimates for insurance claims."
                  </p>
                </div>
                <div className="relative block p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Commercial Projects</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    "Our software handles large-scale commercial roofing quotes, factoring in material quantities, labor teams, and project timelines for accurate commercial estimates."
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
              Ready to Transform Your Roofing Business?
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