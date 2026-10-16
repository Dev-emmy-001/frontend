export const VEHICLE_CATEGORIES = [
  'ALL VEHICLES',
  'SEDANS',
  'SUVS',
  'TRUCKS',
  'COUPES',
  'HYBRIDS'
];

export const VEHICLE_CONDITIONS = ['ALL', 'USED', 'NEW'];

export const CURRENCY_OPTIONS = [
  { code: 'USD', symbol: '$', name: 'USD ($ - US Dollar)' },
  { code: 'NGN', symbol: '₦', name: 'NGN (₦ - Nigerian Naira)' },
  { code: 'KES', symbol: 'KSh', name: 'KES (KSh - Kenyan Shilling)' },
  { code: 'GHS', symbol: 'GH₵', name: 'GHS (GH₵ - Ghanaian Cedi)' },
  { code: 'ZAR', symbol: 'R', name: 'ZAR (R - South African Rand)' },
  { code: 'EUR', symbol: '€', name: 'EUR (€ - Euro)' },
  { code: 'GBP', symbol: '£', name: 'GBP (£ - British Pound)' },
  { code: 'AED', symbol: 'AED', name: 'AED (د.إ - UAE Dirham)' },
  { code: 'CAD', symbol: 'CA$', name: 'CAD (CA$ - Canadian Dollar)' },
  { code: 'AUD', symbol: 'AU$', name: 'AUD (AU$ - Australian Dollar)' },
  { code: 'JPY', symbol: '¥', name: 'JPY (¥ - Japanese Yen)' }
];

export const getCurrencySymbol = (currencyCode = 'USD') => {
  const found = CURRENCY_OPTIONS.find(
    c => c.code.toUpperCase() === (currencyCode || 'USD').toUpperCase()
  );
  return found ? found.symbol : '$';
};

export const formatPrice = (price, currencyCode = 'USD') => {
  if (price == null || isNaN(Number(price))) return 'Call for Price';
  const symbol = getCurrencySymbol(currencyCode);
  return `${symbol}${Number(price).toLocaleString()}`;
};

