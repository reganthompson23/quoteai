import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function PetesWebsite() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative bg-blue-600 text-white">
        <div className="absolute inset-0">
          <img
            src="/images/painting-hero.jpg"
            alt="Professional painter at work"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Pete's Painting</h1>
          <p className="text-xl opacity-90">Professional Painting Services - Interior & Exterior</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>(02) 9876 5432</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span>info@petespainting.com.au</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>Sydney, Australia</span>
            </div>
          </div>
        </div>
      </header>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Interior Painting</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Residential homes</li>
                <li>• Heritage listed properties</li>
                <li>• Period home specialists</li>
                <li>• Color consultation</li>
                <li>• Premium finishes</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Exterior Painting</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• House exteriors</li>
                <li>• Multi-story buildings</li>
                <li>• Weather protection</li>
                <li>• Heritage restoration</li>
                <li>• Full preparation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Recent Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <img
                  src="/images/victorian-home.jpg"
                  alt="Victorian Heritage Home"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold">Victorian Heritage Home</h3>
              <p className="text-gray-600">Full interior and exterior restoration</p>
            </div>
            <div>
              <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <img
                  src="/images/apartment-complex.jpg"
                  alt="Modern Apartment Complex"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold">Modern Apartment Complex</h3>
              <p className="text-gray-600">External repaint with weather protection</p>
            </div>
            <div>
              <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <img
                  src="/images/queenslander.jpg"
                  alt="Queenslander Restoration"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold">Queenslander Restoration</h3>
              <p className="text-gray-600">Period-accurate restoration work</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Heritage Specialists</h3>
              <p className="text-gray-600">
                Experienced in working with heritage-listed properties, ensuring proper techniques and materials.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Quality Materials</h3>
              <p className="text-gray-600">
                We use premium paints and materials to ensure a lasting finish that stands the test of time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Professional Team</h3>
              <p className="text-gray-600">
                Our skilled painters have years of experience and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Pete's Painting</h3>
              <p className="text-gray-400">
                Professional painting services in Sydney.<br />
                Specializing in heritage properties and modern homes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2 text-gray-400">
                <p>Phone: (02) 9876 5432</p>
                <p>Email: info@petespainting.com.au</p>
                <p>Address: Sydney, Australia</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Note: The widget script will be loaded by the parent component */}
    </div>
  );
} 