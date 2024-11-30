import React from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutGrid, FileText, Settings, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutGrid },
  { name: 'Jobs', href: '/dashboard/jobs', icon: FileText },
  { name: 'Rules', href: '/dashboard/pricing', icon: Settings },
  { name: 'Widget Preview', href: '/dashboard/widget', icon: MessageSquare },
];

export function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside className="w-64 border-r bg-white">
        <nav className="flex flex-col p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <Outlet />
      </main>
    </div>
  );
}