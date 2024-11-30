import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Clock, PieChart, MessageSquare } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              AI-Powered Quotes for Your Business
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Transform your business with instant, accurate quotes powered by AI. Learn from your past jobs and provide 24/7 pricing to your customers.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/signup"
                className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get Started
              </Link>
              <Link
                to="/demo"
                className="text-lg font-semibold leading-6 text-gray-900 hover:text-gray-700"
              >
                Live Demo <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
                alt="Dashboard preview"
                className="rounded-lg shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}