import React from 'react';
import { format } from 'date-fns';

interface ChatListProps {
  fullWidth?: boolean;
}

const MOCK_CHATS: Chat[] = [
  {
    id: 'chat-1',
    customerName: 'David Thompson',
    messages: [
      {
        id: '1',
        type: 'customer',
        content: 'Hi, I need a quote for painting my 2-bedroom unit.',
        timestamp: new Date(2024, 0, 12, 11, 20)
      },
      {
        id: '2',
        type: 'business',
        content: 'I can help with that. Would you like interior painting only?',
        timestamp: new Date(2024, 0, 12, 11, 22)
      },
      {
        id: '3',
        type: 'customer',
        content: 'Perfect, that works for my budget. How soon can you start?',
        timestamp: new Date(2024, 0, 12, 11, 20)
      }
    ]
  },
  {
    id: 'chat-2',
    customerName: 'Lisa Martinez',
    messages: [
      {
        id: '1',
        type: 'customer',
        content: 'Looking for an exterior paint job quote for my two-story house.',
        timestamp: new Date(2024, 0, 8, 15, 30)
      },
      {
        id: '2',
        type: 'business',
        content: 'I can provide a quote. What colors were you thinking of?',
        timestamp: new Date(2024, 0, 8, 15, 32)
      },
      {
        id: '3',
        type: 'customer',
        content: 'The quote sounds reasonable. I\'d like to go ahead with the white and grey color scheme.',
        timestamp: new Date(2024, 0, 8, 15, 30)
      }
    ]
  },
  {
    id: 'chat-3',
    customerName: 'James Anderson',
    messages: [
      {
        id: '1',
        type: 'customer',
        content: 'Need a quote for interior and exterior trim painting.',
        timestamp: new Date(2024, 0, 22, 13, 15)
      },
      {
        id: '2',
        type: 'business',
        content: 'I can help with that. Is this for a single-story house?',
        timestamp: new Date(2024, 0, 22, 13, 17)
      },
      {
        id: '3',
        type: 'customer',
        content: 'That\'s within our budget. When can you do an in-person inspection?',
        timestamp: new Date(2024, 0, 22, 13, 15)
      }
    ]
  },
  {
    id: 'chat-4',
    customerName: 'Emma Wilson',
    messages: [
      {
        id: '1',
        type: 'customer',
        content: 'Hi, I need a quote for my Queenslander restoration.',
        timestamp: new Date(2024, 0, 13, 16, 45)
      },
      {
        id: '2',
        type: 'business',
        content: 'I have experience with heritage homes. Would you like a full restoration quote?',
        timestamp: new Date(2024, 0, 13, 16, 47)
      },
      {
        id: '3',
        type: 'customer',
        content: 'Thanks for the detailed quote. I\'ll discuss with my partner.',
        timestamp: new Date(2024, 0, 13, 16, 45)
      }
    ]
  },
  {
    id: 'chat-5',
    customerName: 'Sarah Johnson',
    messages: [
      {
        id: '1',
        type: 'customer',
        content: 'Looking for a quote on my Victorian heritage home.',
        timestamp: new Date(2024, 0, 15, 14, 30)
      },
      {
        id: '2',
        type: 'business',
        content: 'I specialize in heritage homes. Would you like both interior and exterior?',
        timestamp: new Date(2024, 0, 15, 14, 32)
      },
      {
        id: '3',
        type: 'customer',
        content: 'That sounds perfect for my Victorian home. When can you start?',
        timestamp: new Date(2024, 0, 15, 14, 30)
      }
    ]
  },
  {
    id: 'chat-6',
    customerName: 'Mike Chen',
    messages: [
      {
        id: '1',
        type: 'customer',
        content: 'Need a quote for exterior painting of an apartment building.',
        timestamp: new Date(2024, 0, 14, 9, 15)
      },
      {
        id: '2',
        type: 'business',
        content: 'I can help with commercial projects. How many stories is the building?',
        timestamp: new Date(2024, 0, 14, 9, 17)
      },
      {
        id: '3',
        type: 'customer',
        content: 'Great, looking forward to the modern look!',
        timestamp: new Date(2024, 0, 14, 9, 15)
      }
    ]
  }
];

export function ChatList({ fullWidth = false }: ChatListProps) {
  const [selectedChat, setSelectedChat] = React.useState<string | null>(null);

  return (
    <div className={`bg-white rounded-lg shadow ${fullWidth ? 'w-full' : ''}`}>
      <div className="px-4 py-4 sm:px-6 border-b">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Estimates</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {MOCK_CHATS.map((chat) => (
          <li key={chat.id}>
            <button
              onClick={() => setSelectedChat(chat.id === selectedChat ? null : chat.id)}
              className="w-full px-3 py-3 sm:px-6 sm:py-4 hover:bg-gray-50 flex flex-col gap-1 text-left"
            >
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-blue-600">{chat.customerName}</p>
                <p className="text-xs text-gray-500 ml-2">
                  {format(chat.messages[0].timestamp, 'MMM d, h:mm a')}
                </p>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{chat.messages[0].content}</p>
            </button>
            
            {selectedChat === chat.id && (
              <div className="px-3 py-3 sm:px-6 sm:py-4 bg-gray-50">
                {chat.messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`mb-3 ${
                      message.type === 'customer' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block rounded-lg px-3 py-2 sm:px-4 sm:py-2 max-w-[85%] ${
                        message.type === 'customer'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm break-words">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 