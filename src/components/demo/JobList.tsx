import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, Clock } from 'lucide-react';

interface Job {
  id: string;
  customerName: string;
  description: string;
  status: 'completed' | 'in_progress';
  value: number;
  completedDate?: Date;
  startDate?: Date;
  details: string[];
}

const MOCK_JOBS: Job[] = [
  {
    id: 'job-1',
    customerName: 'David Thompson',
    description: '2-Bedroom Unit - Full Interior',
    status: 'completed',
    value: 4800,
    completedDate: new Date(2024, 0, 12),
    details: [
      'Complete interior painting',
      '2 bedrooms, 1 bathroom, kitchen, living room',
      'Wall crack repairs in living room',
      'Premium washable white paint throughout',
      'Empty unit - no furniture moving required'
    ]
  },
  {
    id: 'job-2',
    customerName: 'Lisa Martinez',
    description: 'Two-Story House - Exterior Only',
    status: 'completed',
    value: 12500,
    completedDate: new Date(2024, 0, 8),
    details: [
      'Weatherboard house exterior',
      'Approximately 200 square meters',
      'Walls, trims, and window frames',
      'Surface preparation and spot sanding',
      'White walls with dark grey trim'
    ]
  },
  {
    id: 'job-3',
    customerName: 'James Anderson',
    description: 'Single-Story House - Interior & Exterior Trim',
    status: 'in_progress',
    value: 15800,
    startDate: new Date(2024, 0, 22),
    details: [
      '4 bedrooms, 2 bathrooms, living areas',
      'Complete interior walls and ceilings',
      'Exterior trim and fascia boards only',
      'Minor plaster repairs included',
      'Neutral color scheme throughout'
    ]
  },
  {
    id: 'job-4',
    customerName: 'Emma Wilson',
    description: 'Queenslander Home Restoration',
    status: 'in_progress',
    value: 24500,
    startDate: new Date(2024, 0, 25),
    details: [
      'Heritage listed Queenslander',
      'Exterior restoration and repainting',
      'Veranda and trim detail work',
      'Weather damage repair included',
      'Traditional color palette'
    ]
  },
  {
    id: 'job-5',
    customerName: 'Sarah Johnson',
    description: 'Victorian Heritage Home - Interior & Exterior',
    status: 'completed',
    value: 28500,
    completedDate: new Date(2024, 0, 20),
    details: [
      'Heritage listed 2-story Victorian home',
      'Full interior and exterior painting',
      'Period-appropriate color scheme',
      'Special heritage-approved materials used',
      '4 bedrooms, 2 bathrooms, living areas'
    ]
  },
  {
    id: 'job-6',
    customerName: 'Mike Chen',
    description: 'Modern Apartment Building - Exterior',
    status: 'completed',
    value: 32000,
    completedDate: new Date(2024, 0, 18),
    details: [
      '3-story modern apartment complex',
      'Full exterior repaint',
      'Weather-resistant coating application',
      'Safety equipment for height work',
      'Modern gray and white color scheme'
    ]
  }
];

export function JobList() {
  const [expandedJob, setExpandedJob] = React.useState<string | null>(null);

  const formatDate = (job: Job) => {
    if (job.status === 'completed' && job.completedDate) {
      return format(job.completedDate, 'MMM d, yyyy');
    }
    if (job.status === 'in_progress' && job.startDate) {
      return format(job.startDate, 'MMM d, yyyy');
    }
    return '';
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Jobs</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {MOCK_JOBS.map((job) => (
          <li key={job.id}>
            <button
              onClick={() => setExpandedJob(job.id === expandedJob ? null : job.id)}
              className="w-full px-4 py-4 sm:px-6 hover:bg-gray-50 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {job.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <Clock className="h-5 w-5 text-blue-500 mr-2" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{job.customerName}</p>
                    <p className="text-sm text-gray-500">{job.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ${job.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">{formatDate(job)}</p>
                </div>
              </div>
              
              {expandedJob === job.id && (
                <div className="mt-4 bg-gray-50 rounded-md p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Job Details</h4>
                  <ul className="space-y-1">
                    {job.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-gray-600">
                        • {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 