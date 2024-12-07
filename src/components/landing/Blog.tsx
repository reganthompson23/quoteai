import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, TrendingUp, Zap } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'How to Convert More Website Visitors into Booked Jobs: A Guide for Trade Businesses',
    description: 'Learn how leading trade businesses are converting up to 3x more website visitors into actual bookings with automated instant estimates. Discover the key factors that make customers choose one service provider over another.',
    icon: TrendingUp,
    readTime: '5 min read',
    date: 'Mar 15, 2024',
  },
  {
    id: 2,
    title: 'The True Cost of Delayed Estimates: Why 24/7 Response Time Matters in Trade Services',
    description: 'Research shows that 78% of customers choose the first business that provides a clear estimate. Find out how much delayed responses are really costing your business and how to fix it.',
    icon: Clock,
    readTime: '4 min read',
    date: 'Mar 12, 2024',
  },
  {
    id: 3,
    title: 'Automating Estimates: How Trade Businesses Are Saving 10+ Hours Per Week',
    description: 'Discover how modern trade businesses are automating their estimate process to save time, reduce errors, and grow their customer base - all while maintaining their pricing strategy.',
    icon: Zap,
    readTime: '6 min read',
    date: 'Mar 8, 2024',
  },
];

export function Blog() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest Insights for Trade & Service Businesses
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Expert advice on growing your service business through modern estimation techniques.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => {
            const Icon = post.icon;
            return (
              <article key={post.id} className="flex flex-col items-start">
                <div className="rounded-lg bg-blue-600 p-2 mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.date} className="text-gray-500">
                    {post.date}
                  </time>
                  <span className="text-gray-500">{post.readTime}</span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link to={`/blog/${post.id}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Read article →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
} 