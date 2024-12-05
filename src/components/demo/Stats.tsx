import React from 'react';
import { Users, MessageSquare, DollarSign, TrendingUp } from 'lucide-react';

const stats = [
  {
    name: 'Total Estimates',
    value: '24',
    change: '+8%',
    icon: MessageSquare,
  },
  {
    name: 'Conversion Rate',
    value: '68%',
    change: '+12%',
    icon: TrendingUp,
  },
  {
    name: 'Average Job Value',
    value: '$14,500',
    change: '+5%',
    icon: DollarSign,
  },
  {
    name: 'New Customers',
    value: '18',
    change: '+15%',
    icon: Users,
  },
];

export function Stats() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 border-b">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Monthly Stats</h3>
      </div>
      <div className="grid grid-cols-2 gap-px bg-gray-200">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white px-4 py-6 sm:px-6 flex flex-col items-center"
            >
              <Icon className="h-6 w-6 text-blue-500" />
              <p className="mt-2 text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-sm text-green-600">{stat.change}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
} 