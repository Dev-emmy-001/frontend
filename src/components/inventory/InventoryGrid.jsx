import React from 'react';
import VehicleCard from '../common/VehicleCard';
import { useTranslation } from '../../context/LanguageContext';

const InventoryGrid = ({ vehicles, loading, onResetFilters, selectedPort }) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">{t('inventory.loadingInventory', 'Loading inventory...')}</span>
        </div>
      </div>
    );
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="text-center py-5 bg-black border border-secondary rounded-3 p-5 my-4">
        <h5 className="text-white fw-bold mb-2">{t('inventory.noVehiclesTitle', 'No vehicles match your search criteria')}</h5>
        <p className="text-secondary small mb-4">{t('inventory.noVehiclesDesc', 'Try clearing your filters or selecting a different vehicle location or destination port.')}</p>
        {onResetFilters && (
          <button 
            onClick={onResetFilters} 
            className="btn btn-brand-red px-4 py-2 small fw-bold text-uppercase"
          >
            {t('inventory.clearAll', 'Reset All Filters')}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="row g-4">
      {vehicles.map((car) => (
        <div key={car._id || car.id || car.model} className="col-12 col-sm-6 col-lg-3">
          <VehicleCard car={car} isDark={true} selectedPort={selectedPort} />
        </div>
      ))}
    </div>
  );
};

export default InventoryGrid;
