import React from 'react';
import { Link } from 'react-router-dom';
import { Gauge, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Instant Estimates on Autopilot
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Transform your pricing docs into an intelligent estimate bot in minutes, ready to serve customers 24/7. Turn every website visit into a qualified lead with automated project scoping and instant estimates.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/signup"
                className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Start Free Trial
              </Link>
              <Link
                to="/demo/widget"
                className="group text-lg font-semibold leading-6 text-gray-900 hover:text-blue-600 flex items-center gap-2"
              >
                See it in action <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl">
              <img
                src="/images/heroimage.jpg"
                alt="Dashboard Preview"
                className="rounded-lg shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}