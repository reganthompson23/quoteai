import React from 'react';
import { format } from 'date-fns';

interface ChatListProps {
  fullWidth?: boolean;
}

const MOCK_CHATS = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    createdAt: new Date(2024, 0, 15, 14, 30),
    lastMessage: 'That sounds perfect for my Victorian home. When can you start?',
    messages: [
      {
        role: 'user',
        content: 'Hi, I need a quote for painting my heritage listed Victorian home. It\'s 2 stories, 4 bedrooms with a lot of detailed trim work.'
      },
      {
        role: 'assistant',
        content: 'For a heritage listed 2-story Victorian home with 4 bedrooms, our base rate would be $23,750. Since this is a heritage listed property, we add a 20% surcharge for specialized materials and extra care required, bringing the total to $28,500. This includes full interior and exterior painting, period-appropriate colors, and all necessary preparation. Would you like to discuss specific color schemes?'
      },
      {
        role: 'user',
        content: 'That sounds perfect for my Victorian home. When can you start?'
      }
    ]
  },
  {
    id: '2',
    customerName: 'Mike Chen',
    createdAt: new Date(2024, 0, 14, 9, 15),
    lastMessage: 'Great, looking forward to the modern look!',
    messages: [
      {
        role: 'user',
        content: 'Looking for an exterior paint job on my 3-story modern apartment building.'
      },
      {
        role: 'assistant',
        content: 'For a 3-story modern apartment building exterior, our base rate would be $25,000. Since this is an external paint job on a multi-story building, we add a 10% surcharge per story for safety equipment and access requirements. With 3 stories, that\'s a 30% addition, bringing the total estimate to $32,000. This includes preparation, premium weather-resistant paint, and all necessary equipment. Would you like to discuss color options?'
      },
      {
        role: 'user',
        content: 'Great, looking forward to the modern look!'
      }
    ]
  },
  {
    id: '3',
    customerName: 'Emma Wilson',
    createdAt: new Date(2024, 0, 13, 16, 45),
    lastMessage: 'Thanks for the detailed quote. I\'ll discuss with my partner.',
    messages: [
      {
        role: 'user',
        content: 'Need a quote for restoring and painting my heritage Queenslander home.'
      },
      {
        role: 'assistant',
        content: 'For a heritage listed Queenslander restoration, our base rate would be $20,400. With the 20% heritage surcharge for specialized materials and techniques, the total comes to $24,500. This includes full exterior restoration, veranda and trim detail work, weather damage repair, and a traditional color scheme. Would you like more details about our heritage restoration process?'
      },
      {
        role: 'user',
        content: 'Thanks for the detailed quote. I\'ll discuss with my partner.'
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
                  {format(chat.createdAt, 'MMM d, h:mm a')}
                </p>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{chat.lastMessage}</p>
            </button>
            
            {selectedChat === chat.id && (
              <div className="px-3 py-3 sm:px-6 sm:py-4 bg-gray-50">
                {chat.messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`mb-3 ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block rounded-lg px-3 py-2 sm:px-4 sm:py-2 max-w-[85%] ${
                        message.role === 'user'
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