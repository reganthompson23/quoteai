import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { Industries } from '../components/landing/Industries';
import { Blog } from '../components/landing/Blog';
import { Pricing } from '../components/landing/Pricing';
import { AboutMe } from '../components/landing/AboutMe';
// import { Testimonials } from '../components/landing/Testimonials'; // Keeping import commented for future use
import { useAuth } from '../contexts/AuthContext';

export function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // If user is logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="bg-white">
      <Hero />
      <Industries />
      <Features />
      <Blog />
      <Pricing />
      <AboutMe />
      {/* <Testimonials /> */}
    </div>
  );
}