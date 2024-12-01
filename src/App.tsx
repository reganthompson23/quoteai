import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/layout/Header';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { JobList } from './components/jobs/JobList';
import { JobForm } from './components/jobs/JobForm';
import { PricingRules } from './components/pricing/PricingRules';
import { RuleForm } from './components/pricing/RuleForm';
import { WidgetPreview } from './components/widget/WidgetPreview';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { useAuthStore } from './store/auth';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard/jobs" replace />} />
              <Route path="jobs" element={<JobList />} />
              <Route path="jobs/new" element={<JobForm />} />
              <Route path="pricing" element={<PricingRules />} />
              <Route path="pricing/new" element={<RuleForm />} />
              <Route path="widget" element={<WidgetPreview />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;