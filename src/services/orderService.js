import api from '../data/apiConfig';

const ORDERS_STORAGE_KEY = 'motors_orders';
const MESSAGES_STORAGE_KEY = 'motors_conversations';

/**
 * Initial fallback orders for demo presentation
 */
const DEFAULT_BUYER_ORDERS = [
  {
    id: 'ORD-1025',
    vehicleId: '1',
    vehicleName: '2023 Toyota RAV4 XLE',
    vin: '4T3B1RFV5NU098124',
    date: 'May 14, 2026',
    price: 26490,
    status: 'Completed',
    paymentMethod: 'Credit/Debit Card',
    deliveryType: 'Home Delivery',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80',
    sellerName: 'Summit Auto Group (Official)'
  },
  {
    id: 'ORD-1024',
    vehicleId: '2',
    vehicleName: '2022 Honda Accord EX',
    vin: '1HGCV1F32NA112984',
    date: 'Apr 28, 2026',
    price: 24990,
    status: 'Processing',
    paymentMethod: 'Bank Transfer',
    deliveryType: 'Dealership Pickup',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80',
    sellerName: 'Metro Honda Dealership'
  }
];

/**
 * Initial conversations for seller messaging
 */
const DEFAULT_SELLER_CONVERSATIONS = [
  {
    id: 'conv-1',
    name: 'Alex Johnson',
    buyerEmail: 'alex.j@example.com',
    buyerPhone: '(555) 234-5678',
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
    id: 'conv-2',
    name: 'David Smith',
    buyerEmail: 'david.smith@example.com',
    buyerPhone: '(555) 876-5432',
    vehicle: '2022 Honda Accord EX',
    time: 'Yesterday',
    unread: 0,
    messages: [
      { sender: 'buyer', text: 'Is the price on the Honda Accord negotiable?', time: 'Yesterday' },
      { sender: 'seller', text: 'We offer competitive market pricing, but we can discuss a small courtesy discount on a cash deal.', time: 'Yesterday' }
    ]
  }
];

/**
 * Helper to get local stored orders
 */
export const getLocalOrders = () => {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error parsing local orders:', e);
    return [];
  }
};

/**
 * Helper to save an order to local storage
 */
export const saveLocalOrder = (order) => {
  try {
    const existing = getLocalOrders();
    const updated = [order, ...existing.filter(o => o.id !== order.id && o._id !== order._id)];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom event for real-time listener updates
    window.dispatchEvent(new CustomEvent('motors_order_placed', { detail: order }));
    return updated;
  } catch (e) {
    console.error('Error saving local order:', e);
    return [];
  }
};

/**
 * Helper to get local seller/buyer conversations
 */
export const getLocalConversations = () => {
  try {
    const raw = localStorage.getItem(MESSAGES_STORAGE_KEY);
    if (!raw) return DEFAULT_SELLER_CONVERSATIONS;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error parsing local conversations:', e);
    return DEFAULT_SELLER_CONVERSATIONS;
  }
};

/**
 * Helper to save a direct message conversation
 */
export const notifySellerDirectMessage = ({
  orderId,
  buyerName,
  buyerEmail,
  buyerPhone,
  vehicleName,
  totalAmount,
  paymentMethod,
  sellerName = 'Summit Auto Group (Official)'
}) => {
  try {
    const conversations = getLocalConversations();
    const purchaseMessageText = `🚗 Car Purchased! Buyer ${buyerName} has completed checkout for your ${vehicleName} (Order #${orderId}) for $${Number(totalAmount).toLocaleString()}. Payment Method: ${paymentMethod}. Please review and prepare vehicle handover.`;

    // Check if conversation for this buyer and vehicle already exists
    const existingIndex = conversations.findIndex(c => 
      c.vehicle?.toLowerCase() === vehicleName.toLowerCase() ||
      c.name?.toLowerCase() === buyerName.toLowerCase()
    );

    const newMsgObj = {
      sender: 'buyer',
      text: purchaseMessageText,
      time: 'Just now',
      isOrderAlert: true,
      orderId
    };

    let updatedConversations;
    if (existingIndex >= 0) {
      const target = conversations[existingIndex];
      const updatedTarget = {
        ...target,
        vehicle: vehicleName,
        time: 'Just now',
        unread: (target.unread || 0) + 1,
        messages: [...(target.messages || []), newMsgObj]
      };
      updatedConversations = [
        updatedTarget,
        ...conversations.filter((_, idx) => idx !== existingIndex)
      ];
    } else {
      const newThread = {
        id: `conv-${Date.now()}`,
        name: buyerName,
        buyerEmail: buyerEmail || 'buyer@example.com',
        buyerPhone: buyerPhone || '(555) 000-1234',
        vehicle: vehicleName,
        time: 'Just now',
        unread: 1,
        messages: [newMsgObj]
      };
      updatedConversations = [newThread, ...conversations];
    }

    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updatedConversations));
    window.dispatchEvent(new CustomEvent('motors_message_received', { detail: newMsgObj }));
    return updatedConversations;
  } catch (err) {
    console.error('Error creating seller direct message:', err);
    return null;
  }
};

/**
 * Places a complete vehicle order:
 * 1. Sends payload to backend /api/orders
 * 2. Persists order in buyer's local orders list
 * 3. Sends an automated direct message to notify the seller
 */
