import React from 'react';
import { useAuthStore } from '../../store/auth';
import { api } from '../../lib/api';

export function Details() {
  const { user, profile, refreshProfile } = useAuthStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: profile?.name || '',
    businessName: profile?.businessName || '',
    businessAddress: profile?.businessAddress || '',
    phone: profile?.phone || '',
    contactEmail: profile?.contact_email || '',
    industry: profile?.industry || '',
    about: profile?.about || '',
    services: (profile?.services || []).join('\n'),
  });

  // Update form data when profile data changes
  React.useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        businessName: profile.businessName || '',
        businessAddress: profile.businessAddress || '',
        phone: profile.phone || '',
        contactEmail: profile.contact_email || '',
        industry: profile.industry || '',
        about: profile.about || '',
        services: (profile.services || []).join('\n'),
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);

      await api.updateUserDetails({
        ...formData,
        services: formData.services.split('\n').filter(service => service.trim()),
      });
      
      // Refresh the profile data after update
      await refreshProfile();
      
      setSuccess('Details updated successfully');
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update details:', err);
      setError(err instanceof Error ? err.message : 'Failed to update details');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="px-6 pr-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Business Details</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your business information and contact details
          </p>
          <p className="text-sm text-blue-600 mt-2">
            Note: This information will be used to train your chatbot to provide accurate quotes and information to your customers.
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Edit Details
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
          {success}
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing || isSubmitting}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="account-email" className="block text-sm font-medium text-gray-700">
                Account Email
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Used for account login and system notifications. Contact support to change this.
              </p>
              <input
                type="email"
                id="account-email"
                value={user.email}
                disabled={true}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                Business Contact Email (Optional)
              </label>
              <p className="text-xs text-gray-500 mt-1">
                This email will be shown to customers who request contact information.
              </p>
              <input
                type="email"
                id="contactEmail"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                disabled={!isEditing || isSubmitting}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing || isSubmitting}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                disabled={!isEditing || isSubmitting}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Industry
              </label>
              <input
                type="text"
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                disabled={!isEditing || isSubmitting}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700">
                Business Address (Optional)
              </label>
              <input
                type="text"
                id="businessAddress"
                value={formData.businessAddress}
                onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                disabled={!isEditing || isSubmitting}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
              About Your Business (Optional)
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Write a brief description of your business, experience, and what makes you unique.
            </p>
            <textarea
              id="about"
              rows={4}
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              disabled={!isEditing || isSubmitting}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="services" className="block text-sm font-medium text-gray-700">
              Services Offered (Optional)
            </label>
            <p className="text-sm text-gray-500 mt-1">
              List your services, one per line. These will help the chatbot understand what services you offer.
            </p>
            <textarea
              id="services"
              rows={4}
              value={formData.services}
              onChange={(e) => setFormData({ ...formData, services: e.target.value })}
              disabled={!isEditing || isSubmitting}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Interior Painting&#10;Exterior Painting&#10;Commercial Painting&#10;etc..."
            />
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: profile.name || '',
                    businessName: profile.businessName || '',
                    businessAddress: profile.businessAddress || '',
                    phone: profile.phone || '',
                    contactEmail: profile.contact_email || '',
                    industry: profile.industry || '',
                    about: profile.about || '',
                    services: (profile.services || []).join('\n'),
                  });
                }}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 