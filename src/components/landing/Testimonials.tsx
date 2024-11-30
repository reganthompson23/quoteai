import React from 'react';

const testimonials = [
  {
    content: "QuoteAI has transformed how we handle customer inquiries. We're now able to provide instant quotes 24/7.",
    author: "Sarah Johnson",
    role: "Owner, Johnson's Painting",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  },
  {
    content: "The accuracy of the AI quotes is impressive. It learns from our past jobs and gets better over time.",
    author: "Michael Chen",
    role: "CEO, GreenScape Landscaping",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
  },
];

export function Testimonials() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by businesses everywhere
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="flex flex-col gap-6 rounded-2xl bg-white p-8 ring-1 ring-gray-900/10"
              >
                <div className="flex items-center gap-x-4">
                  <img
                    className="h-12 w-12 rounded-full bg-gray-50"
                    src={testimonial.image}
                    alt={testimonial.author}
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {testimonial.author}
                    </h3>
                    <p className="text-sm leading-6 text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-lg leading-7 text-gray-600">
                  {testimonial.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}