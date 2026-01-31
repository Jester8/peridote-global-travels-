"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Plane, Building, Car, MapPin, Calendar, Users, DollarSign, HelpCircle, Globe, Shield, Clock } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Peridote Travel Assistant. How can I help you with your travel plans today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Common travel questions
  const quickQuestions = [
    "Book a flight",
    "Find hotels",
    "Rent a car",
    "Travel packages",
    "Visa requirements",
    "Travel insurance",
    "Flight status",
    "Customer support"
  ];

  // Travel knowledge base
  const travelKnowledge = {
    greetings: [
      "Hi there!",
      "Hello! Welcome to Peridote Global Travels.",
      "Hey! Ready to plan your next adventure?",
      "Greetings! How can I assist with your travel needs today?"
    ],
    
    booking: {
      flights: "We offer flights to over 200 destinations worldwide. To book a flight, you'll need: departure city, destination, travel dates, number of passengers, and preferred class (Economy, Premium, Business, or First Class).",
      hotels: "We partner with 500,000+ hotels globally. For hotel booking, I need: destination, check-in/check-out dates, number of guests, and preferred hotel type (Budget, 3-star, 4-star, 5-star, or Luxury).",
      cars: "Car rentals available at all major airports and cities. Requirements: pickup location, dates, car type (Economy, SUV, Luxury), and driver details.",
      packages: "We offer curated travel packages including flights + hotels, all-inclusive resorts, adventure tours, and honeymoon packages."
    },
    
    services: {
      flights: "• Domestic & International flights\n• Multi-city itineraries\n• Round trip & One-way tickets\n• Group bookings\n• Last-minute deals\n• Business class upgrades",
      hotels: "• Hotels, resorts, villas\n• All-inclusive stays\n• Extended stays\n• Pet-friendly options\n• Beachfront properties\n• City center locations",
      cars: "• Economy to Luxury cars\n• SUVs & Minivans\n• Long-term rentals\n• Insurance included\n• One-way rentals\n• 24/7 roadside assistance",
      insurance: "• Trip cancellation\n• Medical coverage\n• Baggage protection\n• Flight delay\n• 24/7 emergency support\n• COVID-19 coverage available"
    },
    
    policies: {
      cancellation: "Flight cancellations: 24-hour free cancellation on most bookings. Hotel cancellations: Free until 48 hours before check-in. Car rentals: Free cancellation up to 24 hours before pickup.",
      refund: "Refunds processed within 7-14 business days. Processing time may vary based on payment method and airline/hotel policies.",
      baggage: "Standard baggage allowance: Economy (1x23kg), Premium (2x23kg), Business (2x32kg). Additional baggage can be purchased during booking.",
      checkin: "Online check-in opens 24 hours before departure. Airport check-in counters open 3 hours before international flights and 2 hours before domestic flights."
    },
    
    support: {
      contact: "📞 24/7 Support: +1-800-PERIDOTE\n✉️ Email: support@peridotetravels.com\n📍 Live Chat: Available on our website\n🕒 Business Hours: 24/7",
      emergency: "For travel emergencies:\n• Flight disruptions: Contact airline directly\n• Medical emergencies: Use travel insurance hotline\n• Lost documents: Contact local embassy",
      feedback: "We value your feedback! Share your experience at feedback@peridotetravels.com for a chance to win travel credits."
    },
    
    destinations: {
      popular: "🌍 Top Destinations:\n• Europe: Paris, Rome, London\n• Asia: Tokyo, Bangkok, Bali\n• Americas: New York, Cancun, Rio\n• Africa: Cape Town, Marrakech, Mauritius\n• Middle East: Dubai, Istanbul, Doha",
      visas: "Visa requirements vary by destination and nationality. Most popular tourist destinations offer visa-on-arrival or e-visa options for many passports.",
      besttime: "• Europe: May-Sep\n• Caribbean: Dec-Apr\n• Southeast Asia: Nov-Feb\n• Australia: Sep-Nov\n• Ski destinations: Dec-Mar"
    },
    
    deals: {
      current: "🔥 Current Offers:\n• Early bird flights: Save up to 30%\n• Hotel deals: 4th night free\n• Package deals: Flight + Hotel from $599\n• Group discounts: 10% off for 4+ travelers\n• Last minute: Up to 50% off",
      loyalty: "Join our loyalty program:\n• Earn points on every booking\n• Tier benefits: Silver, Gold, Platinum\n• Exclusive member deals\n• Priority support\n• Free upgrades"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const getRandomGreeting = () => {
    const greetings = travelKnowledge.greetings;
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  const analyzeQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Greetings
    if (/^(hi|hello|hey|good morning|good afternoon)/.test(lowerQuery)) {
      return { type: 'greeting', response: getRandomGreeting() };
    }
    
    // Flights
    if (/(flight|fly|airplane|ticket|airfare)/.test(lowerQuery)) {
      if (/book|reserve|buy/.test(lowerQuery)) {
        return { type: 'booking', service: 'flights', response: travelKnowledge.booking.flights };
      }
      if (/service|offer|what.*flight/.test(lowerQuery)) {
        return { type: 'services', service: 'flights', response: travelKnowledge.services.flights };
      }
      return { type: 'general', response: "I can help you with flight bookings, check available services, or answer questions about flight policies. What specifically would you like to know?" };
    }
    
    // Hotels
    if (/(hotel|accommodation|stay|lodge|resort)/.test(lowerQuery)) {
      if (/book|reserve/.test(lowerQuery)) {
        return { type: 'booking', service: 'hotels', response: travelKnowledge.booking.hotels };
      }
      return { type: 'services', service: 'hotels', response: travelKnowledge.services.hotels };
    }
    
    // Cars
    if (/(car|vehicle|rental|drive)/.test(lowerQuery)) {
      if (/book|rent|reserve/.test(lowerQuery)) {
        return { type: 'booking', service: 'cars', response: travelKnowledge.booking.cars };
      }
      return { type: 'services', service: 'cars', response: travelKnowledge.services.cars };
    }
    
    // Insurance
    if (/(insurance|cover|protection)/.test(lowerQuery)) {
      return { type: 'services', service: 'insurance', response: travelKnowledge.services.insurance };
    }
    
    // Policies
    if (/(cancel|cancellation|refund|policy)/.test(lowerQuery)) {
      if (/cancel/.test(lowerQuery)) {
        return { type: 'policies', policy: 'cancellation', response: travelKnowledge.policies.cancellation };
      }
      if (/refund/.test(lowerQuery)) {
        return { type: 'policies', policy: 'refund', response: travelKnowledge.policies.refund };
      }
      return { type: 'policies', response: "We have policies for cancellation, refunds, baggage, and check-in. Which one would you like to know about?" };
    }
    
    // Support
    if (/(contact|support|help|emergency|phone|email)/.test(lowerQuery)) {
      if (/emergency/.test(lowerQuery)) {
        return { type: 'support', issue: 'emergency', response: travelKnowledge.support.emergency };
      }
      return { type: 'support', response: travelKnowledge.support.contact };
    }
    
    // Destinations
    if (/(destination|place|where|visit|travel to)/.test(lowerQuery)) {
      if (/popular|best|top/.test(lowerQuery)) {
        return { type: 'destinations', info: 'popular', response: travelKnowledge.destinations.popular };
      }
      if (/visa|document|passport/.test(lowerQuery)) {
        return { type: 'destinations', info: 'visas', response: travelKnowledge.destinations.visas };
      }
      return { type: 'destinations', response: travelKnowledge.destinations.popular };
    }
    
    // Deals
    if (/(deal|offer|discount|promotion|save|cheap)/.test(lowerQuery)) {
      return { type: 'deals', response: travelKnowledge.deals.current };
    }
    
    // Packages
    if (/(package|tour|itinerary|vacation)/.test(lowerQuery)) {
      return { type: 'booking', service: 'packages', response: travelKnowledge.booking.packages };
    }
    
    // Baggage
    if (/(baggage|luggage|bag|weight limit)/.test(lowerQuery)) {
      return { type: 'policies', policy: 'baggage', response: travelKnowledge.policies.baggage };
    }
    
    // Check-in
    if (/(check.?in|boarding|airport)/.test(lowerQuery)) {
      return { type: 'policies', policy: 'checkin', response: travelKnowledge.policies.checkin };
    }
    
    // Loyalty program
    if (/(loyalty|reward|point|member)/.test(lowerQuery)) {
      return { type: 'deals', info: 'loyalty', response: travelKnowledge.deals.loyalty };
    }
    
    // Default response for unknown queries
    return {
      type: 'unknown',
      response: "I'm here to help with all your travel needs! You can ask me about:\n\n• Flight bookings & services\n• Hotel reservations\n• Car rentals\n• Travel packages\n• Visa requirements\n• Travel insurance\n• Cancellation policies\n• Current deals & offers\n• Customer support\n\nWhat would you like to know?"
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      const analysis = analyzeQuery(inputText);
      
      const botMessage = {
        id: messages.length + 2,
        text: analysis.response,
        sender: 'bot',
        timestamp: new Date(),
        type: analysis.type,
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question) => {
    setInputText(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'booking':
        return <Calendar size={16} className="text-cyan-500" />;
      case 'services':
        return <Globe size={16} className="text-green-500" />;
      case 'policies':
        return <Shield size={16} className="text-blue-500" />;
      case 'support':
        return <HelpCircle size={16} className="text-red-500" />;
      case 'destinations':
        return <MapPin size={16} className="text-purple-500" />;
      case 'deals':
        return <DollarSign size={16} className="text-yellow-500" />;
      default:
        return <MessageCircle size={16} className="text-gray-500" />;
    }
  };

  return (
    <>
      {/* Chat Button - Adjusted position for mobile/desktop */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group md:bottom-8 md:right-8"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          💬
        </span>
      </button>

      {/* Chat Window - Responsive positioning */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-32 md:right-6 z-50 w-full md:w-96 max-h-screen md:max-h-[500px] flex flex-col bg-white md:rounded-xl shadow-2xl md:border md:border-gray-200 animate-fade-in">
          {/* Mobile Header with Close at top-right */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 flex items-center justify-between md:rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <MessageCircle size={20} className="text-cyan-500" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Peridote Travel Assistant</h3>
                <p className="text-cyan-100 text-xs">Ask me anything about travel</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-cyan-100 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Questions - Hidden on mobile, shown on desktop */}
          <div className="hidden md:block p-3 bg-gray-50 border-b border-gray-200">
            <p className="text-xs text-gray-600 mb-2 font-medium">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-xs text-gray-700 hover:bg-cyan-50 hover:border-cyan-300 hover:text-cyan-700 transition-all duration-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages - Responsive height */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-white to-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-cyan-500 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <div className="flex items-center gap-2 mb-1">
                        {getIconForType(message.type)}
                        <span className="text-xs font-medium text-gray-500">Travel Assistant</span>
                        <span className="text-xs text-gray-400">• {formatTime(message.timestamp)}</span>
                      </div>
                    )}
                    <div className="whitespace-pre-line text-sm">{message.text}</div>
                    {message.sender === 'user' && (
                      <div className="text-right mt-1">
                        <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 border border-gray-200">
                    <div className="flex items-center gap-2">
                      <MessageCircle size={14} className="text-gray-500" />
                      <span className="text-xs font-medium text-gray-500">Travel Assistant is typing</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            {/* Quick Questions for Mobile - Above input */}
            <div className="md:hidden mb-3">
              <p className="text-xs text-gray-600 mb-2 font-medium">Quick questions:</p>
              <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-xs text-gray-700 hover:bg-cyan-50 hover:border-cyan-300 hover:text-cyan-700 transition-all duration-200 whitespace-nowrap flex-shrink-0"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about flights, hotels, cars, policies..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  inputText.trim() && !isTyping
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Ask about bookings, policies, destinations, or support
            </p>
          </div>
        </div>
      )}

      {/* Overlay for mobile when chatbot is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        /* Custom scrollbar */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Chatbot;