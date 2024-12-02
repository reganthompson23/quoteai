import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Mail, Phone, User, ArrowRight } from 'lucide-react';
import { api } from '../../lib/api';
import { Chat } from '../../types';

export function ChatList() {
  const { data: chats, isLoading, error } = useQuery<Chat[]>({
    queryKey: ['chats'],
    queryFn: api.getChats,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Failed to load chats. Please try again.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customer Chats</h1>
        <p className="text-sm text-gray-600 mt-1">
          Review and manage your customer conversations
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chat ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Summary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chats?.map((chat) => (
              <tr key={chat.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Chat #{chat.chatNumber.toString().padStart(5, '0')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">
                  {chat.summary}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    {chat.contactName && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        {chat.contactName}
                      </div>
                    )}
                    {chat.contactEmail && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        {chat.contactEmail}
                      </div>
                    )}
                    {chat.contactPhone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        {chat.contactPhone}
                      </div>
                    )}
                    {!chat.contactName && !chat.contactEmail && !chat.contactPhone && (
                      <span className="text-sm text-gray-400">No contact info provided</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(chat.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link
                    to={`/dashboard/chats/${chat.id}`}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 