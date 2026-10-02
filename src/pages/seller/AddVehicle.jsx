import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../../data/apiConfig';
import SellerSidebar from '../../components/seller/SellerSidebar';
import SellerHeader from '../../components/seller/SellerHeader';
import VehicleBasicInfo from '../../components/seller/add-vehicle/VehicleBasicInfo';
import VehicleSpecsForm from '../../components/seller/add-vehicle/VehicleSpecsForm';
import VehicleDealerOptions from '../../components/seller/add-vehicle/VehicleDealerOptions';
import VehicleImageUploader from '../../components/seller/add-vehicle/VehicleImageUploader';
import VehicleDescription from '../../components/seller/add-vehicle/VehicleDescription';

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    make: 'Toyota',
    model: '',
    year: '2023',
    trim: '',
    condition: 'Used',
    currency: 'USD',
    bodyType: 'SUV',
    fuelType: 'Gasoline',
    price: '',
    mileage: '',
    transmission: 'Automatic',
    engine: '',
    driveType: 'FWD',
    exteriorColor: '',
    interiorColor: '',
    description: ''
  });

  const [dealerOptions, setDealerOptions] = useState({
    warrantyOffered: false,
    financingAvailable: true,
    testDriveAvailable: true
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate photo count: minimum of 3 images (interior, exterior and engines)
    if (images.length < 3) {
      setError('Please upload a minimum of 3 images (interior, exterior, and engines) before publishing your listing.');
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        dealerOptions,
        images
      };

      await api.post('/vehicles', payload);

      alert('Vehicle listed successfully on Summit Auto Group!');
      navigate('/seller-dashboard');
    } catch (err) {
      console.error('Submission error:', err);
      const serverMessage = err.response?.data?.message || err.response?.data?.error;
      setError(serverMessage || 'Failed to create listing. Please verify your fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout bg-light min-vh-100 d-flex font-sans">
      {/* 1. Left Dark Sidebar */}
      <SellerSidebar />

      {/* 2. Main Form Content Area */}
      <main className="dashboard-main flex-grow-1 p-4 p-md-5 overflow-auto" style={{ minWidth: 0 }}>
        
        {/* Back Link */}
        <Link 
          to="/seller-dashboard" 
          className="text-secondary text-decoration-none small fw-bold d-inline-flex align-items-center gap-1 mb-3 hover-text-danger"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>

        {/* Page Header */}
        <SellerHeader 
          title="Add New Vehicle" 
          subtitle="List your vehicle for sale on the Summit Auto Group marketplace"
          actionButton={false}
        />

        {error && (
          <div className="alert alert-danger py-2.5 px-4 mb-4 small fw-semibold">
            {error}
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white p-4 p-md-5 rounded-4 border border-light shadow-sm" style={{ maxWidth: '900px' }}>
          <form onSubmit={handleSubmit}>
            
            {/* Section 1: Basic Info */}
            <VehicleBasicInfo formData={formData} setFormData={setFormData} />

            {/* Section 2: Pricing & Specs */}
            <VehicleSpecsForm formData={formData} setFormData={setFormData} />

            {/* Section 3: Dealer Options / Perks */}
            <VehicleDealerOptions dealerOptions={dealerOptions} setDealerOptions={setDealerOptions} />

            {/* Section 4: Photo Uploader */}
            <VehicleImageUploader images={images} setImages={setImages} />

            {/* Section 5: Description */}
            <VehicleDescription 
              description={formData.description} 
              setDescription={(val) => setFormData({ ...formData, description: val })} 
            />

            {/* Submit Action */}
            <div className="d-flex justify-content-end gap-3 pt-3 border-top border-light">
              <Link 
                to="/seller-dashboard" 
                className="btn btn-light px-4 py-2.5 fw-semibold"
              >
                Cancel
              </Link>
              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-brand-red px-5 py-2.5 fw-bold text-uppercase animate-btn"
              >
                {loading ? 'Publishing...' : 'Publish Listing'}
              </button>
            </div>

          </form>
        </div>

      </main>
    </div>
  );
};

export default AddVehicle;
