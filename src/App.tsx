import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/layout/Header';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { JobList } from './components/jobs/JobList';
import { JobForm } from './components/jobs/JobForm';
import { EditJob } from './components/jobs/EditJob';
import { PricingRules } from './components/pricing/PricingRules';
import { RuleForm } from './components/pricing/RuleForm';
import { EditRule } from './components/pricing/EditRule';
import { WidgetPreview } from './components/widget/WidgetPreview';
import { ChatList } from './components/chats/ChatList';
import { ChatDetail } from './components/chats/ChatDetail';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { DemoPage } from './pages/DemoPage';
import { BlogPost } from './components/blog/BlogPost';
import { useAuthStore } from './store/auth';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Details } from './components/dashboard/Details';
import { PaintersLanding } from './pages/seo/ai-quoting-software-for-painters';
import { LandscapingLanding } from './pages/seo/landscaping-quoting-software';

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
            <Route path="/ai-quoting-software-for-painters" element={<PaintersLanding />} />
            <Route path="/landscaping-quoting-software" element={<LandscapingLanding />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/demo/*" element={<DemoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route 
              path="/admin" 
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
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
              <Route path="jobs/:id/edit" element={<EditJob />} />
              <Route path="pricing" element={<PricingRules />} />
              <Route path="pricing/new" element={<RuleForm />} />
              <Route path="pricing/:id/edit" element={<EditRule />} />
              <Route path="widget" element={<WidgetPreview />} />
              <Route path="chats" element={<ChatList />} />
              <Route path="chats/:id" element={<ChatDetail />} />
              <Route path="details" element={<Details />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;