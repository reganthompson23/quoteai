import React from 'react';
import { useNavigate } from 'react-router-dom';
import PetesWebsite from './PetesWebsite';

export default function WidgetDemo() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Function to try opening the widget
    const openWidget = () => {
      // Try finding the chat container
      const chatContainer = document.querySelector('.quoteai-chat');
      if (chatContainer) {
        chatContainer.classList.add('open');
      }
      
      // Try finding the widget button and click it
      const widgetButton = document.querySelector('.quoteai-button');
      if (widgetButton) {
        (widgetButton as HTMLElement).click();
      }

      // Also dispatch the open event
      window.dispatchEvent(new CustomEvent('quoteai:open'));
    };

    // Load the widget script with Pete's demo configuration
    const script = document.createElement('script');
    script.src = '/widget.js';
    script.setAttribute('data-business-id', 'petes-demo');
    
    // Try opening multiple times after script loads
    script.onload = () => {
      // Try immediately
      openWidget();
      
      // Try after delays
      const timers = [
        setTimeout(openWidget, 1000),
        setTimeout(openWidget, 2000),
        setTimeout(openWidget, 3000)
      ];

      return () => timers.forEach(timer => clearTimeout(timer));
    };

    // Add script to document
    document.body.appendChild(script);

    return () => {
      // Cleanup widget when component unmounts
      document.body.removeChild(script);
      const widget = document.querySelector('.quoteai-widget');
      if (widget && widget.parentElement) {
        widget.parentElement.removeChild(widget);
      }
    };
  }, []);

  const handlePricingClick = () => {
    navigate('/#pricing');
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Widget Preview</h3>
          <p className="text-sm text-gray-500">
            This is how your customers will see the chat widget on your site.
          </p>
          <p className="text-sm text-blue-600 font-medium">
            Try asking about painting services to see it in action!
          </p>
        </div>
      </div>
      
      <div className="border-b">
        <button 
          onClick={handlePricingClick}
          className="w-full px-4 py-2 text-sm bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
        >
          Don't have a website? We'll build you one like this AND train and implement your PricePilot chatbot if you sign up for our $100 a month plan. Click here.
        </button>
      </div>

      <div className="h-[600px] sm:h-[800px] overflow-y-auto relative">
        <PetesWebsite />
      </div>
    </div>
  );
} 