import React from 'react';
import PetesWebsite from './PetesWebsite';

export default function WidgetDemo() {
  React.useEffect(() => {
    // Load the widget script with Pete's demo configuration
    const script = document.createElement('script');
    script.src = '/widget.js';
    script.setAttribute('data-business-id', 'petes-demo');
    script.setAttribute('data-auto-open', 'true');
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

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Widget Preview</h3>
            <p className="mt-1 text-sm text-gray-500">
              This is how your customers will see the chat widget on your website.
            </p>
          </div>
          <div className="text-sm text-blue-600">
            Try asking about painting services!
          </div>
        </div>
      </div>
      
      <div className="border-b">
        <div className="max-w-5xl mx-auto px-4 py-2 text-sm bg-blue-50 text-blue-700">
          🔍 Preview Mode - This is a demo of how the widget appears on a business website
        </div>
      </div>

      <div className="h-[800px] overflow-y-auto relative">
        <PetesWebsite />
      </div>
    </div>
  );
} 