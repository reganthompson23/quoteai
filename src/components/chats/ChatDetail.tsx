import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Mail, Phone, User } from 'lucide-react';
import { api } from '../../lib/api';
import { Chat } from '../../types';

export function ChatDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: chat, isLoading, error } = useQuery<Chat>({
    queryKey: ['chat', id],
    queryFn: () => api.getChat(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !chat) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Failed to load chat details. Please try again.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/dashboard/chats"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Chats
        </Link>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Chat #{chat.chatNumber.toString().padStart(5, '0')}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {new Date(chat.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-4 min-w-[250px]">
            <h3 className="font-semibold text-gray-900 mb-3">Contact Details</h3>
            <div className="space-y-2">
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
                <p className="text-sm text-gray-400">No contact info provided</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-gray-900 mb-2">Conversation Summary</h3>
          <p className="text-gray-600">{chat.summary}</p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Conversation</h3>
        <div className="space-y-4">
          {chat.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 