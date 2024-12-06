import React from 'react';
import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ChatList } from '../components/demo/ChatList';
import { PricingRules } from '../components/demo/PricingRules';
import { Stats } from '../components/demo/Stats';
import { JobList } from '../components/demo/JobList';
import WidgetDemo from '../components/demo/WidgetDemo';
import { 
  LayoutGrid, 
  MessageSquare, 
  Settings, 
  BarChart3,
  MessageCircle
} from 'lucide-react';

const navigation = [
  { name: 'Widget Preview', href: '/demo/widget', icon: MessageCircle },
  { name: 'Recent Jobs', href: '/demo/jobs', icon: LayoutGrid },
  { name: 'Recent Estimates', href: '/demo/chats', icon: MessageSquare },
  { name: 'Pricing Rules', href: '/demo/pricing', icon: Settings },
  { name: 'Monthly Stats', href: '/demo/stats', icon: BarChart3 },
];

export function DemoPage() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="hidden sm:fixed sm:inset-y-0 sm:flex sm:w-64 sm:flex-col" style={{ top: '64px' }}>
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md
                      ${location.pathname === item.href
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                  >
                    <Icon
                      className={`
                        mr-3 h-6 w-6 flex-shrink-0
                        ${location.pathname === item.href
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500'}
                      `}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      <div className="sm:pl-64">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route index element={<Navigate to="/demo/widget" replace />} />
            <Route path="widget" element={<WidgetDemo />} />
            <Route path="jobs" element={<JobList />} />
            <Route path="chats" element={<ChatList />} />
            <Route path="pricing" element={<PricingRules />} />
            <Route path="stats" element={<Stats />} />
          </Routes>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex flex-col items-center px-2 py-2 text-xs font-medium
                  ${location.pathname === item.href
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'}
                `}
              >
                <Icon className="h-6 w-6" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
} 