export const sampleVehicles = [
  {
    _id: '1',
    make: 'Toyota',
    model: 'RAV4 XLE',
    year: 2023,
    condition: 'Used',
    currency: 'USD',
    price: 26490,
    mileage: 28120,
    transmission: 'Automatic',
    bodyStyle: 'SUV',
    location: {
      country: 'USA',
      city: 'Houston, TX',
      portOfLoading: 'Port of Houston',
      flag: '🇺🇸'
    },
    eligibleDestinationPorts: ['LAGOS', 'MOMBASA', 'TEMA', 'DURBAN', 'ROTTERDAM', 'JEBEL_ALI'],
    images: ['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '2',
    make: 'Honda',
    model: 'Accord EX',
    year: 2022,
    condition: 'Used',
    currency: 'USD',
    price: 24990,
    mileage: 31540,
    transmission: 'Automatic',
    bodyStyle: 'Sedan',
    location: {
      country: 'USA',
      city: 'Los Angeles, CA',
      portOfLoading: 'Port of Los Angeles',
      flag: '🇺🇸'
    },
    eligibleDestinationPorts: ['LAGOS', 'MOMBASA', 'TEMA', 'DURBAN', 'JEBEL_ALI'],
    images: ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '3',
    make: 'Ford',
    model: 'F-150 XLT',
    year: 2024,
    condition: 'New',
    currency: 'USD',
    price: 33990,
    mileage: 15,
    transmission: 'Automatic',
    bodyStyle: 'Truck',
    location: {
      country: 'USA',
      city: 'Newark, NJ',
      portOfLoading: 'Port of Newark',
      flag: '🇺🇸'
    },
    eligibleDestinationPorts: ['LAGOS', 'TEMA', 'DURBAN', 'ROTTERDAM', 'JEBEL_ALI'],
    images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '4',
    make: 'Chevrolet',
    model: 'Camaro LT',
    year: 2023,
    condition: 'Used',
    currency: 'USD',
    price: 28990,
    mileage: 10860,
    transmission: 'Automatic',
    bodyStyle: 'Coupe',
    location: {
      country: 'USA',
      city: 'Miami, FL',
      portOfLoading: 'Port of Miami',
      flag: '🇺🇸'
    },
    eligibleDestinationPorts: ['LAGOS', 'TEMA', 'DURBAN', 'ROTTERDAM'],
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '5',
    make: 'BMW',
    model: '330i xDrive',
    year: 2024,
    condition: 'New',
    currency: 'USD',
    price: 38500,
    mileage: 20,
    transmission: 'Automatic',
    bodyStyle: 'Sedan',
    location: {
      country: 'GERMANY',
      city: 'Hamburg',
      portOfLoading: 'Port of Hamburg',
      flag: '🇩🇪'
    },
    eligibleDestinationPorts: ['LAGOS', 'MOMBASA', 'TEMA', 'DURBAN', 'JEBEL_ALI', 'ROTTERDAM'],
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '6',
    make: 'Toyota',
    model: 'Prius Prime Hybrid',
    year: 2024,
    condition: 'New',
    currency: 'USD',
    price: 29800,
    mileage: 12,
    transmission: 'Automatic',
    bodyStyle: 'Hybrid',
    location: {
      country: 'JAPAN',
      city: 'Yokohama',
      portOfLoading: 'Port of Yokohama',
      flag: '🇯🇵'
    },
    eligibleDestinationPorts: ['MOMBASA', 'DAR_ES_SALAAM', 'DURBAN', 'LAGOS', 'TEMA', 'JEBEL_ALI'],
    images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '7',
    make: 'Jeep',
    model: 'Grand Cherokee',
    year: 2022,
    condition: 'Used',
    currency: 'USD',
    price: 34990,
    mileage: 22600,
    transmission: 'Automatic',
    bodyStyle: 'SUV',
    location: {
      country: 'CANADA',
      city: 'Vancouver, BC',
      portOfLoading: 'Port of Vancouver',
      flag: '🇨🇦'
    },
    eligibleDestinationPorts: ['LAGOS', 'MOMBASA', 'TEMA', 'DURBAN', 'ROTTERDAM'],
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '8',
    make: 'Ford',
    model: 'Mustang GT',
    year: 2024,
    condition: 'New',
    currency: 'USD',
    price: 36700,
    mileage: 8,
    transmission: 'Manual',
    bodyStyle: 'Coupe',
    location: {
      country: 'USA',
      city: 'Houston, TX',
      portOfLoading: 'Port of Houston',
      flag: '🇺🇸'
    },
    eligibleDestinationPorts: ['LAGOS', 'TEMA', 'DURBAN', 'JEBEL_ALI', 'ROTTERDAM'],
    images: ['https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '9',
    make: 'Lexus',
    model: 'RX 350 Luxury',
    year: 2023,
    condition: 'Used',
    currency: 'USD',
    price: 43500,
    mileage: 18200,
    transmission: 'Automatic',
    bodyStyle: 'SUV',
    location: {
      country: 'JAPAN',
      city: 'Kobe',
      portOfLoading: 'Port of Kobe',
      flag: '🇯🇵'
    },
    eligibleDestinationPorts: ['MOMBASA', 'DAR_ES_SALAAM', 'DURBAN', 'LAGOS', 'JEBEL_ALI'],
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '10',
    make: 'Mercedes-Benz',
    model: 'GLE 450 AMG',
    year: 2024,
    condition: 'New',
    currency: 'USD',
    price: 64900,
    mileage: 50,
    transmission: 'Automatic',
    bodyStyle: 'SUV',
    location: {
      country: 'GERMANY',
      city: 'Bremerhaven',
      portOfLoading: 'Port of Bremerhaven',
      flag: '🇩🇪'
    },
    eligibleDestinationPorts: ['LAGOS', 'TEMA', 'MOMBASA', 'DURBAN', 'JEBEL_ALI'],
    images: ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '11',
    make: 'Nissan',
    model: 'Patrol Platinum V8',
    year: 2023,
    condition: 'Used',
    currency: 'USD',
    price: 52000,
    mileage: 14500,
    transmission: 'Automatic',
    bodyStyle: 'SUV',
    location: {
      country: 'UAE',
      city: 'Dubai',
      portOfLoading: 'Port of Jebel Ali',
      flag: '🇦🇪'
    },
    eligibleDestinationPorts: ['MOMBASA', 'DAR_ES_SALAAM', 'LAGOS', 'DURBAN', 'TEMA'],
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80']
  },
  {
    _id: '12',
    make: 'Land Rover',
    model: 'Defender 110 X-Dynamic',
    year: 2024,
    condition: 'New',
    currency: 'USD',
    price: 68500,
    mileage: 25,
    transmission: 'Automatic',
    bodyStyle: 'SUV',
    location: {
      country: 'UK',
      city: 'Southampton',
      portOfLoading: 'Port of Southampton',
      flag: '🇬🇧'
    },
    eligibleDestinationPorts: ['LAGOS', 'TEMA', 'MOMBASA', 'DURBAN', 'JEBEL_ALI'],
    images: ['https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80']
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
      car.model?.toUpperCase().includes('RX 350') ||
      car.model?.toUpperCase().includes('GLE') ||
      car.model?.toUpperCase().includes('PATROL') ||
      car.model?.toUpperCase().includes('DEFENDER') ||
      car.make?.toUpperCase() === 'TOYOTA' ||
      car.make?.toUpperCase() === 'JEEP' ||
      car.make?.toUpperCase() === 'LEXUS' ||
      car.make?.toUpperCase() === 'NISSAN'
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
      car.fuelType?.toUpperCase().includes('HYBRID') ||
      car.model?.toUpperCase().includes('PRIUS')
    );
  }
  return vehiclesList;
};
