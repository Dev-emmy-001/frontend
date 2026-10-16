import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import Financing from './pages/Financing';
import Inventory from './pages/Inventory';
import VehicleDetails from './pages/VehicleDetails';

// Smart Shared Pages (Buyer / Seller switcher)
import Profile from './pages/Profile';
import Messages from './pages/Messages';

// Buyer Portal Pages
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import BuyerOrders from './pages/buyer/BuyerOrders';
import BuyerFavorites from './pages/buyer/BuyerFavorites';
import BuyerPayments from './pages/buyer/BuyerPayments';
import BuyerProfile from './pages/buyer/BuyerProfile';
import BuyerMessages from './pages/buyer/BuyerMessages';

// Seller Portal Pages
import SellerDashboard from './pages/seller/SellerDashboard';
import AddVehicle from './pages/seller/AddVehicle';
import MyListings from './pages/seller/MyListings';
import SellerOrders from './pages/seller/SellerOrders';
import SellerEarnings from './pages/seller/SellerEarnings';
import SellerMessages from './pages/seller/SellerMessages';
import SellerProfile from './pages/seller/SellerProfile';

// Admin Portal Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSellers from './pages/admin/AdminSellers';
import AdminVehicles from './pages/admin/AdminVehicles';
import AdminOrders from './pages/admin/AdminOrders';
import AdminRevenue from './pages/admin/AdminRevenue';


// payment section
import Checkout from './components/payment/Checkout';

// Real-Time Currency Engine Context
import { CurrencyProvider } from './context/CurrencyContext';

function App() {
  return (
    <CurrencyProvider>
      <Router>
        <div className="app-container">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* payment section */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Buyer Portal Routes */}
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/my-orders" element={<BuyerOrders />} />
          <Route path="/buyer/orders" element={<BuyerOrders />} />
          <Route path="/favorites" element={<BuyerFavorites />} />
          <Route path="/buyer/favorites" element={<BuyerFavorites />} />
          <Route path="/payments" element={<BuyerPayments />} />
          <Route path="/buyer/payments" element={<BuyerPayments />} />
          <Route path="/buyer/profile" element={<BuyerProfile />} />
          <Route path="/buyer/messages" element={<BuyerMessages />} />

          {/* Shared / Role-Adaptive Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />

          {/* Seller Portal Routes */}
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/seller-dashboard/listings" element={<MyListings />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/seller-orders" element={<SellerOrders />} />
          <Route path="/seller-earnings" element={<SellerEarnings />} />
          <Route path="/seller-messages" element={<SellerMessages />} />
          <Route path="/seller-profile" element={<SellerProfile />} />

          {/* Admin Portal Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/sellers" element={<AdminSellers />} />
          <Route path="/admin/vehicles" element={<AdminVehicles />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/revenue" element={<AdminRevenue />} />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  </CurrencyProvider>
  );
}

export default App;