export const placeOrder = async ({
  vehicle,
  pricing,
  paymentMethod = 'Credit/Debit Card',
  cardDetails = {},
  deliveryType = 'Home Delivery'
}) => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const generatedId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const vehicleName = `${vehicle.year || 2024} ${vehicle.make || 'Toyota'} ${vehicle.model || 'Vehicle'}`;
  const totalAmount = pricing?.grandTotal || vehicle.price || 26490;

  // Normalized order object for UI consumption
  const orderRecord = {
    id: generatedId,
    orderId: generatedId,
    vehicleId: vehicle._id || vehicle.id || '1',
    vehicleName: vehicleName,
    vin: vehicle.vin || `1HGCV${Math.floor(100000 + Math.random() * 900000)}`,
    date: now,
    price: totalAmount,
    amount: pricing?.subtotal || vehicle.price || totalAmount,
    tax: pricing?.taxAmount || 0,
    processingFee: pricing?.processingFee || 200,
    status: 'Processing',
    paymentMethod: paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'bank' ? 'Bank Transfer' : 'PayPal',
    deliveryType: deliveryType,
    image: (vehicle.images && vehicle.images[0]) || 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80',
    buyerName: user.fullName || cardDetails.cardholderName || 'Platform Buyer',
    buyerEmail: user.email || 'buyer@example.com',
    buyerPhone: user.phone || '(555) 123-4567',
    sellerName: vehicle.seller?.name || 'Summit Auto Group (Official)',
    sellerEmail: vehicle.seller?.email || 'sales@summitautogroup.com',
    isNewOrder: true // Badge indicator for UI
  };

  // 1. Save locally to guarantee immediate visibility on buyer orders page
  saveLocalOrder(orderRecord);

  // 2. Notify the seller by creating a direct message
  notifySellerDirectMessage({
    orderId: orderRecord.id,
    buyerName: orderRecord.buyerName,
    buyerEmail: orderRecord.buyerEmail,
    buyerPhone: orderRecord.buyerPhone,
    vehicleName: orderRecord.vehicleName,
    totalAmount: orderRecord.price,
    paymentMethod: orderRecord.paymentMethod,
    sellerName: orderRecord.sellerName
  });

  // 3. Post to backend API
  try {
    const payload = {
      vehicleId: orderRecord.vehicleId,
      vehicleName: orderRecord.vehicleName,
      amount: pricing?.subtotal || vehicle.price,
      tax: pricing?.taxAmount || 0,
      processingFee: pricing?.processingFee || 200,
      totalAmount: totalAmount,
      paymentMethod: orderRecord.paymentMethod,
      deliveryType: deliveryType,
      buyerDetails: {
        fullName: orderRecord.buyerName,
        email: orderRecord.buyerEmail,
        phone: orderRecord.buyerPhone
      },
      sellerDetails: {
        name: orderRecord.sellerName,
        email: orderRecord.sellerEmail
      },
      vehicleDetails: {
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        image: orderRecord.image,
        vin: orderRecord.vin,
        price: vehicle.price
      }
    };

    const res = await api.post('/orders', payload);
    if (res.data && res.data.order) {
      orderRecord._id = res.data.order._id;
      if (res.data.order.orderId) orderRecord.id = res.data.order.orderId;
    }
  } catch (apiErr) {
    // API backend fallback logged gracefully; local storage guarantees UI continuity
    console.warn('Backend API order sync note: saved order locally.', apiErr.message);
  }

  return orderRecord;
};

/**
 * Fetch all buyer orders (combining backend + local storage + sample defaults)
 */
export const getBuyerOrders = async () => {
  const localOrders = getLocalOrders();
  let backendOrders = [];

  try {
    const res = await api.get('/orders/buyer');
    if (res.data && res.data.orders) {
      backendOrders = res.data.orders.map(o => ({
        id: o.orderId || `ORD-${o._id.toString().slice(-4)}`,
        vehicleId: o.vehicleId?._id || o.vehicleId || '1',
        vehicleName: o.vehicleDetails?.make 
          ? `${o.vehicleDetails.year} ${o.vehicleDetails.make} ${o.vehicleDetails.model}` 
          : 'Vehicle Order',
        vin: o.vehicleDetails?.vin || 'VIN-UNAVAILABLE',
        date: new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        price: o.totalAmount || o.amount || 0,
        status: o.status || 'Processing',
        paymentMethod: o.paymentMethod || 'Credit/Debit Card',
        deliveryType: o.deliveryType || 'Home Delivery',
        image: o.vehicleDetails?.image || 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80',
        sellerName: o.sellerDetails?.name || 'Summit Auto Group (Official)'
      }));
    }
  } catch (err) {
    // Backend offline or running in mock mode
  }

  // Deduplicate and merge: local orders take precedence for instant updates
  const seenIds = new Set();
  const merged = [];

  [...localOrders, ...backendOrders, ...DEFAULT_BUYER_ORDERS].forEach(order => {
    const key = order.id || order.orderId;
    if (key && !seenIds.has(key)) {
      seenIds.add(key);
      merged.push(order);
    }
  });

  return merged;
};

/**
 * Fetch seller orders
 */
export const getSellerOrders = async () => {
  const localOrders = getLocalOrders();
  return localOrders;
};
