import React from 'react';

export function AboutMe() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            {/* Placeholder image with gray background */}
            <div className="aspect-w-3 aspect-h-4 rounded-lg bg-gray-200 overflow-hidden">
              <div className="h-full w-full flex items-center justify-center text-gray-400">
                {/* You can replace this div with an actual image */}
                <svg className="h-32 w-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              The Story Behind PricePilot
            </h2>
            <div className="mt-6 text-gray-500 space-y-6">
              <p className="text-lg">
                After spending over a decade in the painting and distribution industries, I witnessed firsthand the challenges businesses face when it comes to pricing and quoting. The traditional methods were time-consuming, prone to errors, and often resulted in lost opportunities.
              </p>
              <p className="text-lg">
                I realized there had to be a better way. That's when the idea for PricePilot was born – a solution that combines industry expertise with cutting-edge AI technology to revolutionize how businesses handle their pricing and quotations.
              </p>
              <p className="text-lg">
                Today, PricePilot helps businesses across various industries streamline their operations, increase accuracy, and win more business. Our mission is to empower every business owner with enterprise-level pricing intelligence, making sophisticated pricing strategies accessible to all.
              </p>
              <div className="mt-8">
                <p className="text-base font-semibold text-blue-600">
                  Regan Thompson
                </p>
                <p className="text-sm text-gray-500">
                  Founder & CEO, PricePilot
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 