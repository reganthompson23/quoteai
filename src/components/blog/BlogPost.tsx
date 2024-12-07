import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { posts, BlogPost as BlogPostType } from './posts';

export function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const Icon = post.icon;

  return (
    <div className="bg-white pt-16">
      {/* Mini Hero */}
      <div className="bg-white border-b shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-x-3">
              <img 
                src="/images/logo.png" 
                alt="PricePilot Logo" 
                className="h-8 w-auto"
              />
              <h2 className="text-xl font-semibold text-gray-900">
                Instant Estimates For Your Customers On Autopilot
              </h2>
            </div>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try It Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="rounded-lg bg-blue-600 p-2">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex items-center gap-x-4 text-sm">
            <time dateTime={post.date} className="text-gray-500">
              {post.date}
            </time>
            <span className="text-gray-500">{post.readTime}</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
          {post.title}
        </h1>

        <div className="prose prose-lg prose-blue max-w-none">
          {post.content}
        </div>
      </article>

      {/* Bottom CTA */}
      <div className="bg-gray-50 border-t">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Ready to automate your estimates?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Turn your pricing docs into an intelligent estimate bot in minutes, ready to serve customers 24/7.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:w-1/3">
              <Link
                to="/signup"
                className="rounded-md bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              >
                Start Free Trial
              </Link>
              <Link
                to="/demo/widget"
                className="rounded-md bg-white px-6 py-3 text-center text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                See it in action
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 