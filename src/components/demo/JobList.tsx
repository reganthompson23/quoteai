import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, Clock } from 'lucide-react';

const MOCK_JOBS = [
  {
    id: 'job-1',
    customerName: 'Sarah Johnson',
    description: 'Victorian Heritage Home - Interior & Exterior',
    status: 'completed',
    value: 14400,
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
    id: 'job-2',
    customerName: 'Mike Chen',
    description: 'Modern Apartment Building - Exterior',
    status: 'completed',
    value: 19500,
    completedDate: new Date(2024, 0, 18),
    details: [
      '3-story modern apartment complex',
      'Full exterior repaint',
      'Weather-resistant coating application',
      'Safety equipment for height work',
      'Modern gray and white color scheme'
    ]
  },
  {
    id: 'job-3',
    customerName: 'Emma Wilson',
    description: 'Queenslander Home Restoration',
    status: 'in_progress',
    value: 16800,
    startDate: new Date(2024, 0, 25),
    details: [
      'Heritage listed Queenslander',
      'Exterior restoration and repainting',
      'Veranda and trim detail work',
      'Weather damage repair included',
      'Traditional color palette'
    ]
  }
];

export function JobList() {
  const [expandedJob, setExpandedJob] = React.useState<string | null>(null);

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
                  <p className="text-xs text-gray-500">
                    {job.status === 'completed' 
                      ? format(job.completedDate, 'MMM d, yyyy')
                      : format(job.startDate!, 'MMM d, yyyy')}
                  </p>
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