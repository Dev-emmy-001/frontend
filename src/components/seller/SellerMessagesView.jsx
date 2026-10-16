import React, { useState, useEffect } from 'react';
import { Send, User as UserIcon, CheckCheck, ShoppingBag, Bell, Sparkles } from 'lucide-react';
import { getLocalConversations } from '../../services/orderService';

/**
 * SellerMessagesView Component
 * Renders buyer inquiries, negotiation threads, and automated vehicle purchase notifications.
 */
const SellerMessagesView = () => {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Load conversations and attach real-time event listeners
  const loadConversations = () => {
    const data = getLocalConversations();
    setConversations(data);
    if (data.length > 0 && !activeChat) {
      setActiveChat(data[0].id);
    }
  };

  useEffect(() => {
    loadConversations();

    const handleMessageEvent = () => {
      loadConversations();
    };

    window.addEventListener('motors_message_received', handleMessageEvent);
    window.addEventListener('motors_order_placed', handleMessageEvent);

    return () => {
      window.removeEventListener('motors_message_received', handleMessageEvent);
      window.removeEventListener('motors_order_placed', handleMessageEvent);
    };
  }, []);

  const currentChat = conversations.find(c => c.id === activeChat) || conversations[0] || {
    name: 'Customer Support',
    vehicle: 'Platform Inquiries',
    messages: []
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeChat) return;

    const newReply = {
      sender: 'seller',
      text: replyText.trim(),
      time: 'Just now'
    };

    const updated = conversations.map(conv => {
      if (conv.id === activeChat) {
        return {
          ...conv,
          unread: 0,
          messages: [...(conv.messages || []), newReply]
        };
      }
      return conv;
    });

    setConversations(updated);
    localStorage.setItem('motors_conversations', JSON.stringify(updated));
    setReplyText('');
  };

  return (
    <div className="bg-white rounded-3 border border-light shadow-sm overflow-hidden font-sans">
      <div className="row g-0">
        
        {/* Left: Chats List */}
        <div className="col-lg-4 border-end border-light">
          <div className="p-3 border-bottom border-light d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold text-dark m-0">Conversations & Direct Alerts</h6>
              <small className="text-muted">Buyer messages and vehicle order notifications</small>
            </div>
            <span className="badge bg-danger bg-opacity-10 text-danger small">
              {conversations.length} Active
            </span>
          </div>

          <div className="d-flex flex-column" style={{ maxHeight: '520px', overflowY: 'auto' }}>
            {conversations.length === 0 ? (
              <div className="p-4 text-center text-muted small">
                No active conversations or inquiries yet.
              </div>
            ) : (
              conversations.map(chat => {
                const isSelected = activeChat === chat.id;
                const lastMsg = chat.messages?.[chat.messages.length - 1];
                const hasOrderAlert = chat.messages?.some(m => m.isOrderAlert || m.text?.includes('Car Purchased'));

                return (
                  <div 
                    key={chat.id} 
                    onClick={() => setActiveChat(chat.id)}
                    className={`p-3 border-bottom border-light cursor-pointer transition-all ${
                      isSelected ? 'bg-light border-start border-danger border-3' : 'hover-bg-light'
                    }`}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div className="d-flex align-items-center gap-1.5 overflow-hidden">
                        <strong className="text-dark small text-truncate">{chat.name}</strong>
                        {hasOrderAlert && (
                          <span className="badge bg-success bg-opacity-10 text-success fw-bold d-inline-flex align-items-center gap-0.5" style={{ fontSize: '9px' }}>
                            <ShoppingBag size={10} /> Car Purchased
                          </span>
                        )}
                      </div>
                      <span className="text-muted" style={{ fontSize: '10px' }}>{chat.time}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <p className="text-danger fw-semibold small m-0 text-truncate" style={{ fontSize: '11px' }}>
                        {chat.vehicle}
                      </p>
                      {chat.unread > 0 && (
                        <span className="badge rounded-pill bg-danger" style={{ fontSize: '9px' }}>
                          {chat.unread}
                        </span>
                      )}
                    </div>

                    {lastMsg && (
                      <p className="text-muted small m-0 text-truncate mt-1" style={{ fontSize: '11px' }}>
                        {lastMsg.text}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Active Message Thread */}
        <div className="col-lg-8 d-flex flex-column" style={{ minHeight: '520px' }}>
          
          {/* Thread Header */}
          <div className="p-3 border-bottom border-light d-flex justify-content-between align-items-center bg-light">
            <div>
              <div className="d-flex align-items-center gap-2">
                <strong className="text-dark d-block">{currentChat.name}</strong>
                {currentChat.buyerPhone && (
                  <small className="badge bg-light text-secondary border" style={{ fontSize: '10px' }}>
                    {currentChat.buyerPhone}
                  </small>
                )}
              </div>
              <small className="text-danger fw-semibold">{currentChat.vehicle}</small>
            </div>
            <span className="badge bg-success bg-opacity-10 text-success small">Online</span>
          </div>

          {/* Messages Area */}
          <div className="p-4 flex-grow-1 d-flex flex-column gap-3 overflow-auto" style={{ maxHeight: '400px' }}>
            {(currentChat.messages || []).map((msg, idx) => {
              const isSeller = msg.sender === 'seller';
              const isOrderNotice = msg.isOrderAlert || msg.text?.includes('Car Purchased');

              return (
                <div 
                  key={idx} 
                  className={`d-flex flex-column ${isSeller ? 'align-items-end' : 'align-items-start'}`}
                >
                  {isOrderNotice && (
                    <div className="d-flex align-items-center gap-1.5 text-success small fw-bold mb-1">
                      <ShoppingBag size={14} />
                      <span style={{ fontSize: '11px' }}>Official Platform Purchase Alert</span>
                    </div>
                  )}

                  <div 
                    className={`p-3 rounded-3 small ${
                      isOrderNotice
                        ? 'bg-success bg-opacity-10 text-dark border border-success border-opacity-25'
                        : isSeller 
                        ? 'btn-brand-red text-white' 
                        : 'bg-light text-dark border border-light'
                    }`}
                    style={{ maxWidth: '82%', fontSize: '13px', lineHeight: '1.4' }}
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
              placeholder={`Reply directly to ${currentChat.name}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button type="submit" className="btn btn-brand-red px-4 d-flex align-items-center gap-1.5 fw-bold text-uppercase" style={{ fontSize: '12px' }}>
              <Send size={15} />
              <span>Send Reply</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default SellerMessagesView;
