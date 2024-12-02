import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "PricePilot has revolutionized our pricing strategy. The AI learns from our expertise and delivers spot-on estimates that have increased our close rate by 40%.",
    author: "Sarah Johnson",
    role: "Operations Director, BuildRight Construction",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  },
  {
    content: "The automation is incredible. We've reduced our response time from hours to seconds, and our customers love the instant, accurate pricing.",
    author: "Michael Chen",
    role: "CEO, TechServe Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
  },
];

export function Testimonials() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600">
            Success Stories
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Growing Businesses
          </p>
          <div className="flex justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5 transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-x-4">
                  <img
                    className="h-14 w-14 rounded-full border-2 border-blue-100"
                    src={testimonial.image}
                    alt={testimonial.author}
                  />
                  <div>
                    <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900">
                      {testimonial.author}
                    </h3>
                    <p className="text-sm leading-6 text-blue-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-lg leading-7 text-gray-600">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}