import React from 'react';
import { Code } from 'lucide-react';

interface WidgetPreviewProps {
  businessId: string;
}

export default function WidgetPreview({ businessId }: WidgetPreviewProps) {
  const [isPreviewMode, setIsPreviewMode] = React.useState(true);

  React.useEffect(() => {
    // Load the widget script
    const script = document.createElement('script');
    script.src = '/widget.js';
    script.setAttribute('data-business-id', businessId);
    document.body.appendChild(script);

    return () => {
      // Cleanup widget when component unmounts
      document.body.removeChild(script);
      const widget = document.querySelector('.quoteai-widget');
      if (widget && widget.parentElement) {
        widget.parentElement.removeChild(widget);
      }
    };
  }, [businessId]);

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Website Chat Widget</h3>
        <button
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          {isPreviewMode ? 'Show Installation' : 'Show Preview'}
        </button>
      </div>
      
      {isPreviewMode ? (
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Preview</h4>
            <p className="text-sm text-gray-500">
              This is how your chat widget will appear on your website. Try clicking the chat button in the bottom right corner!
            </p>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[400px] relative">
            <div className="text-center max-w-md mx-auto">
              <p className="text-sm text-gray-500 mb-4">👆 Your website content would be here</p>
              <p className="text-xs text-gray-400">
                (The chat button is in the bottom right corner)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Installation</h4>
            <p className="text-sm text-gray-500">
              Add this code to your website to start collecting leads automatically.
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4 relative">
            <Code className="absolute right-4 top-4 h-5 w-5 text-gray-500" />
            <pre className="text-sm text-gray-300 overflow-x-auto">
              {`<script
  src="https://your-domain.com/widget.js"
  data-business-id="${businessId}"
></script>`}
            </pre>
          </div>
          
          <p className="mt-4 text-sm text-gray-500">
            Add this script to your website's HTML, ideally just before the closing &lt;/body&gt; tag.
          </p>
        </div>
      )}
    </div>
  );
} 