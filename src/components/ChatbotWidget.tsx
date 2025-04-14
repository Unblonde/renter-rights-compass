
import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import GovUkButton from './GovUkButton';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([
    {
      text: "Hello! I'm your Rental Rights Assistant. How can I help you today?",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { text: input, sender: 'user' }]);
    
    // Simulate bot response
    setTimeout(() => {
      let response = "I'm sorry, I don't have enough information to answer that question.";
      
      if (input.toLowerCase().includes('epc')) {
        response = "An Energy Performance Certificate (EPC) is required for all rental properties. Landlords must provide a valid EPC rated E or above to tenants before they move in.";
      } else if (input.toLowerCase().includes('gas') || input.toLowerCase().includes('safety')) {
        response = "Gas Safety Certificates must be renewed annually. Landlords must provide a copy to tenants within 28 days of the inspection.";
      } else if (input.toLowerCase().includes('deposit')) {
        response = "Landlords must protect deposits in a government-approved scheme within 30 days of receiving it and provide tenants with the deposit protection information.";
      } else if (input.toLowerCase().includes('repair') || input.toLowerCase().includes('fix')) {
        response = "Landlords are responsible for most repairs in your home, including the structure, heating, hot water, and sanitation. You should report repairs in writing and keep a copy.";
      } else if (input.toLowerCase().includes('evict') || input.toLowerCase().includes('notice')) {
        response = "Landlords must follow proper legal processes to evict tenants, usually requiring at least 2 months' notice via a Section 21 notice or a Section 8 notice for specific grounds.";
      }
      
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    }, 1000);
    
    setInput('');
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={toggleChatbot}
          className="fixed bottom-5 right-5 bg-govuk-blue text-govuk-white rounded-full p-3 shadow-lg hover:bg-govuk-darkblue focus:outline-none focus:ring-2 focus:ring-govuk-yellow"
          aria-label="Open chat assistant"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}
      
      {isOpen && (
        <div className="fixed bottom-5 right-5 w-80 md:w-96 bg-white shadow-lg rounded-md border border-govuk-midgrey flex flex-col max-h-[500px]">
          <div className="bg-govuk-blue text-govuk-white p-3 rounded-t-md flex justify-between items-center">
            <h3 className="font-bold">Rental Rights Assistant</h3>
            <button 
              onClick={toggleChatbot}
              className="text-govuk-white hover:text-govuk-lightgrey focus:outline-none focus:ring-2 focus:ring-govuk-yellow rounded-full"
              aria-label="Close chat assistant"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-3 min-h-[300px] max-h-[350px]">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`${
                  message.sender === 'user' 
                    ? 'bg-govuk-lightgrey ml-auto' 
                    : 'bg-govuk-blue text-govuk-white'
                } p-3 rounded-lg max-w-[80%] break-words`}
              >
                {message.text}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="border-t border-govuk-midgrey p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
              className="govuk-input flex-1 py-2 px-3"
              aria-label="Chat message"
            />
            <button 
              type="submit"
              className="bg-govuk-green text-govuk-white p-2 rounded hover:bg-govuk-darkblue focus:outline-none focus:ring-2 focus:ring-govuk-yellow"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
