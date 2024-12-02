// QuoteAI Widget
(function() {
  // Create widget styles
  const styles = `
    .quoteai-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
    }
    .quoteai-button {
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }
    .quoteai-button:hover {
      background: #1d4ed8;
    }
    .quoteai-chat {
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 400px;
      height: 600px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      display: none;
      flex-direction: column;
      overflow: hidden;
    }
    .quoteai-chat.open {
      display: flex;
    }
    .quoteai-header {
      padding: 16px;
      background: #2563eb;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .quoteai-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 4px;
    }
    .quoteai-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }
    .quoteai-message {
      margin-bottom: 12px;
      max-width: 80%;
    }
    .quoteai-message.user {
      margin-left: auto;
      background: #2563eb;
      color: white;
      padding: 8px 12px;
      border-radius: 12px 12px 0 12px;
    }
    .quoteai-message.bot {
      background: #f3f4f6;
      padding: 8px 12px;
      border-radius: 12px 12px 12px 0;
    }
    .quoteai-input {
      padding: 16px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
    }
    .quoteai-input input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      outline: none;
    }
    .quoteai-input input:focus {
      border-color: #2563eb;
    }
    .quoteai-input button {
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 8px 16px;
      cursor: pointer;
    }
    .quoteai-input button:hover {
      background: #1d4ed8;
    }
  `;

  // Create and inject styles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Get business ID from script tag
  const script = document.currentScript;
  const businessId = script.getAttribute('data-business-id');

  // Create widget HTML
  const widgetHTML = `
    <div class="quoteai-widget">
      <button class="quoteai-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
      <div class="quoteai-chat">
        <div class="quoteai-header">
          <div>
            <h3>Get an Instant Quote</h3>
            <p style="font-size: 12px; opacity: 0.8;">Powered by QuoteAI</p>
          </div>
          <button class="quoteai-close">✕</button>
        </div>
        <div class="quoteai-messages">
          <div class="quoteai-message bot">
            Hi! I can help you get an instant quote. Just describe what you need.
          </div>
        </div>
        <div class="quoteai-input">
          <input type="text" placeholder="Describe your project...">
          <button>Send</button>
        </div>
      </div>
    </div>
  `;

  // Insert widget into page
  const container = document.createElement('div');
  container.innerHTML = widgetHTML;
  document.body.appendChild(container);

  // Widget functionality
  const widget = container.querySelector('.quoteai-widget');
  const toggleButton = widget.querySelector('.quoteai-button');
  const chat = widget.querySelector('.quoteai-chat');
  const closeButton = widget.querySelector('.quoteai-close');
  const input = widget.querySelector('input');
  const sendButton = widget.querySelector('.quoteai-input button');
  const messages = widget.querySelector('.quoteai-messages');

  // Toggle chat
  toggleButton.addEventListener('click', () => {
    chat.classList.add('open');
  });

  closeButton.addEventListener('click', () => {
    chat.classList.remove('open');
  });

  // Send message
  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'quoteai-message user';
    userMessage.textContent = text;
    messages.appendChild(userMessage);

    // Clear input
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    try {
      // Send to API
      const response = await fetch('https://quoteai-backend.onre.r.com/quote/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessId,
          description: text,
        }),
      });

      const data = await response.json();

      // Add bot message
      const botMessage = document.createElement('div');
      botMessage.className = 'quoteai-message bot';
      botMessage.textContent = data.message;
      messages.appendChild(botMessage);
      messages.scrollTop = messages.scrollHeight;
    } catch (error) {
      console.error('Failed to get response:', error);
      const errorMessage = document.createElement('div');
      errorMessage.className = 'quoteai-message bot';
      errorMessage.textContent = 'Sorry, I encountered an error. Please try again.';
      messages.appendChild(errorMessage);
      messages.scrollTop = messages.scrollHeight;
    }
  }

  sendButton.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
})();