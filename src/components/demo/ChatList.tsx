import React from 'react';
import { format } from 'date-fns';

interface ChatListProps {
  fullWidth?: boolean;
}

const MOCK_CHATS = [
  {
    id: 'demo-1',
    customerName: 'Sarah Johnson',
    lastMessage: "That sounds perfect for my Victorian home. When can you start?",
    createdAt: new Date(2024, 0, 15, 14, 30),
    messages: [
      {
        role: 'user',
        content: "Hi, I need a quote for painting my Victorian heritage listed home in Paddington. It's 2 stories, 4 bedrooms."
      },
      {
        role: 'assistant',
        content: "I'd be happy to help you with a quote for your Victorian home. Since it's a heritage listed property, we'll need to use specific materials and techniques to preserve its character. For a 2-story, 4-bedroom Victorian home, our base rate would be $12,000. However, being heritage listed adds a 20% premium for specialized materials and extra care, bringing the estimate to $14,400. Would you like to discuss color schemes and timing?"
      },
      {
        role: 'user',
        content: "That sounds perfect for my Victorian home. When can you start?"
      }
    ]
  },
  {
    id: 'demo-2',
    customerName: 'Mike Chen',
    lastMessage: "Great, looking forward to the modern look!",
    createdAt: new Date(2024, 0, 14, 9, 15),
    messages: [
      {
        role: 'user',
        content: "Looking for an exterior paint job on my 3-story modern apartment building."
      },
      {
        role: 'assistant',
        content: "For a 3-story modern apartment building exterior, our base rate would be $15,000. Since this is an external paint job on a multi-story building, we add a 10% surcharge per story for safety equipment and access requirements. With 3 stories, that's a 30% addition, bringing the total estimate to $19,500. This includes preparation, premium weather-resistant paint, and all necessary equipment. Would you like to discuss color options?"
      },
      {
        role: 'user',
        content: "Great, looking forward to the modern look!"
      }
    ]
  },
  {
    id: 'demo-3',
    customerName: 'Emma Wilson',
    lastMessage: "Thanks for the detailed quote. I'll discuss with my partner.",
    createdAt: new Date(2024, 0, 13, 16, 45),
    messages: [
      {
        role: 'user',
        content: "Hi, I'm looking to get my Queenslander painted. It's heritage listed and needs some restoration work."
      },
      {
        role: 'assistant',
        content: "Hello! For a heritage listed Queenslander, we'll need to take special care with the restoration and painting process. Our base rate for a typical Queenslander is $14,000, and with the heritage listing, we add a 20% premium for specialized materials and techniques, bringing the estimate to $16,800. This includes preparation, repairs to any weather damage, and full exterior painting including the veranda and all trim work. Would you like more details about our heritage restoration process?"
      },
      {
        role: 'user',
        content: "Thanks for the detailed quote. I'll discuss with my partner."
      }
    ]
  }
];

export function ChatList({ fullWidth = false }: ChatListProps) {
  const [selectedChat, setSelectedChat] = React.useState<string | null>(null);

  return (
    <div className={`bg-white rounded-lg shadow ${fullWidth ? 'w-full' : ''}`}>
      <div className="px-4 py-5 sm:px-6 border-b">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Estimates</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {MOCK_CHATS.map((chat) => (
          <li key={chat.id}>
            <button
              onClick={() => setSelectedChat(chat.id === selectedChat ? null : chat.id)}
              className="w-full px-4 py-4 sm:px-6 hover:bg-gray-50 flex flex-col gap-1 text-left"
            >
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-blue-600">{chat.customerName}</p>
                <p className="text-xs text-gray-500">
                  {format(chat.createdAt, 'MMM d, h:mm a')}
                </p>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
            </button>
            
            {selectedChat === chat.id && (
              <div className="px-4 py-3 bg-gray-50">
                {chat.messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`mb-3 ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
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