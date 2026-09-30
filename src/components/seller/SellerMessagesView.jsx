import React, { useState } from 'react';
import { Send, User as UserIcon, CheckCheck } from 'lucide-react';

const SellerMessagesView = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [replyText, setReplyText] = useState('');
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      vehicle: '2023 Toyota RAV4 XLE',
      time: '10:45 AM',
      unread: 1,
      messages: [
        { sender: 'buyer', text: 'Hi, is this 2023 Toyota RAV4 still available for a test drive this Saturday?', time: '10:30 AM' },
        { sender: 'seller', text: 'Hello Alex! Yes, it is still available. What time works best for you?', time: '10:35 AM' },
        { sender: 'buyer', text: 'Around 2:00 PM would be perfect. Does it come with a clean title and CARFAX report?', time: '10:45 AM' }
      ]
    },
    {
      id: 2,
      name: 'David Smith',
      vehicle: '2022 Honda Accord EX',
      time: 'Yesterday',
      unread: 0,
      messages: [
        { sender: 'buyer', text: 'Is the price on the Honda Accord negotiable?', time: 'Yesterday' },
        { sender: 'seller', text: 'We offer competitive market pricing, but we can discuss a small courtesy discount on a cash deal.', time: 'Yesterday' }
      ]
    }
  ]);

  const currentChat = conversations.find(c => c.id === activeChat) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setConversations(conversations.map(conv => {
      if (conv.id === activeChat) {
        return {
          ...conv,
          messages: [
            ...conv.messages,
            { sender: 'seller', text: replyText.trim(), time: 'Just now' }
          ]
        };
      }
      return conv;
    }));

    setReplyText('');
  };

  return (
    <div className="bg-white rounded-3 border border-light shadow-sm overflow-hidden">
      <div className="row g-0">
        
        {/* Left: Chats List */}
        <div className="col-lg-4 border-end border-light">
          <div className="p-3 border-bottom border-light">
            <h6 className="fw-bold text-dark m-0">Conversations</h6>
            <small className="text-muted">Buyer messages and vehicle inquiries</small>
          </div>

          <div className="d-flex flex-column" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {conversations.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat.id)}
                className={`p-3 border-bottom border-light cursor-pointer transition-all ${activeChat === chat.id ? 'bg-light' : 'hover-bg-light'}`}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <strong className="text-dark small">{chat.name}</strong>
                  <span className="text-muted" style={{ fontSize: '10px' }}>{chat.time}</span>
                </div>
                <p className="text-muted small m-0 text-truncate" style={{ fontSize: '12px' }}>
                  {chat.vehicle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Message Thread */}
        <div className="col-lg-8 d-flex flex-column" style={{ minHeight: '480px' }}>
          
          {/* Thread Header */}
          <div className="p-3 border-bottom border-light d-flex justify-content-between align-items-center bg-light">
            <div>
              <strong className="text-dark d-block">{currentChat.name}</strong>
              <small className="text-muted">{currentChat.vehicle}</small>
            </div>
            <span className="badge bg-success bg-opacity-10 text-success small">Online</span>
          </div>

          {/* Messages Area */}
          <div className="p-4 flex-grow-1 d-flex flex-column gap-3 overflow-auto" style={{ maxHeight: '380px' }}>
            {currentChat.messages.map((msg, idx) => {
              const isSeller = msg.sender === 'seller';
              return (
                <div 
                  key={idx} 
                  className={`d-flex flex-column ${isSeller ? 'align-items-end' : 'align-items-start'}`}
                >
                  <div 
                    className={`p-3 rounded-3 small ${
                      isSeller 
                        ? 'bg-danger text-white' 
                        : 'bg-light text-dark border border-light'
                    }`}
                    style={{ maxWidth: '75%' }}
                  >
                    {msg.text}
                  </div>
                  <span className="text-muted mt-1" style={{ fontSize: '10px' }}>
                    {msg.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-top border-light bg-light d-flex gap-2">
            <input 
              type="text" 
              required
              className="form-control form-input-light" 
              placeholder="Type your reply to the buyer..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button type="submit" className="btn btn-brand-red px-3 d-flex align-items-center gap-1">
              <Send size={16} />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default SellerMessagesView;
