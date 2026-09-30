export const VEHICLE_CATEGORIES = [
  'ALL VEHICLES',
  'SEDANS',
  'SUVS',
  'TRUCKS',
  'COUPES',
  'HYBRIDS'
];

export const sampleVehicles = [
  {
    _id: '1',
    make: 'Toyota',
    model: 'RAV4 XLE',
    year: 2023,
    price: 26490,
    mileage: 28120,
    transmission: 'Automatic',
    bodyStyle: 'SUV',
    images: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '2',
    make: 'Honda',
    model: 'Accord EX',
    year: 2022,
    price: 24990,
    mileage: 31540,
    transmission: 'Automatic',
    bodyStyle: 'Sedan',
    images: ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '3',
    make: 'Ford',
    model: 'F-150 XLT',
    year: 2021,
    price: 33990,
    mileage: 45300,
    transmission: 'Automatic',
    bodyStyle: 'Truck',
    images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '4',
    make: 'Chevrolet',
    model: 'Camaro LT',
    year: 2023,
    price: 28990,
    mileage: 10860,
    transmission: 'Automatic',
    bodyStyle: 'Coupe',
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '5',
    make: 'BMW',
    model: '330i xDrive',
    year: 2023,
    price: 38500,
    mileage: 14200,
    transmission: 'Automatic',
    bodyStyle: 'Sedan',
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '6',
    make: 'Toyota',
    model: 'Prius Prime Hybrid',
    year: 2023,
    price: 29800,
    mileage: 12400,
    transmission: 'Automatic',
    bodyStyle: 'Hybrid',
    images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '7',
    make: 'Jeep',
    model: 'Grand Cherokee',
    year: 2022,
    price: 34990,
    mileage: 22600,
    transmission: 'Automatic',
    bodyStyle: 'SUV',
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '8',
    make: 'Ford',
    model: 'Mustang GT',
    year: 2022,
    price: 36700,
    mileage: 18900,
    transmission: 'Manual',
    bodyStyle: 'Coupe',
    images: ['https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80']
  }
];

export const filterVehiclesByTab = (vehiclesList, activeTab) => {
  const tab = (activeTab || 'ALL').toUpperCase();
  if (tab === 'ALL' || tab === 'ALL VEHICLES') return vehiclesList;
  if (tab === 'SEDANS') {
    return vehiclesList.filter(car => 
      car.bodyStyle?.toUpperCase() === 'SEDAN' || 
      car.model?.toUpperCase().includes('ACCORD') || 
      car.model?.toUpperCase().includes('330I') ||
      car.make?.toUpperCase() === 'HONDA'
    );
  }
  if (tab === 'SUVS') {
    return vehiclesList.filter(car => 
      car.bodyStyle?.toUpperCase() === 'SUV' || 
      car.model?.toUpperCase().includes('RAV4') || 
      car.model?.toUpperCase().includes('CHEROKEE') ||
      car.make?.toUpperCase() === 'TOYOTA' ||
      car.make?.toUpperCase() === 'JEEP'
    );
  }
  if (tab === 'TRUCKS') {
    return vehiclesList.filter(car => 
      car.bodyStyle?.toUpperCase() === 'TRUCK' || 
      car.model?.toUpperCase().includes('F-150') || 
      car.make?.toUpperCase() === 'FORD'
    );
  }
  if (tab === 'COUPES') {
    return vehiclesList.filter(car => 
      car.bodyStyle?.toUpperCase() === 'COUPE' || 
      car.model?.toUpperCase().includes('CAMARO') || 
      car.model?.toUpperCase().includes('MUSTANG') ||
      car.make?.toUpperCase() === 'CHEVROLET'
    );
  }
  if (tab === 'HYBRIDS') {
    return vehiclesList.filter(car => 
      car.bodyStyle?.toUpperCase() === 'HYBRID' ||
      car.model?.toUpperCase().includes('HYBRID') ||
      car.model?.toUpperCase().includes('PRIUS')
    );
  }
  return vehiclesList;
};
