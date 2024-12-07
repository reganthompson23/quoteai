import React from 'react';
import { TrendingUp, Clock, Zap, LucideIcon } from 'lucide-react';

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  readTime: string;
  date: string;
  content: React.ReactNode;
}

export const posts: BlogPost[] = [
  {
    id: 1,
    title: 'How to Convert More Website Visitors into Booked Jobs: A Guide for Trade Businesses',
    description: 'Learn how leading trade businesses are converting up to 3x more website visitors into actual bookings with automated instant estimates.',
    icon: TrendingUp,
    readTime: '1 min read',
    date: 'Dec 6, 2024',
    content: (
      <div className="space-y-6">
        <p>
          For trade businesses, your website is often the first point of contact with potential customers. But here's the harsh truth: if you can't provide an instant estimate, you're likely losing jobs to competitors who can.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">The Numbers Don't Lie</h2>
        <p>
          Recent studies show that 72% of customers expect an immediate response when requesting a quote. More importantly, 78% will go with the first business that provides a clear estimate. That means if you're waiting until morning to respond to evening quote requests, you're already too late.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">What Customers Really Want</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Instant pricing information (even if it's just a ballpark)</li>
          <li>24/7 availability to submit job details</li>
          <li>Clear communication about what affects the price</li>
          <li>Professional presentation of estimates</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">The Solution: Automated Estimates</h2>
        <p>
          Leading trade businesses are now using automated estimate systems that instantly convert website visitors into qualified leads. These systems collect job details, provide accurate estimates based on your pricing rules, and capture contact information - all while you're busy on the tools.
        </p>

        <p>
          The result? Our clients report an average 3x increase in website conversion rates and a 65% reduction in time spent on quotes that don't convert.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    title: 'The True Cost of Delayed Estimates: Why 24/7 Response Time Matters in Trade Services',
    description: 'Research shows that 78% of customers choose the first business that provides a clear estimate.',
    icon: Clock,
    readTime: '1 min read',
    date: 'Dec 4, 2024',
    content: (
      <div className="space-y-6">
        <p>
          In today's fast-paced world, customers expect instant responses. When they're looking for trade services, they're often comparing multiple providers simultaneously. The business that responds first with a clear estimate has a significant advantage.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">The Hidden Costs of Delayed Responses</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Lost opportunities to competitors who respond faster</li>
          <li>Wasted time on quotes for customers who've already chosen another provider</li>
          <li>Reduced customer satisfaction due to waiting times</li>
          <li>Lower website conversion rates</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">The 24/7 Advantage</h2>
        <p>
          Modern estimate automation tools allow you to provide instant quotes any time of day or night. This means you never miss an opportunity, even when you're busy with existing jobs or it's outside business hours.
        </p>

        <p>
          By implementing automated estimating, businesses typically see:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>30-40% increase in lead capture</li>
          <li>50% reduction in quote preparation time</li>
          <li>Higher customer satisfaction scores</li>
          <li>More efficient use of business hours</li>
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Automating Estimates: How Trade Businesses Are Saving 10+ Hours Per Week',
    description: 'Discover how modern trade businesses are automating their estimate process to save time.',
    icon: Zap,
    readTime: '1 min read',
    date: 'Dec 2, 2024',
    content: (
      <div className="space-y-6">
        <p>
          Time is money in the trades. Every hour spent preparing quotes is an hour you could be earning on the tools or growing your business. Here's how leading trade businesses are using automation to reclaim their time while growing their customer base.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">The Traditional Quoting Process</h2>
        <p>
          Most trade businesses follow a time-consuming process for every quote:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Phone calls or emails back and forth with potential customers</li>
          <li>Site visits for jobs that may not convert</li>
          <li>Manual calculations and quote preparation</li>
          <li>Follow-up communications</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">The Automated Alternative</h2>
        <p>
          Modern estimate automation tools can:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Collect detailed job requirements 24/7</li>
          <li>Apply your pricing rules automatically</li>
          <li>Generate professional quotes instantly</li>
          <li>Capture customer contact information</li>
          <li>Follow up automatically</li>
        </ul>

        <p>
          The result? Businesses using automated estimating report saving an average of 10-15 hours per week while increasing their conversion rates.
        </p>
      </div>
    ),
  },
]; 