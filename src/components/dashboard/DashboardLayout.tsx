import React from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { ChangePassword } from '../auth/ChangePassword';
import { 
  LayoutGrid, 
  MessageSquare, 
  Settings, 
  MessageCircle,
  PlusCircle,
  BarChart3,
  UserCircle
} from 'lucide-react';

const navigation = [
  { name: 'Jobs', href: '/dashboard/jobs', icon: LayoutGrid },
  { name: 'Chats', href: '/dashboard/chats', icon: MessageSquare },
  { name: 'Pricing Rules', href: '/dashboard/pricing', icon: Settings },
  { name: 'Widget', href: '/dashboard/widget', icon: BarChart3 },
  { name: 'Details', href: '/dashboard/details', icon: UserCircle },
];

const actions = [
  { name: 'Add Job', href: '/dashboard/jobs/new', icon: PlusCircle },
  { name: 'Add Rule', href: '/dashboard/pricing/new', icon: PlusCircle },
];

export function DashboardLayout() {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Show forced password change screen if needed
  if (user?.needsPasswordChange) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full">
          <ChangePassword />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop sidebar - adjusted to start below header */}
      <div className="hidden sm:fixed sm:inset-y-0 sm:flex sm:w-64 sm:flex-col" style={{ top: '64px' }}>
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md
                      ${isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                  >
                    <Icon
                      className={`
                        mr-3 h-6 w-6 flex-shrink-0
                        ${isActive
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500'}
                      `}
                    />
                    {item.name}
                  </Link>
                );
              })}

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-sm text-gray-500">Actions</span>
                </div>
              </div>

              {actions.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                  >
                    <Icon className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex flex-col items-center px-2 py-2 text-xs font-medium
                  ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}
                `}
              >
                <Icon className="h-6 w-6" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content - adjusted to start below header */}
      <div className="sm:pl-64 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}