import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../data/apiConfig';
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
  const [selectedCondition, setSelectedCondition] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL VEHICLES');
  const [selectedOrigin, setSelectedOrigin] = useState('ALL');
  const [selectedPort, setSelectedPort] = useState('ALL');
  const [sortBy, setSortBy] = useState('default');

  // Initialize filters from URL query params if present
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
    const conditionParam = searchParams.get('condition');
    if (conditionParam) {
      const upperCond = conditionParam.toUpperCase();
      if (['ALL', 'USED', 'NEW'].includes(upperCond)) {
        setSelectedCondition(upperCond);
      }
    }
    const originParam = searchParams.get('origin') || searchParams.get('location') || searchParams.get('country');
    if (originParam) {
      setSelectedOrigin(originParam.toUpperCase());
    }
    const portParam = searchParams.get('port');
    if (portParam) {
      setSelectedPort(portParam.toUpperCase());
    }
  }, [searchParams]);

  // Fetch Inventory from API with fallback
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await api.get('/vehicles');
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          // Merge API vehicles with sample vehicles to ensure global origin data is complete
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

    // 2. Filter by Condition (ALL, USED, NEW)
    if (selectedCondition && selectedCondition.toUpperCase() !== 'ALL') {
      const targetCond = selectedCondition.toUpperCase();
      list = list.filter(car => {
        const carCond = (car.condition || 'Used').toUpperCase();
        return carCond === targetCond;
      });
    }

    // 3. Filter by Current Vehicle Location (Origin Country: USA, Japan, Germany, UAE, Canada, UK)
    if (selectedOrigin && selectedOrigin !== 'ALL') {
      const targetOrigin = selectedOrigin.toUpperCase();
      list = list.filter(car => {
        const carCountry = (car.location?.country || 'USA').toUpperCase();
        return carCountry === targetOrigin;
      });
    }

    // 4. Filter by Target Destination Port (e.g. LAGOS, MOMBASA, TEMA, DURBAN, etc.)
    if (selectedPort && selectedPort !== 'ALL') {
      const targetPort = selectedPort.toUpperCase();
      list = list.filter(car => {
        if (!car.eligibleDestinationPorts || car.eligibleDestinationPorts.length === 0) return true;
        return car.eligibleDestinationPorts.includes(targetPort);
      });
    }

    // 5. Filter by search query (make, model, year, city, country)
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(car => 
        car.make?.toLowerCase().includes(q) ||
        car.model?.toLowerCase().includes(q) ||
        car.year?.toString().includes(q) ||
        (car.condition && car.condition.toLowerCase().includes(q)) ||
        (car.location?.country && car.location.country.toLowerCase().includes(q)) ||
        (car.location?.city && car.location.city.toLowerCase().includes(q))
      );
    }

    // 6. Filter by maxPrice query param if present
    const maxPriceParam = searchParams.get('maxPrice');
    if (maxPriceParam && !isNaN(Number(maxPriceParam))) {
      list = list.filter(car => car.price <= Number(maxPriceParam));
    }

    // 7. Sort
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
  }, [baseVehicles, selectedCategory, selectedCondition, selectedOrigin, selectedPort, searchTerm, sortBy, searchParams]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCondition('ALL');
    setSelectedCategory('ALL VEHICLES');
    setSelectedOrigin('ALL');
    setSelectedPort('ALL');
    setSortBy('default');
    setSearchParams({});
  };

  return (
    <div className="bg-dark text-white min-vh-100 font-sans">
      {/* 1. Top Utility Marquee Bar with Currency Engine */}
      <TopBar />

      {/* 2. Main Navigation Bar */}
      <Navbar />

      {/* 3. Main Inventory Section */}
      <main className="container py-5">
        <div className="mb-4">
          <span className="text-danger fw-bold small text-uppercase tracking-wider">
            GLOBAL AUTOMOTIVE SHOWROOM
          </span>
          <h1 className="fw-black text-uppercase display-5 m-0" style={{ fontWeight: '900' }}>
            VEHICLE INVENTORY
          </h1>
          <p className="text-secondary small mt-1">
            Browse our curated selection of verified global vehicles with direct international port delivery & live currency conversions.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <InventoryFilterBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCondition={selectedCondition}
          setSelectedCondition={setSelectedCondition}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedOrigin={selectedOrigin}
          setSelectedOrigin={setSelectedOrigin}
          selectedPort={selectedPort}
          setSelectedPort={setSelectedPort}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalResults={filteredVehicles.length}
          onResetFilters={handleResetFilters}
        />

        {/* Vehicle Cards Grid */}
        <InventoryGrid 
          vehicles={filteredVehicles}
          loading={loading}
          onResetFilters={handleResetFilters}
          selectedPort={selectedPort}
        />
      </main>

      {/* 4. Dealership Footer */}
      <Footer theme="dark" />
    </div>
  );
};

export default Inventory;