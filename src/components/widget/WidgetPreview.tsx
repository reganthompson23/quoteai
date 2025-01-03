import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { api } from '../../lib/api';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

export function WidgetPreview() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi! I can help you get an instant quote. Just describe what you need.',
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !user?.id) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.generateQuote({
        businessId: user.id,
        description: input,
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        isUser: false,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to generate quote:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user?.id) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Please log in to access the widget preview.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Widget Preview</h1>
          <p className="mt-2 text-sm text-gray-600">
            This is how your AI chat widget will appear on your website. Try it out!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 h-[600px] flex flex-col">
          {/* Widget Header */}
          <div className="px-4 py-3 border-b bg-blue-600 rounded-t-lg">
            <h2 className="text-lg font-semibold text-white">Get an Instant Quote</h2>
            <p className="text-sm text-blue-100">
              Powered by {user.businessName}
            </p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe what you need... (e.g., Paint a two-story house exterior)"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add to Your Website</h3>
          <p className="text-sm text-gray-600 mb-4">
            Copy and paste this code snippet just before the closing &lt;/body&gt; tag on your website:
          </p>
          <div className="bg-gray-50 rounded-md p-4 relative group">
            <code className="text-sm text-gray-800 block">
              &lt;script src="https://pricepilot.chat/widget.js" data-business-id="{user.id}"&gt;&lt;/script&gt;
            </code>
            <button 
              onClick={() => navigator.clipboard.writeText(`<script src="https://pricepilot.chat/widget.js" data-business-id="${user.id}"></script>`)}
              className="absolute right-2 top-2 px-2 py-1 text-xs bg-blue-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}