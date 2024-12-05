import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, Clock } from 'lucide-react';

interface Message {
  id: string;
  type: 'customer' | 'business';
  content: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  customerName: string;
  messages: Message[];
}

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
        content: 'Hi, I need a quote for painting my unit',
        timestamp: new Date(2024, 0, 12, 11, 20)
      },
      {
        id: '2',
        type: 'business',
        content: 'I\'d be happy to help! How many bedrooms does your unit have?',
        timestamp: new Date(2024, 0, 12, 11, 21)
      },
      {
        id: '3',
        type: 'customer',
        content: '2 bedrooms',
        timestamp: new Date(2024, 0, 12, 11, 21)
      },
      {
        id: '4',
        type: 'business',
        content: 'Great. Besides the 2 bedrooms, what other rooms need painting?',
        timestamp: new Date(2024, 0, 12, 11, 22)
      },
      {
        id: '5',
        type: 'customer',
        content: '1 bathroom, kitchen, and living room',
        timestamp: new Date(2024, 0, 12, 11, 22)
      },
      {
        id: '6',
        type: 'business',
        content: 'Thanks. Are there any repairs needed, like wall cracks or holes?',
        timestamp: new Date(2024, 0, 12, 11, 23)
      },
      {
        id: '7',
        type: 'customer',
        content: 'Yes, there\'s a crack in the living room wall',
        timestamp: new Date(2024, 0, 12, 11, 23)
      },
      {
        id: '8',
        type: 'business',
        content: 'I\'ll include that repair. Is the unit furnished or empty?',
        timestamp: new Date(2024, 0, 12, 11, 24)
      },
      {
        id: '9',
        type: 'customer',
        content: 'Empty, no furniture',
        timestamp: new Date(2024, 0, 12, 11, 24)
      },
      {
        id: '10',
        type: 'business',
        content: 'Perfect. For a complete interior paint job of your 2-bedroom unit including living room crack repair, using premium washable white paint throughout, our quote is $4,800. This covers all walls, ceilings, and trim work. Since the unit is empty, there\'s no furniture moving fee. Would you like to proceed?',
        timestamp: new Date(2024, 0, 12, 11, 25)
      },
      {
        id: '11',
        type: 'customer',
        content: 'That works for my budget. How soon can you start?',
        timestamp: new Date(2024, 0, 12, 11, 25)
      },
      {
        id: '12',
        type: 'business',
        content: 'Great! To schedule the work, I\'ll just need your contact details. Could you please provide your email address?',
        timestamp: new Date(2024, 0, 12, 11, 26)
      },
      {
        id: '13',
        type: 'customer',
        content: 'david.thompson@email.com',
        timestamp: new Date(2024, 0, 12, 11, 26)
      },
      {
        id: '14',
        type: 'business',
        content: 'Thanks David. And your best contact number?',
        timestamp: new Date(2024, 0, 12, 11, 27)
      },
      {
        id: '15',
        type: 'customer',
        content: '0412 345 678',
        timestamp: new Date(2024, 0, 12, 11, 27)
      },
      {
        id: '16',
        type: 'business',
        content: 'Perfect! I\'ve got all the details now. We can start next Monday. I\'ll send you a detailed quote and schedule confirmation to your email. Would that timing work for you?',
        timestamp: new Date(2024, 0, 12, 11, 28)
      },
      {
        id: '17',
        type: 'customer',
        content: 'Yes, that would be great!',
        timestamp: new Date(2024, 0, 12, 11, 28)
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
        content: 'Hi, I need a quote for exterior house painting',
        timestamp: new Date(2024, 0, 8, 15, 30)
      },
      {
        id: '2',
        type: 'business',
        content: 'I can help with that! Is this a single-story or multi-story house?',
        timestamp: new Date(2024, 0, 8, 15, 31)
      },
      {
        id: '3',
        type: 'customer',
        content: 'It\'s two stories',
        timestamp: new Date(2024, 0, 8, 15, 31)
      },
      {
        id: '4',
        type: 'business',
        content: 'Thanks. What type of exterior walls does your house have? (e.g., weatherboard, brick, render)',
        timestamp: new Date(2024, 0, 8, 15, 32)
      },
      {
        id: '5',
        type: 'customer',
        content: 'It\'s weatherboard',
        timestamp: new Date(2024, 0, 8, 15, 32)
      },
      {
        id: '6',
        type: 'business',
        content: 'Do you know the approximate exterior area that needs painting? Or the house dimensions?',
        timestamp: new Date(2024, 0, 8, 15, 33)
      },
      {
        id: '7',
        type: 'customer',
        content: 'About 200 square meters total',
        timestamp: new Date(2024, 0, 8, 15, 33)
      },
      {
        id: '8',
        type: 'business',
        content: 'What condition is the current paint in? Any peeling or areas needing special preparation?',
        timestamp: new Date(2024, 0, 8, 15, 34)
      },
      {
        id: '9',
        type: 'customer',
        content: 'Some areas are peeling and will need sanding',
        timestamp: new Date(2024, 0, 8, 15, 34)
      },
      {
        id: '10',
        type: 'business',
        content: 'Would you like the window frames and trims painted as well?',
        timestamp: new Date(2024, 0, 8, 15, 35)
      },
      {
        id: '11',
        type: 'customer',
        content: 'Yes, all trims and window frames please',
        timestamp: new Date(2024, 0, 8, 15, 35)
      },
      {
        id: '12',
        type: 'business',
        content: 'Do you have any specific colors in mind?',
        timestamp: new Date(2024, 0, 8, 15, 36)
      },
      {
        id: '13',
        type: 'customer',
        content: 'I\'d like white walls with dark grey trims',
        timestamp: new Date(2024, 0, 8, 15, 36)
      },
      {
        id: '14',
        type: 'business',
        content: 'Based on your two-story weatherboard house (200 square meters), including preparation work, sanding, premium exterior paint, and all trims/window frames, our quote is $12,500. This includes thorough preparation, premium weather-resistant paint, and complete clean-up. Would you like to proceed with the white and grey color scheme?',
        timestamp: new Date(2024, 0, 8, 15, 37)
      },
      {
        id: '15',
        type: 'customer',
        content: 'The quote sounds reasonable. I\'d like to go ahead with the white and grey color scheme.',
        timestamp: new Date(2024, 0, 8, 15, 37)
      },
      {
        id: '16',
        type: 'business',
        content: 'Excellent! Could I get your email address to send the detailed quote?',
        timestamp: new Date(2024, 0, 8, 15, 38)
      },
      {
        id: '17',
        type: 'customer',
        content: 'lisa.martinez@email.com',
        timestamp: new Date(2024, 0, 8, 15, 38)
      },
      {
        id: '18',
        type: 'business',
        content: 'And your best contact number for scheduling?',
        timestamp: new Date(2024, 0, 8, 15, 39)
      },
      {
        id: '19',
        type: 'customer',
        content: '0423 456 789',
        timestamp: new Date(2024, 0, 8, 15, 39)
      },
      {
        id: '20',
        type: 'business',
        content: 'Thanks Lisa! I\'ll send the detailed quote to your email now. Would you like to schedule an in-person inspection to confirm all the details?',
        timestamp: new Date(2024, 0, 8, 15, 40)
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
        content: 'Hi, I need a quote for painting my house',
        timestamp: new Date(2024, 0, 22, 13, 15)
      },
      {
        id: '2',
        type: 'business',
        content: 'I can help with that! Is this a single-story house?',
        timestamp: new Date(2024, 0, 22, 13, 16)
      },
      {
        id: '3',
        type: 'customer',
        content: 'Yes, single story. 4 bedrooms',
        timestamp: new Date(2024, 0, 22, 13, 16)
      },
      {
        id: '4',
        type: 'business',
        content: 'Great. Are you looking for interior painting, exterior, or both?',
        timestamp: new Date(2024, 0, 22, 13, 17)
      },
      {
        id: '5',
        type: 'customer',
        content: 'Need interior walls and ceilings done, plus the exterior trim and window frames',
        timestamp: new Date(2024, 0, 22, 13, 17)
      },
      {
        id: '6',
        type: 'business',
        content: 'I see. Besides the 4 bedrooms, what other rooms need interior painting?',
        timestamp: new Date(2024, 0, 22, 13, 18)
      },
      {
        id: '7',
        type: 'customer',
        content: '2 bathrooms and all living areas',
        timestamp: new Date(2024, 0, 22, 13, 18)
      },
      {
        id: '8',
        type: 'business',
        content: 'Are there any repairs needed, such as plaster cracks or holes?',
        timestamp: new Date(2024, 0, 22, 13, 19)
      },
      {
        id: '9',
        type: 'customer',
        content: 'Yes, there are some plaster cracks that need fixing',
        timestamp: new Date(2024, 0, 22, 13, 19)
      },
      {
        id: '10',
        type: 'business',
        content: 'Do you have any specific color scheme in mind?',
        timestamp: new Date(2024, 0, 22, 13, 20)
      },
      {
        id: '11',
        type: 'customer',
        content: 'Just neutral colors throughout',
        timestamp: new Date(2024, 0, 22, 13, 20)
      },
      {
        id: '12',
        type: 'business',
        content: 'For your 4-bedroom single-story house, including all interior walls, ceilings, and trims, plus exterior trim work and window frames, with plaster repairs, our quote is $15,800. This includes premium paint suitable for each area and all preparation work. Would you like to proceed?',
        timestamp: new Date(2024, 0, 22, 13, 21)
      },
      {
        id: '13',
        type: 'customer',
        content: 'That\'s within our budget. When can you do an in-person inspection?',
        timestamp: new Date(2024, 0, 22, 13, 21)
      },
      {
        id: '14',
        type: 'business',
        content: 'I can schedule an inspection this week. First, could I get your email address to send the quote details?',
        timestamp: new Date(2024, 0, 22, 13, 22)
      },
      {
        id: '15',
        type: 'customer',
        content: 'james.anderson@email.com',
        timestamp: new Date(2024, 0, 22, 13, 22)
      },
      {
        id: '16',
        type: 'business',
        content: 'Thanks James. And your contact number for the inspection?',
        timestamp: new Date(2024, 0, 22, 13, 23)
      },
      {
        id: '17',
        type: 'customer',
        content: '0434 567 890',
        timestamp: new Date(2024, 0, 22, 13, 23)
      },
      {
        id: '18',
        type: 'business',
        content: 'Perfect! Would you be available for an inspection this Thursday morning?',
        timestamp: new Date(2024, 0, 22, 13, 24)
      },
      {
        id: '19',
        type: 'customer',
        content: 'Thursday morning works great',
        timestamp: new Date(2024, 0, 22, 13, 24)
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
        content: 'Hi, I need a quote for restoring my Queenslander home',
        timestamp: new Date(2024, 0, 13, 16, 45)
      },
      {
        id: '2',
        type: 'business',
        content: 'I specialize in heritage homes! Is this a heritage-listed Queenslander?',
        timestamp: new Date(2024, 0, 13, 16, 46)
      },
      {
        id: '3',
        type: 'customer',
        content: 'Yes, it is heritage listed',
        timestamp: new Date(2024, 0, 13, 16, 46)
      },
      {
        id: '4',
        type: 'business',
        content: 'What specific areas need restoration and painting?',
        timestamp: new Date(2024, 0, 13, 16, 47)
      },
      {
        id: '5',
        type: 'customer',
        content: 'The entire exterior needs repainting, including the veranda and all trim work',
        timestamp: new Date(2024, 0, 13, 16, 47)
      },
      {
        id: '6',
        type: 'business',
        content: 'Are there any areas with weather damage that need repair?',
        timestamp: new Date(2024, 0, 13, 16, 48)
      },
      {
        id: '7',
        type: 'customer',
        content: 'Yes, there\'s some weather damage that needs fixing',
        timestamp: new Date(2024, 0, 13, 16, 48)
      },
      {
        id: '8',
        type: 'business',
        content: 'For heritage homes, we need to use specific materials and techniques. Would you like me to explain our heritage restoration process?',
        timestamp: new Date(2024, 0, 13, 16, 49)
      },
      {
        id: '9',
        type: 'customer',
        content: 'Yes please, that would be helpful',
        timestamp: new Date(2024, 0, 13, 16, 49)
      },
      {
        id: '10',
        type: 'business',
        content: 'We use heritage-approved materials and traditional techniques for authenticity. This includes proper surface preparation, repair of weather-damaged areas, and period-appropriate paint systems. For the veranda and trim details, we take extra care to preserve and enhance the original features. Would you like to maintain a traditional color palette?',
        timestamp: new Date(2024, 0, 13, 16, 50)
      },
      {
        id: '11',
        type: 'customer',
        content: 'Yes, I\'d like to stick with traditional colors',
        timestamp: new Date(2024, 0, 13, 16, 50)
      },
      {
        id: '12',
        type: 'business',
        content: 'For your heritage-listed Queenslander, including full exterior restoration, veranda and trim detail work, weather damage repair, and heritage-approved materials, our quote is $24,500. This includes all preparation, repairs, and a traditional color scheme. Would you like to proceed?',
        timestamp: new Date(2024, 0, 13, 16, 51)
      },
      {
        id: '13',
        type: 'customer',
        content: 'Thanks for the detailed quote. I\'ll discuss with my partner.',
        timestamp: new Date(2024, 0, 13, 16, 51)
      },
      {
        id: '14',
        type: 'business',
        content: 'Of course! Could I get your email to send the full quote details?',
        timestamp: new Date(2024, 0, 13, 16, 52)
      },
      {
        id: '15',
        type: 'customer',
        content: 'emma.wilson@email.com',
        timestamp: new Date(2024, 0, 13, 16, 52)
      },
      {
        id: '16',
        type: 'business',
        content: 'And your phone number for any follow-up questions?',
        timestamp: new Date(2024, 0, 13, 16, 53)
      },
      {
        id: '17',
        type: 'customer',
        content: '0445 678 901',
        timestamp: new Date(2024, 0, 13, 16, 53)
      },
      {
        id: '18',
        type: 'business',
        content: 'Thanks Emma! I\'ll send the detailed quote to your email. Feel free to reach out if you have any questions after discussing with your partner.',
        timestamp: new Date(2024, 0, 13, 16, 54)
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
        content: 'Hello, I need a quote for painting my Victorian heritage home',
        timestamp: new Date(2024, 0, 15, 14, 30)
      },
      {
        id: '2',
        type: 'business',
        content: 'I specialize in heritage homes! Is this a heritage-listed Victorian?',
        timestamp: new Date(2024, 0, 15, 14, 31)
      },
      {
        id: '3',
        type: 'customer',
        content: 'Yes, it\'s heritage listed. It\'s a 2-story Victorian',
        timestamp: new Date(2024, 0, 15, 14, 31)
      },
      {
        id: '4',
        type: 'business',
        content: 'How many bedrooms does the house have?',
        timestamp: new Date(2024, 0, 15, 14, 32)
      },
      {
        id: '5',
        type: 'customer',
        content: '4 bedrooms, 2 bathrooms, plus living areas',
        timestamp: new Date(2024, 0, 15, 14, 32)
      },
      {
        id: '6',
        type: 'business',
        content: 'Are you looking for both interior and exterior painting?',
        timestamp: new Date(2024, 0, 15, 14, 33)
      },
      {
        id: '7',
        type: 'customer',
        content: 'Yes, both interior and exterior need to be done',
        timestamp: new Date(2024, 0, 15, 14, 33)
      },
      {
        id: '8',
        type: 'business',
        content: 'For heritage-listed properties, we need to use specific materials and techniques. Would you like me to explain our heritage restoration process?',
        timestamp: new Date(2024, 0, 15, 14, 34)
      },
      {
        id: '9',
        type: 'customer',
        content: 'Yes please',
        timestamp: new Date(2024, 0, 15, 14, 34)
      },
      {
        id: '10',
        type: 'business',
        content: 'We use heritage-approved materials that match the original period. This includes special preparation techniques, appropriate primers, and period-specific paint finishes. We also take extra care with any detailed trim work, which Victorian homes are known for. Would you like to maintain a period-appropriate color scheme?',
        timestamp: new Date(2024, 0, 15, 14, 35)
      },
      {
        id: '11',
        type: 'customer',
        content: 'Yes, I want to keep it authentic to the period',
        timestamp: new Date(2024, 0, 15, 14, 35)
      },
      {
        id: '12',
        type: 'business',
        content: 'For your 2-story Victorian heritage home, including full interior and exterior painting with period-appropriate materials and colors, our quote is $28,500. This covers all preparation, special heritage-approved materials, and detailed work on all architectural features. Would you like to proceed?',
        timestamp: new Date(2024, 0, 15, 14, 36)
      },
      {
        id: '13',
        type: 'customer',
        content: 'That sounds perfect for my Victorian home. When can you start?',
        timestamp: new Date(2024, 0, 15, 14, 36)
      },
      {
        id: '14',
        type: 'business',
        content: 'Great! First, I\'ll need your contact details to send the formal quote. Could you provide your email address?',
        timestamp: new Date(2024, 0, 15, 14, 37)
      },
      {
        id: '15',
        type: 'customer',
        content: 'sarah.johnson@email.com',
        timestamp: new Date(2024, 0, 15, 14, 37)
      },
      {
        id: '16',
        type: 'business',
        content: 'Thanks Sarah. And your best contact number?',
        timestamp: new Date(2024, 0, 15, 14, 38)
      },
      {
        id: '17',
        type: 'customer',
        content: '0456 789 012',
        timestamp: new Date(2024, 0, 15, 14, 38)
      },
      {
        id: '18',
        type: 'business',
        content: 'Perfect! We can start in two weeks. I\'ll send you a detailed quote with our heritage restoration process and schedule. Would you like to schedule a site inspection this week?',
        timestamp: new Date(2024, 0, 15, 14, 39)
      },
      {
        id: '19',
        type: 'customer',
        content: 'Yes, that would be great!',
        timestamp: new Date(2024, 0, 15, 14, 39)
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
        content: 'Hi, I need a quote for painting an apartment building exterior',
        timestamp: new Date(2024, 0, 14, 9, 15)
      },
      {
        id: '2',
        type: 'business',
        content: 'I can help with commercial projects! How many stories is the building?',
        timestamp: new Date(2024, 0, 14, 9, 16)
      },
      {
        id: '3',
        type: 'customer',
        content: 'It\'s a 3-story modern complex',
        timestamp: new Date(2024, 0, 14, 9, 16)
      },
      {
        id: '4',
        type: 'business',
        content: 'Thanks. What type of exterior finish does the building have?',
        timestamp: new Date(2024, 0, 14, 9, 17)
      },
      {
        id: '5',
        type: 'customer',
        content: 'Modern render finish throughout',
        timestamp: new Date(2024, 0, 14, 9, 17)
      },
      {
        id: '6',
        type: 'business',
        content: 'For multi-story buildings, we use special weather-resistant coatings. Would you like me to explain the benefits?',
        timestamp: new Date(2024, 0, 14, 9, 18)
      },
      {
        id: '7',
        type: 'customer',
        content: 'Yes, please tell me more',
        timestamp: new Date(2024, 0, 14, 9, 18)
      },
      {
        id: '8',
        type: 'business',
        content: 'Our commercial-grade coating system provides superior weather protection and UV resistance, lasting up to 15 years. It includes proper surface preparation, premium primers, and two coats of weather-resistant paint. We also use professional height access equipment for safe application. What colors were you considering?',
        timestamp: new Date(2024, 0, 14, 9, 19)
      },
      {
        id: '9',
        type: 'customer',
        content: 'Looking for a modern gray and white scheme',
        timestamp: new Date(2024, 0, 14, 9, 19)
      },
      {
        id: '10',
        type: 'business',
        content: 'For your 3-story modern apartment complex, including all safety equipment, weather-resistant coating system, and complete exterior repaint, our quote is $32,000. This includes thorough preparation, premium materials, and all necessary height access equipment. Would you like to proceed?',
        timestamp: new Date(2024, 0, 14, 9, 20)
      },
      {
        id: '11',
        type: 'customer',
        content: 'Great, looking forward to the modern look!',
        timestamp: new Date(2024, 0, 14, 9, 20)
      },
      {
        id: '12',
        type: 'business',
        content: 'Excellent! For commercial projects, we\'ll need some contact details. Could you provide your email for the formal quote?',
        timestamp: new Date(2024, 0, 14, 9, 21)
      },
      {
        id: '13',
        type: 'customer',
        content: 'mike.chen@email.com',
        timestamp: new Date(2024, 0, 14, 9, 21)
      },
      {
        id: '14',
        type: 'business',
        content: 'Thanks Mike. And your business phone number?',
        timestamp: new Date(2024, 0, 14, 9, 22)
      },
      {
        id: '15',
        type: 'customer',
        content: '0467 890 123',
        timestamp: new Date(2024, 0, 14, 9, 22)
      },
      {
        id: '16',
        type: 'business',
        content: 'Perfect! I\'ll send over a detailed commercial quote including our warranty terms and safety procedures. Would you like to schedule a site inspection this week?',
        timestamp: new Date(2024, 0, 14, 9, 23)
      },
      {
        id: '17',
        type: 'customer',
        content: 'Yes, that would be great. The sooner the better',
        timestamp: new Date(2024, 0, 14, 9, 23)
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