import React, { useState } from 'react';
import BuyerSidebar from '../../components/buyer/BuyerSidebar';
import BuyerHeader from '../../components/buyer/BuyerHeader';
import { MessageSquare, Send, Search, CheckCheck } from 'lucide-react';

/**
 * BuyerMessages Page
 * Renders buyer messaging with dealership staff and private sellers.
 */
const BuyerMessages = () => {
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [activeChat, setActiveChat] = useState(0);
  const [inputText, setInputText] = useState('');

  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Summit Auto Group (Official)',
      car: '2023 Toyota RAV4 XLE',
      avatar: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=100&q=80',
      messages: [
        { sender: 'seller', text: 'Hello! Thank you for inquiring about the 2023 Toyota RAV4 XLE. It is available for test driving today.', time: '10:30 AM' },
        { sender: 'buyer', text: 'Great! Is the clean CARFAX report available?', time: '10:35 AM' },
        { sender: 'seller', text: 'Yes, it is a single-owner certified vehicle with complete service records. Would you like to schedule a viewing?', time: '10:38 AM' }
      ]
    },
    {
      id: 2,
      name: 'Metro Honda Dealership',
      car: '2022 Honda Accord EX',
      avatar: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=100&q=80',
      messages: [
        { sender: 'seller', text: 'We have received your reservation hold on the Honda Accord.', time: 'Yesterday' }
      ]
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      sender: 'buyer',
      text: inputText,
      time: 'Just now'
    };

    setChats(prev => prev.map((c, idx) => {
      if (idx === activeChat) {
        return {
          ...c,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));

    setInputText('');
  };

  const current = chats[activeChat];

  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      <BuyerSidebar />
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        <BuyerHeader 
          title="Messages & Inquiries" 
          subtitle="Communicate directly with vehicle sellers and dealerships"
          user={user}
          showUpgrade={false}
        />

        <div className="bg-white rounded-3 border border-light shadow-sm overflow-hidden row g-0" style={{ height: '620px' }}>
          {/* Chat List */}
          <div className="col-md-4 border-end border-light d-flex flex-column h-100">
            <div className="p-3 border-bottom border-light">
              <div className="position-relative">
                <Search size={15} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input 
                  type="text" 
                  className="form-control form-control-sm ps-5 bg-light border-light" 
                  placeholder="Search conversations..." 
                />
              </div>
            </div>

            <div className="overflow-y-auto flex-grow-1">
              {chats.map((chat, idx) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(idx)}
                  className={`p-3 border-bottom border-light cursor-pointer transition-all d-flex gap-3 align-items-center ${activeChat === idx ? 'bg-light' : 'hover-bg-light'}`}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={chat.avatar} alt="avatar" className="rounded-circle object-fit-cover" style={{ width: '44px', height: '44px' }} />
                  <div className="flex-grow-1 overflow-hidden">
                    <h6 className="fw-bold text-dark m-0 small text-truncate">{chat.name}</h6>
                    <small className="text-muted d-block text-truncate" style={{ fontSize: '11px' }}>{chat.car}</small>
                    <small className="text-secondary d-block text-truncate" style={{ fontSize: '11px' }}>
                      {chat.messages[chat.messages.length - 1]?.text}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Conversation Window */}
          <div className="col-md-8 d-flex flex-column h-100">
            {/* Window Header */}
            <div className="p-3 border-bottom border-light d-flex align-items-center gap-3 bg-light bg-opacity-50">
              <img src={current.avatar} alt="avatar" className="rounded-circle object-fit-cover" style={{ width: '40px', height: '40px' }} />
              <div>
                <h6 className="fw-bold text-dark m-0 small">{current.name}</h6>
                <small className="text-danger fw-semibold" style={{ fontSize: '11px' }}>Regarding: {current.car}</small>
              </div>
            </div>

            {/* Messages Body */}
            <div className="p-4 overflow-y-auto flex-grow-1 d-flex flex-column gap-3 bg-light bg-opacity-25">
              {current.messages.map((msg, idx) => {
                const isBuyer = msg.sender === 'buyer';
                return (
                  <div 
                    key={idx} 
                    className={`d-flex flex-column ${isBuyer ? 'align-items-end' : 'align-items-start'}`}
                  >
                    <div 
                      className={`p-3 rounded-3 max-w-75 shadow-xs ${isBuyer ? 'bg-danger text-white' : 'bg-white text-dark border border-light'}`}
                      style={{ maxWidth: '75%', fontSize: '13px' }}
                    >
                      {msg.text}
                    </div>
                    <small className="text-muted mt-1 px-1" style={{ fontSize: '10px' }}>
                      {msg.time}
                    </small>
                  </div>
                );
              })}
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="p-3 border-top border-light d-flex gap-2 bg-white">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message to seller..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="btn btn-brand-red px-3 d-flex align-items-center gap-1">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuyerMessages;
