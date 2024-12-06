import React from 'react';

const industries = [
  'Painters',
  'Plumbers',
  'Electricians',
  'Carpenters',
  'Landscapers',
  'Cleaners',
  'HVAC Services',
  'Roofers',
  'Builders',
  'Tilers',
  'Plasterers',
  'Handymen',
];

// Duplicate the array to create a seamless loop
const duplicatedIndustries = [...industries, ...industries];

export function Industries() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Perfect For Trade and Service Businesses
        </h2>
        
        <div className="mt-10 relative overflow-hidden">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* Scrolling container */}
          <div className="flex animate-scroll-fast">
            {duplicatedIndustries.map((industry, index) => (
              <div
                key={`${industry}-${index}`}
                className="flex-none mx-3 px-4 py-2 bg-gray-50 rounded-lg min-w-[140px] flex items-center justify-center"
              >
                <span className="text-sm font-medium text-gray-900">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 