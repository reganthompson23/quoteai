import React from 'react';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Mail, Phone, User } from 'lucide-react';
import { api } from '../../lib/api';
import { Chat } from '../../types';

interface ChatResponse {
  chats: Chat[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

const PAGE_SIZE = 20;

export function ChatList() {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['chats'],
    queryFn: ({ pageParam = 0 }) => api.getChats(pageParam, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage: ChatResponse | undefined) => {
      if (!lastPage) return undefined;
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
    staleTime: 30_000, // Cache for 30 seconds
    gcTime: 5 * 60 * 1000 // Keep in cache for 5 minutes
  });

  const allChats = data?.pages.flatMap(page => page?.chats || []) || [];

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

  if (!allChats.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No chats yet</h3>
        <p className="mt-2 text-sm text-gray-500">
          When customers start chatting, their conversations will appear here.
        </p>
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
                Customer
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allChats.map((chat: Chat) => (
              <tr key={chat.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link
                    to={`/dashboard/chats/${chat.id}`}
                    className="text-gray-900 hover:text-blue-600"
                  >
                    Chat #{typeof chat.id === 'string' ? chat.id.slice(0, 8) : chat.id}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <User className={`h-8 w-8 rounded-full p-1 ${chat.contact_name ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`} />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {chat.contact_name || 'Anonymous Customer'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">
                  {chat.summary}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    {chat.contact_email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        {chat.contact_email}
                      </div>
                    )}
                    {chat.contact_phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        {chat.contact_phone}
                      </div>
                    )}
                    {!chat.contact_email && !chat.contact_phone && (
                      <span className="text-sm text-gray-400">No contact info provided</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(chat.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasNextPage && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  );
} 