// QuoteAI Widget
(function() {
  // Get the API URL and business ID from the script tag
  const scriptTag = document.currentScript;
  const apiUrl = scriptTag.getAttribute('data-api-url') || 'http://localhost:3001';
  const businessId = scriptTag.getAttribute('data-business-id');

  if (!businessId) {
    console.error('QuoteAI Widget: Missing business ID');
    return;
  }

  // Create widget styles
  const styles = `
    .quoteai-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .quoteai-widget {
        bottom: 0;
        right: 0;
      }
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
      -webkit-tap-highlight-color: transparent;
    }

    @media (max-width: 768px) {
      .quoteai-button {
        width: 50px;
        height: 50px;
        margin: 10px;
      }
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

    @media (max-width: 768px) {
      .quoteai-chat {
        width: 92%;
        height: 92%;
        max-height: 92vh;
        bottom: 4%;
        right: 4%;
        border-radius: 12px;
      }
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
      -webkit-user-select: none;
      user-select: none;
    }

    .quoteai-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: white;
    }

    .quoteai-header p {
      margin: 4px 0 0;
      font-size: 12px;
      opacity: 0.9;
    }

    .quoteai-header .tagline {
      font-size: 11px;
      opacity: 0.8;
      font-style: italic;
      margin-top: 2px;
    }

    .quoteai-header a {
      color: white;
      text-decoration: none;
      opacity: 0.9;
      transition: opacity 0.2s;
    }

    .quoteai-header a:hover {
      opacity: 1;
    }

    .quoteai-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 8px;
      margin: -8px;
      font-size: 20px;
      -webkit-tap-highlight-color: transparent;
    }

    .quoteai-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      -webkit-overflow-scrolling: touch;
    }

    .quoteai-message {
      margin-bottom: 12px;
      max-width: 85%;
      word-wrap: break-word;
    }

    .quoteai-message.user {
      margin-left: auto;
      background: #2563eb;
      color: white;
      padding: 12px 16px;
      border-radius: 18px 18px 4px 18px;
    }

    .quoteai-message.bot {
      background: #f3f4f6;
      padding: 12px 16px;
      border-radius: 18px 18px 18px 4px;
    }

    .quoteai-input {
      padding: 16px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
      background: white;
    }

    @media (max-width: 768px) {
      .quoteai-input {
        padding: 12px;
        padding-bottom: max(12px, env(safe-area-inset-bottom));
      }
    }

    .quoteai-input textarea {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 24px;
      outline: none;
      font-size: 16px;
      -webkit-appearance: none;
      appearance: none;
      resize: none;
      min-height: 48px;
      max-height: 120px;
      line-height: 1.5;
      font-family: inherit;
      overflow-y: auto;
    }

    .quoteai-input textarea:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
    }

    .quoteai-input button {
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 24px;
      padding: 12px 20px;
      cursor: pointer;
      font-size: 16px;
      -webkit-tap-highlight-color: transparent;
      white-space: nowrap;
      align-self: flex-end;
    }

    .quoteai-input button:hover {
      background: #1d4ed8;
    }

    .quoteai-error {
      color: #dc2626;
      font-size: 14px;
      text-align: center;
      padding: 8px;
    }

    .quoteai-typing {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 12px 16px;
      background: #f3f4f6;
      border-radius: 18px 18px 18px 4px;
      margin-bottom: 12px;
      width: fit-content;
    }

    .quoteai-typing span {
      width: 6px;
      height: 6px;
      background: #94a3b8;
      border-radius: 50%;
      animation: typing 1.4s infinite;
      opacity: 0.4;
    }

    .quoteai-typing span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .quoteai-typing span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
  `;

  // Create and inject styles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Add viewport meta tag if not present
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    document.head.appendChild(viewport);
  }

  // Create widget HTML
  const widgetHTML = `
    <div class="quoteai-widget">
      <button class="quoteai-button" aria-label="Open chat">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
      <div class="quoteai-chat" role="dialog" aria-label="Chat">
        <div class="quoteai-header">
          <div>
            <h3>Get An Instant Estimate</h3>
            <p><a href="https://pricepilot.chat" target="_blank">Powered by PricePilot</a></p>
            <p class="tagline">Accurate Estimates on Auto Pilot</p>
          </div>
          <button class="quoteai-close" aria-label="Close chat">✕</button>
        </div>
        <div class="quoteai-messages">
          <div class="quoteai-message bot">
            Hi! I can help you get an instant estimate. Just describe what you need.
          </div>
        </div>
        <div class="quoteai-input">
          <textarea 
            placeholder="Describe your project..."
            aria-label="Type your message"
            rows="1"
          ></textarea>
          <button type="button">Send</button>
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
  const textarea = widget.querySelector('textarea');
  const sendButton = widget.querySelector('.quoteai-input button');
  const messages = widget.querySelector('.quoteai-messages');

  // Chat session management
  let messageHistory = [];
  let chatId = null;

  // Load existing chat if it exists
  const savedChatId = localStorage.getItem(`chatId_${businessId}`);
  const savedMessages = localStorage.getItem(`chat_${businessId}`);

  if (savedChatId && savedMessages) {
    try {
      chatId = savedChatId;
      messageHistory = JSON.parse(savedMessages);
    } catch (e) {
      console.error('Failed to load saved chat:', e);
      localStorage.removeItem(`chat_${businessId}`);
      localStorage.removeItem(`chatId_${businessId}`);
    }
  }

  // Helper function to add message and scroll in one paint
  function addMessageToUI(content, isUser) {
    // Create message element but don't append yet
    const messageDiv = document.createElement('div');
    messageDiv.className = `quoteai-message ${isUser ? 'user' : 'bot'}`;
    messageDiv.textContent = content;

    // Use requestAnimationFrame to batch DOM operations
    requestAnimationFrame(() => {
      // Add message and scroll in the same frame
      messages.appendChild(messageDiv);
      messages.scrollTop = messages.scrollHeight;
    });

    return messageDiv;
  }

  // Save chat to localStorage and server
  async function saveChat() {
    try {
      const response = await fetch(`${apiUrl}/chats/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messageHistory,
          contact: contactInfo
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save chat');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error saving chat:', error);
      return null;
    }
  }

  // Helper function to show/hide typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'quoteai-typing';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
    return typingDiv;
  }

  // Send message
  async function sendMessage() {
    const message = textarea.value.trim();
    
    if (!message) return;
    
    textarea.value = '';
    adjustTextareaHeight();
    
    // Add user message to UI and history
    addMessageToUI(message, true);
    messageHistory.push({ role: 'user', content: message });
    
    const typingIndicator = showTypingIndicator();
    
    try {
      const response = await fetch(`${apiUrl}/quote/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          businessId: businessId,
          isPreview: false,
          chatId: chatId,
          messages: messageHistory
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate quote');
      }

      const data = await response.json();

      // Store chat ID if this is a new chat
      if (data.chatId) {
        chatId = data.chatId;
        localStorage.setItem(`chatId_${businessId}`, chatId);
      }

      // Remove typing indicator
      typingIndicator.remove();

      // Add bot message to UI and history
      addMessageToUI(data.message, false);
      messageHistory.push({ role: 'assistant', content: data.message });

      // Save chat history to localStorage
      localStorage.setItem(`chat_${businessId}`, JSON.stringify(messageHistory));
    } catch (error) {
      console.error('Failed to get response:', error);
      // Remove typing indicator
      typingIndicator.remove();
      
      const errorMessage = 'Sorry, I encountered an error. Please try again.';
      addMessageToUI(errorMessage, false);
      messageHistory.push({ role: 'assistant', content: errorMessage });
      localStorage.setItem(`chat_${businessId}`, JSON.stringify(messageHistory));
    }
  }

  // Auto-resize textarea
  function adjustTextareaHeight() {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }

  textarea.addEventListener('input', adjustTextareaHeight);

  // Handle mobile keyboard
  function handleMobileKeyboard() {
    if (window.innerWidth <= 768) {
      messages.scrollTop = messages.scrollHeight;
      // Delay to ensure keyboard is fully shown
      setTimeout(() => {
        messages.scrollTop = messages.scrollHeight;
      }, 100);
    }
  }

  textarea.addEventListener('focus', handleMobileKeyboard);

  // Toggle chat
  toggleButton.addEventListener('click', () => {
    chat.classList.add('open');
    if (window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    }
    
    // If no saved chat, show welcome message
    if (messageHistory.length === 0) {
      const messagesContainer = widget.querySelector('.quoteai-messages');
      messagesContainer.innerHTML = `
        <div class="quoteai-message bot">
          Hi! I can help you get an instant estimate. Just describe what you need.
        </div>
      `;
    }
    
    messages.scrollTop = messages.scrollHeight;
  });

  closeButton.addEventListener('click', () => {
    chat.classList.remove('open');
    if (window.innerWidth <= 768) {
      document.body.style.overflow = '';
    }
    // Complete chat when closing
    if (messageHistory.length > 0) {
      saveChat();
    }
  });

  sendButton.addEventListener('click', sendMessage);
  textarea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
})();