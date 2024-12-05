import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { ChatList } from '../components/demo/ChatList';
import { PricingRules } from '../components/demo/PricingRules';
import { Stats } from '../components/demo/Stats';
import { JobList } from '../components/demo/JobList';
import WidgetDemo from '../components/demo/WidgetDemo';
import { 
  LayoutGrid, 
  MessageSquare, 
  ClipboardList, 
  Settings,
  MonitorSmartphone
} from 'lucide-react';

const DEMO_BUSINESS = {
  name: "Pete's Painting",
  description: "Professional Painting Services - Interior & Exterior",
  rules: [
    {
      id: 1,
      name: "Heritage Listed Building",
      description: "Additional care and specialized materials required",
      adjustment: "20% increase",
      type: "percentage",
      value: 20
    },
    {
      id: 2,
      name: "Multi-Story External",
      description: "Per story surcharge for external painting",
      adjustment: "10% per story",
      type: "percentage_per_unit",
      value: 10
    }
  ]
};

const navigation = [
  { name: 'Dashboard', href: '', icon: LayoutGrid, end: true },
  { name: 'Estimates', href: 'estimates', icon: MessageSquare },
  { name: 'Jobs', href: 'jobs', icon: ClipboardList },
  { name: 'Widget', href: 'widget', icon: MonitorSmartphone },
  { name: 'Settings', href: 'settings', icon: Settings },
];

function DemoLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              {DEMO_BUSINESS.name}
            </h1>
            <p className="text-sm text-gray-500">{DEMO_BUSINESS.description}</p>
          </div>
          <div className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
            Demo Account
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:gap-8">
          {/* Desktop Sidebar Navigation */}
          <div className="hidden sm:block w-64 flex-shrink-0">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const fullPath = `/demo/${item.href}`;
                const isActive = item.end 
                  ? location.pathname === '/demo'
                  : location.pathname === fullPath;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center px-4 py-2 text-sm font-medium rounded-md
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 pb-16 sm:pb-0">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around">
          {navigation.map((item) => {
            const fullPath = `/demo/${item.href}`;
            const isActive = item.end 
              ? location.pathname === '/demo'
              : location.pathname === fullPath;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex flex-col items-center px-2 py-3 text-xs font-medium
                  ${isActive 
                    ? 'text-blue-700' 
                    : 'text-gray-600'}
                `}
              >
                <item.icon className="h-6 w-6 mb-1" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function DemoDashboard() {
  return (
    <div className="max-w-3xl mx-auto">
      <Stats />
    </div>
  );
}

function DemoEstimates() {
  return <ChatList fullWidth />;
}

function DemoJobs() {
  return <JobList />;
}

function DemoSettings() {
  return (
    <div className="space-y-4 sm:space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Pricing Rules</h2>
        <PricingRules rules={DEMO_BUSINESS.rules} />
      </div>
    </div>
  );
}

export function DemoPage() {
  return (
    <DemoLayout>
      <Routes>
        <Route index element={<DemoDashboard />} />
        <Route path="estimates" element={<DemoEstimates />} />
        <Route path="jobs" element={<DemoJobs />} />
        <Route path="widget" element={<WidgetDemo />} />
        <Route path="settings" element={<DemoSettings />} />
      </Routes>
    </DemoLayout>
  );
} 