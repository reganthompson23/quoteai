import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { api } from '../../lib/api';

interface User {
  id: string;
  email: string;
  businessName: string;
  industry: string;
  createdAt: string;
  needsPasswordChange: boolean;
}

export function AdminDashboard() {
  const { user } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [tempPassword, setTempPassword] = useState('');

  // Check if current user is admin
  if (!user || user.email !== 'regan@syndicatestore.com.au') {
    return <Navigate to="/dashboard" />;
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await api.getUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch users');
      }
    }

    fetchUsers();
  }, []);

  const handleResetPassword = async (userId: string) => {
    setSelectedUserId(userId);
    setIsResetting(true);
    setTempPassword('Welcome' + Math.floor(Math.random() * 10000));
  };

  const confirmResetPassword = async () => {
    if (!selectedUserId || !tempPassword) return;

    try {
      await api.resetUserPassword(selectedUserId, tempPassword);
      setResetSuccess(`Password reset successful. Temporary password: ${tempPassword}`);
      
      // Update local state to show password change required
      setUsers(users.map(u => 
        u.id === selectedUserId 
          ? { ...u, needsPasswordChange: true }
          : u
      ));
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setIsResetting(false);
      setSelectedUserId(null);
      // Clear the temporary password after 30 seconds
      setTimeout(() => {
        setResetSuccess(null);
        setTempPassword('');
      }, 30000);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {resetSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {resetSuccess}
        </div>
      )}

      {isResetting && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-medium mb-4">Reset Password</h3>
            <p className="mb-4">Temporary password: {tempPassword}</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsResetting(false);
                  setSelectedUserId(null);
                  setTempPassword('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmResetPassword}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Industry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.businessName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.industry}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => handleResetPassword(user.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Reset Password
                  </button>
                  {user.needsPasswordChange && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Password change required
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 