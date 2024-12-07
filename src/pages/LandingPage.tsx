import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { Industries } from '../components/landing/Industries';
import { Blog } from '../components/landing/Blog';
import { Pricing } from '../components/landing/Pricing';
// import { Testimonials } from '../components/landing/Testimonials'; // Keeping import commented for future use
import { useAuthStore } from '../store/auth';

export function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-white">
      <Hero />
      <Industries />
      <Features />
      <Blog />
      <Pricing />
      {/* <Testimonials /> */}
    </div>
  );
}