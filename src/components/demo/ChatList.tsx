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
  },
  {
    id: '4',
    customerName: 'David Thompson',
    createdAt: new Date(2024, 0, 12, 11, 20),
    lastMessage: 'Perfect, that works for my budget. How soon can you start?',
    messages: [
      {
        role: 'user',
        content: 'I have a small 2-bedroom unit that needs painting inside. Two bedrooms, one bathroom, kitchen, and living room. There\'s a crack in the living room wall that needs patching. Unit is empty and I want standard white paint throughout.'
      },
      {
        role: 'assistant',
        content: 'For your 2-bedroom unit interior, our base rate would be $4,800. This includes all walls, ceilings, and trims in all rooms, crack repair in the living room, and premium washable white paint throughout. Since the unit is empty, we won\'t need to factor in furniture moving. We use high-quality paint that\'s easy to clean and will last for years. Would you like to proceed with scheduling?'
      },
      {
        role: 'user',
        content: 'Perfect, that works for my budget. How soon can you start?'
      }
    ]
  },
  {
    id: '5',
    customerName: 'Lisa Martinez',
    createdAt: new Date(2024, 0, 8, 15, 30),
    lastMessage: 'The quote sounds reasonable. I\'d like to go ahead with the white and grey color scheme.',
    messages: [
      {
        role: 'user',
        content: 'Need the exterior of my two-story weatherboard house painted. About 200 square meters, including walls, trims, and window frames. Some peeling paint needs sanding. Want white walls and dark grey trims.'
      },
      {
        role: 'assistant',
        content: 'For your two-story weatherboard house exterior (200 square meters), our quote would be $12,500. This covers all preparation work including sanding the peeling areas, premium exterior paint for the walls in white, and hard-wearing trim paint in dark grey. We\'ll also paint the window frames and front porch. The price includes all necessary equipment and a full clean-up after completion. Would you like to proceed with the white and grey color scheme?'
      },
      {
        role: 'user',
        content: 'The quote sounds reasonable. I\'d like to go ahead with the white and grey color scheme.'
      }
    ]
  },
  {
    id: '6',
    customerName: 'James Anderson',
    createdAt: new Date(2024, 0, 22, 13, 15),
    lastMessage: 'That\'s within our budget. When can you do an in-person inspection?',
    messages: [
      {
        role: 'user',
        content: 'Looking for a quote on my single-story 4-bedroom house. Need interior walls, ceilings, and trims painted, plus exterior fascia and window frames. Some plaster cracks need fixing inside.'
      },
      {
        role: 'assistant',
        content: 'For your 4-bedroom single-story house, we can provide a comprehensive package at $15,800. This includes all interior walls, ceilings, and trims, plaster crack repairs, and exterior trim work (fascia boards and window frames). We\'ll use premium paints suitable for each area, and all preparation work is included. Would you like to schedule an inspection to confirm the scope and discuss color options?'
      },
      {
        role: 'user',
        content: 'That\'s within our budget. When can you do an in-person inspection?'
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