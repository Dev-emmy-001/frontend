import React, { useState, useEffect } from 'react';
import BuyerSidebar from '../../components/buyer/BuyerSidebar';
import BuyerHeader from '../../components/buyer/BuyerHeader';
import { MessageSquare, Send, Search, CheckCheck, ShoppingBag } from 'lucide-react';
import { getLocalConversations } from '../../services/orderService';

/**
 * BuyerMessages Page
 * Renders buyer messaging with dealership staff and private sellers,
 * displaying automated purchase notifications and direct chat replies.
 */
const BuyerMessages = () => {
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [activeChat, setActiveChat] = useState(0);
  const [inputText, setInputText] = useState('');
  const [chats, setChats] = useState([]);

  const loadChats = () => {
    const raw = getLocalConversations();
    // Normalize chats for buyer view
    const formatted = raw.map(c => ({
      id: c.id,
      name: c.sellerName || 'Summit Auto Group (Official)',
      car: c.vehicle || '2023 Toyota RAV4 XLE',
      avatar: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=100&q=80',
      messages: c.messages || []
    }));
    setChats(formatted);
  };

  useEffect(() => {
    loadChats();

    const handleUpdate = () => loadChats();
    window.addEventListener('motors_message_received', handleUpdate);
    window.addEventListener('motors_order_placed', handleUpdate);

    return () => {
      window.removeEventListener('motors_message_received', handleUpdate);
      window.removeEventListener('motors_order_placed', handleUpdate);
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !chats[activeChat]) return;

    const newMsg = {
      sender: 'buyer',
      text: inputText.trim(),
      time: 'Just now'
    };

    const updated = chats.map((c, idx) => {
      if (idx === activeChat) {
        return {
          ...c,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    });

    setChats(updated);
    localStorage.setItem('motors_conversations', JSON.stringify(updated));
    setInputText('');
  };

  const current = chats[activeChat] || {
    name: 'Customer Support',
    car: 'Inquiries',
    avatar: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=100&q=80',
    messages: []
  };

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
                  key={chat.id || idx}
                  onClick={() => setActiveChat(idx)}
                  className={`p-3 border-bottom border-light cursor-pointer transition-all d-flex gap-3 align-items-center ${activeChat === idx ? 'bg-light border-start border-danger border-3' : 'hover-bg-light'}`}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={chat.avatar} alt="avatar" className="rounded-circle object-fit-cover shadow-xs border" style={{ width: '44px', height: '44px' }} />
                  <div className="flex-grow-1 overflow-hidden">
                    <h6 className="fw-bold text-dark m-0 small text-truncate">{chat.name}</h6>
                    <small className="text-danger fw-semibold d-block text-truncate" style={{ fontSize: '11px' }}>{chat.car}</small>
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
              <img src={current.avatar} alt="avatar" className="rounded-circle object-fit-cover shadow-xs border" style={{ width: '40px', height: '40px' }} />
              <div>
                <h6 className="fw-bold text-dark m-0 small">{current.name}</h6>
                <small className="text-danger fw-semibold" style={{ fontSize: '11px' }}>Regarding: {current.car}</small>
              </div>
            </div>

            {/* Messages Body */}
            <div className="p-4 overflow-y-auto flex-grow-1 d-flex flex-column gap-3 bg-light bg-opacity-25">
              {current.messages.map((msg, idx) => {
                const isBuyer = msg.sender === 'buyer';
                const isOrderNotice = msg.isOrderAlert || msg.text?.includes('Car Purchased');

                return (
                  <div 
                    key={idx} 
                    className={`d-flex flex-column ${isBuyer ? 'align-items-end' : 'align-items-start'}`}
                  >
                    {isOrderNotice && (
                      <div className="d-flex align-items-center gap-1.5 text-success small fw-bold mb-1">
                        <ShoppingBag size={14} />
                        <span style={{ fontSize: '11px' }}>Order Placement Confirmation</span>
                      </div>
                    )}

                    <div 
                      className={`p-3 rounded-3 max-w-75 shadow-xs ${
                        isOrderNotice 
                          ? 'bg-success bg-opacity-10 text-dark border border-success border-opacity-25' 
                          : isBuyer 
                          ? 'btn-brand-red text-white' 
                          : 'bg-white text-dark border border-light'
                      }`}
                      style={{ maxWidth: '78%', fontSize: '13px', lineHeight: '1.4' }}
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
