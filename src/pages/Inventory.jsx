import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import InventoryFilterBar from '../components/inventory/InventoryFilterBar';
import InventoryGrid from '../components/inventory/InventoryGrid';
import { sampleVehicles, filterVehiclesByTab } from '../data/mockVehicles';

const Inventory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL VEHICLES');
  const [sortBy, setSortBy] = useState('default');

  // Initialize category from URL query param if present (e.g. ?type=sedan)
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam) {
      const formatted = typeParam.toUpperCase() + (typeParam.endsWith('s') ? '' : 'S');
      setSelectedCategory(formatted);
    }
    const makeParam = searchParams.get('make');
    if (makeParam) {
      setSearchTerm(makeParam);
    }
  }, [searchParams]);

  // Fetch Inventory from API with fallback
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/vehicles');
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setVehicles(res.data);
        } else {
          setVehicles(sampleVehicles);
        }
      } catch (err) {
        console.warn('API unavailable, loading sample vehicles:', err.message);
        setVehicles(sampleVehicles);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const baseVehicles = vehicles.length > 0 ? vehicles : sampleVehicles;

  // Filter & Sort Logic
  const filteredVehicles = useMemo(() => {
    // 1. Filter by Category Tab
    let list = filterVehiclesByTab(baseVehicles, selectedCategory);

    // 2. Filter by search query (make, model, year)
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(car => 
        car.make?.toLowerCase().includes(q) ||
        car.model?.toLowerCase().includes(q) ||
        car.year?.toString().includes(q)
      );
    }

    // 3. Filter by maxPrice query param if present
    const maxPriceParam = searchParams.get('maxPrice');
    if (maxPriceParam && !isNaN(Number(maxPriceParam))) {
      list = list.filter(car => car.price <= Number(maxPriceParam));
    }

    // 4. Sort
    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'year-desc') {
      list = [...list].sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sortBy === 'mileage-asc') {
      list = [...list].sort((a, b) => (a.mileage || 0) - (b.mileage || 0));
    }

    return list;
  }, [baseVehicles, selectedCategory, searchTerm, sortBy, searchParams]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('ALL VEHICLES');
    setSortBy('default');
    setSearchParams({});
  };

  return (
    <div className="bg-dark text-white min-vh-100 font-sans">
      {/* 1. Top Utility Marquee Bar */}
      <TopBar />

      {/* 2. Main Navigation Bar */}
      <Navbar />

      {/* 3. Main Inventory Section */}
      <main className="container py-5">
        <div className="mb-4">
          <span className="text-danger fw-bold small text-uppercase tracking-wider">
            OUR SHOWROOM
          </span>
          <h1 className="fw-black text-uppercase display-5 m-0" style={{ fontWeight: '900' }}>
            VEHICLE INVENTORY
          </h1>
          <p className="text-secondary small mt-1">
            Browse our curated selection of pre-owned and new certified vehicles.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <InventoryFilterBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalResults={filteredVehicles.length}
        />

        {/* Vehicle Cards Grid */}
        <InventoryGrid 
          vehicles={filteredVehicles}
          loading={loading}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* 4. Dealership Footer */}
      <Footer theme="dark" />
    </div>
  );
};

export default Inventory;