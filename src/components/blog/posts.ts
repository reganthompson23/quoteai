import { ReactNode } from 'react';
import { Clock, TrendingUp, Zap } from 'lucide-react';

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  icon: any; // Lucide icon component type
  readTime: string;
  date: string;
  content: ReactNode;
}

export const posts: BlogPost[] = [
  {
    id: 1,
    title: 'How to Convert More Website Visitors into Booked Jobs: A Guide for Trade Businesses',
    description: 'Learn how leading trade businesses are converting up to 3x more website visitors into actual bookings with automated instant estimates. Discover the key factors that make customers choose one service provider over another.',
    icon: TrendingUp,
    readTime: '2 min read',
    date: 'Mar 15, 2024',
    content: (
      <>
        <p>
          For trade businesses, your website is often the first point of contact with potential customers. But here's the harsh truth: if you can't provide an instant estimate, you're likely losing jobs to competitors who can.
        </p>

        <h2>The Numbers Don't Lie</h2>
        <p>
          Recent studies show that 72% of customers expect an immediate response when requesting a quote. More importantly, 78% will go with the first business that provides a clear estimate. That means if you're waiting until morning to respond to evening quote requests, you're already too late.
        </p>

        <h2>What Customers Really Want</h2>
        <ul>
          <li>Instant pricing information (even if it's just a ballpark)</li>
          <li>24/7 availability to submit job details</li>
          <li>Clear communication about what affects the price</li>
          <li>Professional presentation of estimates</li>
        </ul>

        <h2>The Solution: Automated Estimates</h2>
        <p>
          Leading trade businesses are now using automated estimate systems that instantly convert website visitors into qualified leads. These systems collect job details, provide accurate estimates based on your pricing rules, and capture contact information - all while you're busy on the tools.
        </p>

        <p>
          The result? Our clients report an average 3x increase in website conversion rates and a 65% reduction in time spent on quotes that don't convert.
        </p>
      </>
    ),
  },
  {
    id: 2,
    title: 'The True Cost of Delayed Estimates: Why 24/7 Response Time Matters in Trade Services',
    description: 'Research shows that 78% of customers choose the first business that provides a clear estimate. Find out how much delayed responses are really costing your business and how to fix it.',
    icon: Clock,
    readTime: '2 min read',
    date: 'Mar 12, 2024',
    content: (
      <>
        <p>
          Every hour you delay providing an estimate costs you money. But exactly how much? Let's break down the real cost of delayed responses in the trade service industry.
        </p>

        <h2>The Hidden Costs</h2>
        <ul>
          <li><strong>Lost Jobs:</strong> 65% of customers will move on to another provider if they don't get a response within 2 hours</li>
          <li><strong>Wasted Admin Time:</strong> Average of 5 hours per week spent on quotes that never convert</li>
          <li><strong>Lower Project Values:</strong> Rush quotes often undervalue jobs by 15-20%</li>
          <li><strong>Missed After-Hours Opportunities:</strong> 40% of quote requests come outside business hours</li>
        </ul>

        <h2>Real Numbers from Real Businesses</h2>
        <p>
          A typical trade business receiving 20 quote requests per week, with a 30% conversion rate and average job value of $3,000, loses approximately $156,000 annually due to delayed responses alone.
        </p>

        <h2>The Solution</h2>
        <p>
          Modern trade businesses are implementing 24/7 automated estimate systems that instantly respond to customer inquiries. These systems maintain your pricing strategy while ensuring no opportunity slips through the cracks, whether it's 3 PM or 3 AM.
        </p>

        <p>
          The best part? These systems can be set up in minutes, not days, and start delivering ROI from day one.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: 'Automating Estimates: How Trade Businesses Are Saving 10+ Hours Per Week',
    description: 'Discover how modern trade businesses are automating their estimate process to save time, reduce errors, and grow their customer base - all while maintaining their pricing strategy.',
    icon: Zap,
    readTime: '2 min read',
    date: 'Mar 8, 2024',
    content: (
      <>
        <p>
          Time is money in the trades. Every minute spent writing up estimates is time you could be on the tools or growing your business. Here's how successful trade businesses are automating their estimate process without compromising on accuracy.
        </p>

        <h2>The Old Way vs. The Smart Way</h2>
        <table className="w-full mb-6">
          <thead>
            <tr>
              <th className="text-left">Manual Process</th>
              <th className="text-left">Automated Process</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>30-60 mins per quote</td>
              <td>Instant</td>
            </tr>
            <tr>
              <td>Business hours only</td>
              <td>24/7 availability</td>
            </tr>
            <tr>
              <td>Inconsistent pricing</td>
              <td>Standardized rules</td>
            </tr>
          </tbody>
        </table>

        <h2>Real Results</h2>
        <ul>
          <li>Average 10 hours saved per week on quote preparation</li>
          <li>45% increase in quote-to-job conversion rate</li>
          <li>100% consistency in pricing across all quotes</li>
          <li>Zero missed after-hours opportunities</li>
        </ul>

        <p>
          The key? A smart estimate system that learns your pricing rules and handles the entire process automatically. You set the rules once, and the system handles the rest - whether you're on a job, in a meeting, or enjoying your weekend.
        </p>
      </>
    ),
  },
]; 