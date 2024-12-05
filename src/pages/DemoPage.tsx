import React from 'react';
import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ChatList } from '../components/demo/ChatList';
import { PricingRules } from '../components/demo/PricingRules';
import { Stats } from '../components/demo/Stats';
import { JobList } from '../components/demo/JobList';
import { WidgetPreview } from '../components/demo/WidgetPreview';
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
  { name: 'Dashboard', href: '/demo', icon: LayoutGrid },
  { name: 'Estimates', href: '/demo/estimates', icon: MessageSquare },
  { name: 'Jobs', href: '/demo/jobs', icon: ClipboardList },
  { name: 'Widget', href: '/demo/widget', icon: MonitorSmartphone },
  { name: 'Settings', href: '/demo/settings', icon: Settings },
];

function DemoLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {DEMO_BUSINESS.name}
            </h1>
            <p className="text-sm text-gray-500">{DEMO_BUSINESS.description}</p>
          </div>
          <div className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
            Demo Account
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
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
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <ChatList />
      </div>
      <div className="space-y-8">
        <Stats />
        <PricingRules rules={DEMO_BUSINESS.rules} />
      </div>
    </div>
  );
}

export function DemoPage() {
  return (
    <DemoLayout>
      <Routes>
        <Route path="/" element={<DemoDashboard />} />
        <Route path="/estimates" element={<ChatList fullWidth />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/widget" element={<WidgetPreview businessId="demo" />} />
        <Route path="/settings" element={
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Pricing Rules</h2>
            <PricingRules rules={DEMO_BUSINESS.rules} />
          </div>
        } />
      </Routes>
    </DemoLayout>
  );
} 