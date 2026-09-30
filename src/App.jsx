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

// Seller Portal Pages
import SellerDashboard from './pages/seller/SellerDashboard';
import AddVehicle from './pages/seller/AddVehicle';
import MyListings from './pages/seller/MyListings';
import SellerOrders from './pages/seller/SellerOrders';
import SellerEarnings from './pages/seller/SellerEarnings';
import SellerMessages from './pages/seller/SellerMessages';
import SellerProfile from './pages/seller/SellerProfile';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Seller Portal Routes */}
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/seller-dashboard/listings" element={<MyListings />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/seller-orders" element={<SellerOrders />} />
          <Route path="/seller-earnings" element={<SellerEarnings />} />
          <Route path="/messages" element={<SellerMessages />} />
          <Route path="/profile" element={<SellerProfile />} />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;