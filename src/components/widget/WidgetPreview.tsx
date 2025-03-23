import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { api } from '../../lib/api';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

export default function WidgetPreview() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi! I can help you get an instant quote. Just describe what you need.',
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, profile } = useAuthStore();
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
      console.log('Sending quote request with description:', input);
      
      const response = await api.generateQuote({
        description: input,
        isPreview: true
      });

      console.log('Received response:', response);

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
        content: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.',
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user?.id || !profile) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Please log in to access the widget preview.</p>
      </div>
    );
  }

  const embedCode = `<script
    src="https://pricepilot.chat/widget.js"
    data-business-id="${user.id}"
    data-api-url="${import.meta.env.VITE_API_URL}">
  </script>`;

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
              Powered by {profile.businessName}
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

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Embed Code</h3>
            <div className="relative">
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">{embedCode}</code>
              </pre>
              <button
                className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                onClick={() => navigator.clipboard.writeText(embedCode)}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}