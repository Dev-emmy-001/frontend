import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../data/apiConfig';
import { sampleVehicles } from '../../data/mockVehicles';

// Subcomponents
import VehicleBreadcrumb from './VehicleBreadcrumb';
import VehicleGallery from './VehicleGallery';
import VehicleSpecsGrid from './VehicleSpecsGrid';
import VehicleOverview from './VehicleOverview';
import VehiclePricingCard from './VehiclePricingCard';
import VehicleContactModal from './VehicleContactModal';
import VehiclePurchaseModal from './VehiclePurchaseModal';
import GlobalShippingCalculator from './GlobalShippingCalculator';

/**
 * VehicleDetails Component
 * Complete vehicle information, image gallery, specifications, and interactive contact/purchase modals.
 */
const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true);
      try {
        // Attempt backend API call
        const res = await api.get(`/vehicles/${id}`);
        if (res.data) {
          setVehicle(res.data);
        } else {
          fallbackLocalVehicle();
        }
      } catch (err) {
        console.warn('API fetch note: using local sample vehicle for ID:', id);
        fallbackLocalVehicle();
      } finally {
        setLoading(false);
      }
    };

    const fallbackLocalVehicle = () => {
      const match = sampleVehicles.find(v => v._id === id || v.id === id);
      if (match) {
        setVehicle(match);
      } else {
        // Fallback default vehicle
        setVehicle(sampleVehicles[0]);
      }
    };

    if (id) {
      fetchVehicle();
    } else {
      setVehicle(sampleVehicles[0]);
      setLoading(false);
    }
  }, [id]);

  const car = vehicle || sampleVehicles[0];
  const vehicleTitle = `${car.year || 2023} ${car.make || 'Toyota'} ${car.model || 'Vehicle'}`;

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading vehicle details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-4 font-sans">
      <div className="container">
        
        {/* 1. Breadcrumb Navigation */}
        <VehicleBreadcrumb car={car} />

        {/* 2. Main Vehicle Layout */}
        <div className="row g-4">
          
          {/* Left Column: Gallery, Specs & Overview */}
          <div className="col-lg-8">
            {/* Image Gallery */}
            <VehicleGallery 
              images={car.images} 
              vehicleTitle={vehicleTitle} 
            />

            {/* Specifications Grid */}
            <VehicleSpecsGrid car={car} />

            {/* Overview & Key Features */}
            <VehicleOverview car={car} />

            {/* Smart Global Ocean Freight & Port Landed Cost Calculator */}
            <GlobalShippingCalculator car={car} />
          </div>

          {/* Right Column: Pricing & Seller Details Card */}
          <div className="col-lg-4">
            <VehiclePricingCard 
              car={car}
              onBuyNow={() => setIsPurchaseModalOpen(true)}
              onContactSeller={() => setIsContactModalOpen(true)}
            />
          </div>

        </div>

      </div>

      {/* Interactive Modals */}
      <VehicleContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        car={car}
      />

      <VehiclePurchaseModal 
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        car={car}
      />
    </div>
  );
};

export default VehicleDetails;