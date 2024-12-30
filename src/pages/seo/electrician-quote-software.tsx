import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/layout/Container';
import { MessageSquare, Clock, Calculator } from 'lucide-react';

const benefits = [
  {
    title: 'Precise Electrical Quotes',
    description: 'Let AI handle the calculations while you focus on delivering expert electrical services',
    icon: Calculator,
  },
  {
    title: 'Smart Lead Generation',
    description: 'Your website captures electrical jobs 24/7, ensuring you never miss a residential or commercial opportunity',
    icon: MessageSquare,
  },
  {
    title: 'Flexible Pricing Rules',
    description: 'Account for materials, labor rates, job complexity, and emergency callouts with customizable pricing',
    icon: Clock,
  },
];

const steps = [
  {
    title: 'Share Your Experience',
    description: 'Upload your past electrical jobs and pricing data to help the AI understand your business model',
  },
  {
    title: 'Set Your Standards',
    description: 'Configure pricing for different electrical services - from installations to repairs',
  },
  {
    title: 'Start Converting Leads',
    description: 'Let the AI chatbot qualify leads and provide accurate electrical quotes based on your criteria',
  },
];

export function ElectricianLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Electrician Quote Software | AI-Powered Electrical Estimates</title>
        <meta name="description" content="Streamline your electrical business with intelligent quoting software. Generate instant estimates for installations, repairs, and maintenance. Start free trial!" />
        <meta name="keywords" content="electrician quote software, electrical estimate system, electrical contractor software, electrical job calculator" />
        <meta property="og:title" content="Electrician Quote Software | AI-Powered Electrical Estimates" />
        <meta property="og:description" content="Streamline your electrical business with intelligent quoting software. Generate instant estimates for installations, repairs, and maintenance." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/electrician-quote-software" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Electrician Quote Software",
            "applicationCategory": "BusinessApplication",
            "description": "Automated quoting software designed specifically for electrical contractors and companies.",
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
          Power Up Your
          <span className="relative whitespace-nowrap text-blue-600">
            <span className="relative"> Electrical Business</span>
          </span>
          <br />
          With Smart Quotes
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Convert website visitors into qualified electrical leads with AI-powered quotes. From new installations to emergency repairs, automate your estimation process.
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
                Automate Your Electrical Quotes
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
                Built for Electrical Contractors
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
                Common Questions About Our Electrical Software
              </h2>
            </div>
            <div className="mx-auto mt-16 max-w-2xl">
              <dl className="space-y-8">
                <div>
                  <dt className="text-lg font-semibold leading-8 text-gray-900">
                    How does the software handle different electrical services?
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-gray-600">
                    You'll set up custom pricing rules for each type of service - from new installations to emergency repairs. Upload your past jobs and define your pricing structure, and the AI will follow your specific approach for each category.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-semibold leading-8 text-gray-900">
                    What information does the AI collect from potential clients?
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-gray-600">
                    The chatbot gathers essential details like service type, property details, electrical requirements, and specific needs. Based on your pricing rules, it generates an estimate and saves all project information in your dashboard.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-semibold leading-8 text-gray-900">
                    Can I review quotes before sending them?
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
                Real Electrical Scenarios
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                See how electrical contractors use our software to streamline their quoting process:
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="relative block p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Residential Rewiring</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    "The chatbot assesses property size, age, and requirements. It factors in materials, labor, and complexity to provide comprehensive rewiring quotes."
                  </p>
                </div>
                <div className="relative block p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Commercial Projects</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    "For commercial installations, the AI helps create detailed quotes considering electrical load requirements, compliance standards, and project scale."
                  </p>
                </div>
                <div className="relative block p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Emergency Services</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    "When urgent electrical issues arise, our software quickly evaluates the situation and provides immediate quotes with appropriate emergency rates."
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
              Ready to Transform Your Electrical Business?
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