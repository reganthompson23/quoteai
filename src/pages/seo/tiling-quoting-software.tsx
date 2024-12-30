import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '../../components/ui/Button';
import { Container } from '../../components/layout/Container';
import { MessageSquare, Clock, Calculator } from 'lucide-react';

const benefits = [
  {
    title: 'Accurate Tile Project Quotes',
    description: 'Let AI handle complex tile calculations while you focus on delivering beautiful tiling work to your clients',
    icon: Calculator,
  },
  {
    title: 'Capture More Tiling Projects',
    description: 'Your website works 24/7 to provide instant quotes for potential clients, never missing an opportunity',
    icon: MessageSquare,
  },
  {
    title: 'Smart Material Calculations',
    description: 'Factor in tile types, room layouts, wastage, and labor with customizable pricing rules for every tiling project',
    icon: Clock,
  },
];

const steps = [
  {
    title: 'Share Your Project Data',
    description: 'Upload your past tiling jobs and pricing information to personalize the AI to your business',
  },
  {
    title: 'Set Your Pricing Rules',
    description: 'Configure pricing for different tile types, layouts, and preparation requirements',
  },
  {
    title: 'Let AI Handle Inquiries',
    description: 'The AI chatbot collects project details and provides accurate quotes based on your criteria',
  },
];

export function TilingLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Tiling Quote Software | AI-Powered Tile Installation Estimates</title>
        <meta name="description" content="Streamline your tiling business with intelligent quoting software. Automate estimates for floor tiles, wall tiles, and custom tile installations. Start your free trial today!" />
        <meta name="keywords" content="tiling quote software, tile installation estimates, tile contractor software, tile project calculator" />
        <meta property="og:title" content="Tiling Quote Software | AI-Powered Tile Installation Estimates" />
        <meta property="og:description" content="Streamline your tiling business with intelligent quoting software. Automate estimates for floor tiles, wall tiles, and custom tile installations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/tiling-quoting-software" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Tiling Quote Software",
            "applicationCategory": "BusinessApplication",
            "description": "Automated quoting software designed specifically for tile contractors and installation businesses.",
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
          Simplify Your
          <span className="relative whitespace-nowrap text-blue-600">
            <span className="relative"> Tile Installation</span>
          </span>
          <br />
          Quotes Today
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Convert website visitors into qualified tiling leads with AI-powered quotes. From basic floor tiles to complex mosaic installations, automate your estimation process.
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
                Start Automating Your Tile Quotes
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
                Built for Professional Tile Contractors
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
                Common Questions About Our Tiling Software
              </h2>
            </div>
            <div className="mx-auto mt-16 max-w-2xl">
              <dl className="space-y-8">
                <div>
                  <dt className="text-lg font-semibold leading-8 text-gray-900">
                    How does the software handle different tile installation types?
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-gray-600">
                    You'll set up custom pricing rules for each type of installation - whether it's floor tiles, wall tiles, or decorative patterns. Upload your past projects and define your pricing structure, and the AI will follow your specific approach for each category.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-semibold leading-8 text-gray-900">
                    What project details does the AI collect from potential clients?
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-gray-600">
                    The chatbot gathers essential information like room dimensions, tile preferences, pattern complexity, and surface preparation needs. Based on your pricing rules, it generates an estimate and saves all project details in your dashboard.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg font-semibold leading-8 text-gray-900">
                    Can I review quotes before they're finalized?
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
                Real Tiling Project Scenarios
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                See how tile contractors use our software to streamline their quoting process:
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="relative block p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Bathroom Renovations</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    "The chatbot collects room measurements, tile selections, and waterproofing requirements. It factors in wall and floor preparation to generate comprehensive bathroom tiling quotes."
                  </p>
                </div>
                <div className="relative block p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Commercial Flooring</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    "For large commercial spaces, the AI handles complex floor plans and material calculations. It accounts for high-traffic tile specifications and installation timing."
                  </p>
                </div>
                <div className="relative block p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">Custom Mosaic Work</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    "When clients request decorative patterns, the software factors in design complexity, specialty tiles, and additional labor time for detailed installation work."
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
              Ready to Transform Your Tiling Business?
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