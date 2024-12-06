import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { api } from '../../lib/api';

interface ChangePasswordProps {
  onClose?: () => void;
  isModal?: boolean;
}

export function ChangePassword({ onClose, isModal = false }: ChangePasswordProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    // Validate password length
    if (formData.newPassword.length < 8) {
      setError('New password must be at least 8 characters');
      return;
    }

    try {
      await api.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      setSuccess(true);

      // After successful password change, log out and redirect to login page after a delay
      setTimeout(() => {
        logout();
        navigate('/login');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    }
  };

  return (
    <div className={`${isModal ? 'p-6' : 'max-w-md mx-auto mt-8 p-6'} bg-white rounded-lg shadow`}>
      <h2 className="text-2xl font-bold mb-6">
        {user?.needsPasswordChange ? 'Change Your Password' : 'Update Password'}
      </h2>

      {user?.needsPasswordChange && (
        <p className="mb-4 text-sm text-gray-600">
          Your password has been reset. Please choose a new password to continue.
        </p>
      )}

      {error && (
        <div className="mb-4 p-2 text-sm text-red-700 bg-red-100 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-2 text-sm text-green-700 bg-green-100 rounded">
          Password changed successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!user?.needsPasswordChange && (
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required={!user?.needsPasswordChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-3">
          {!user?.needsPasswordChange && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
} 