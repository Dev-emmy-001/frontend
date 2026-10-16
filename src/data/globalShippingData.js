/**
 * Global Vehicle Origin Locations & Target Destination Ports Data
 * Supports cross-border automotive trading, shipping logistics, transit times, and freight calculations.
 */

// Supported Vehicle Origin Countries / Locations
export const VEHICLE_ORIGIN_LOCATIONS = [
  { id: 'ALL', code: 'ALL', name: 'All Locations', flag: '🌍', label: 'All Global Locations' },
  { id: 'USA', code: 'USA', name: 'United States', flag: '🇺🇸', label: 'Cars in USA', ports: ['Port of Houston', 'Port of Newark', 'Port of Los Angeles'] },
  { id: 'JAPAN', code: 'JAPAN', name: 'Japan', flag: '🇯🇵', label: 'Cars in Japan', ports: ['Port of Yokohama', 'Port of Kobe', 'Port of Nagoya'] },
  { id: 'GERMANY', code: 'GERMANY', name: 'Germany (Europe)', flag: '🇩🇪', label: 'Cars in Germany', ports: ['Port of Hamburg', 'Port of Bremerhaven'] },
  { id: 'UAE', code: 'UAE', name: 'United Arab Emirates', flag: '🇦🇪', label: 'Cars in UAE (Dubai)', ports: ['Port of Jebel Ali', 'Port Rashid'] },
  { id: 'CANADA', code: 'CANADA', name: 'Canada', flag: '🇨🇦', label: 'Cars in Canada', ports: ['Port of Halifax', 'Port of Vancouver', 'Port of Montreal'] },
  { id: 'UK', code: 'UK', name: 'United Kingdom', flag: '🇬🇧', label: 'Cars in UK', ports: ['Port of Southampton', 'Port of Felixstowe'] }
];

// Target Destination Ports across Africa, Europe, Middle East, Americas & Asia
export const TARGET_DESTINATION_PORTS = [
  { id: 'ALL', code: 'ALL', name: 'All Destination Ports', flag: '🚢', country: 'Global', region: 'Worldwide' },
  { id: 'LAGOS', code: 'LOS', name: 'Lagos (Apapa / Tin Can)', country: 'Nigeria', flag: '🇳🇬', region: 'West Africa', terminal: 'Tin Can Island / Apapa Port' },
  { id: 'MOMBASA', code: 'MBA', name: 'Port of Mombasa', country: 'Kenya', flag: '🇰🇪', region: 'East Africa', terminal: 'Kilindini Harbour' },
  { id: 'TEMA', code: 'TEM', name: 'Port of Tema', country: 'Ghana', flag: '🇬🇭', region: 'West Africa', terminal: 'MPS Terminal 3' },
  { id: 'DURBAN', code: 'DUR', name: 'Port of Durban', country: 'South Africa', flag: '🇿🇦', region: 'Southern Africa', terminal: 'Durban Car Terminal' },
  { id: 'WALVIS_BAY', code: 'WVB', name: 'Port of Walvis Bay', country: 'Namibia', flag: '🇳🇦', region: 'Southern Africa', terminal: 'Namport Container Terminal' },
  { id: 'DAR_ES_SALAAM', code: 'DAR', name: 'Port of Dar es Salaam', country: 'Tanzania', flag: '🇹🇿', region: 'East Africa', terminal: 'Bandari Terminal' },
  { id: 'JEBEL_ALI', code: 'DXB', name: 'Port of Jebel Ali (Dubai)', country: 'United Arab Emirates', flag: '🇦🇪', region: 'Middle East', terminal: 'DP World Jebel Ali' },
  { id: 'ROTTERDAM', code: 'RTM', name: 'Port of Rotterdam', country: 'Netherlands', flag: '🇳🇱', region: 'Europe', terminal: 'APM Terminals Maasvlakte' },
  { id: 'HAMBURG', code: 'HAM', name: 'Port of Hamburg', country: 'Germany', flag: '🇩🇪', region: 'Europe', terminal: 'Unikai Ro-Ro Terminal' },
  { id: 'SOUTHAMPTON', code: 'SOU', name: 'Port of Southampton', country: 'United Kingdom', flag: '🇬🇧', region: 'Europe', terminal: 'Associated British Ports' },
  { id: 'HALIFAX', code: 'HAL', name: 'Port of Halifax', country: 'Canada', flag: '🇨🇦', region: 'North America', terminal: 'Autoport Eastern Passage' },
  { id: 'HOUSTON', code: 'HOU', name: 'Port of Houston', country: 'United States', flag: '🇺🇸', region: 'North America', terminal: 'Barbours Cut Ro-Ro' }
];

// Matrix of typical ocean freight shipping estimates by origin and target port
export const SHIPPING_RATES_MATRIX = {
  // USA ORIGIN
  'USA_LAGOS': { freightRoRo: 1850, freightContainer: 2400, transitDays: '21 - 26 days', insuranceRate: 0.012 },
  'USA_MOMBASA': { freightRoRo: 2200, freightContainer: 2850, transitDays: '32 - 38 days', insuranceRate: 0.015 },
  'USA_TEMA': { freightRoRo: 1750, freightContainer: 2300, transitDays: '20 - 24 days', insuranceRate: 0.012 },
  'USA_DURBAN': { freightRoRo: 2100, freightContainer: 2700, transitDays: '28 - 34 days', insuranceRate: 0.014 },
  'USA_JEBEL_ALI': { freightRoRo: 1950, freightContainer: 2500, transitDays: '25 - 30 days', insuranceRate: 0.013 },
  'USA_ROTTERDAM': { freightRoRo: 1350, freightContainer: 1800, transitDays: '12 - 16 days', insuranceRate: 0.010 },

  // JAPAN ORIGIN
  'JAPAN_MOMBASA': { freightRoRo: 1650, freightContainer: 2250, transitDays: '24 - 30 days', insuranceRate: 0.012 },
  'JAPAN_DAR_ES_SALAAM': { freightRoRo: 1700, freightContainer: 2300, transitDays: '25 - 32 days', insuranceRate: 0.012 },
  'JAPAN_DURBAN': { freightRoRo: 1800, freightContainer: 2400, transitDays: '26 - 32 days', insuranceRate: 0.013 },
  'JAPAN_LAGOS': { freightRoRo: 2350, freightContainer: 3100, transitDays: '35 - 42 days', insuranceRate: 0.015 },
  'JAPAN_TEMA': { freightRoRo: 2300, freightContainer: 3000, transitDays: '34 - 40 days', insuranceRate: 0.015 },
  'JAPAN_JEBEL_ALI': { freightRoRo: 1250, freightContainer: 1750, transitDays: '14 - 18 days', insuranceRate: 0.010 },
  'JAPAN_ROTTERDAM': { freightRoRo: 1900, freightContainer: 2600, transitDays: '30 - 36 days', insuranceRate: 0.014 },

  // GERMANY / EUROPE ORIGIN
  'GERMANY_LAGOS': { freightRoRo: 1600, freightContainer: 2150, transitDays: '18 - 22 days', insuranceRate: 0.011 },
  'GERMANY_TEMA': { freightRoRo: 1550, freightContainer: 2100, transitDays: '16 - 20 days', insuranceRate: 0.011 },
  'GERMANY_MOMBASA': { freightRoRo: 1950, freightContainer: 2600, transitDays: '28 - 34 days', insuranceRate: 0.013 },
  'GERMANY_DURBAN': { freightRoRo: 1850, freightContainer: 2500, transitDays: '24 - 28 days', insuranceRate: 0.012 },
  'GERMANY_JEBEL_ALI': { freightRoRo: 1450, freightContainer: 2000, transitDays: '18 - 22 days', insuranceRate: 0.011 },

  // UAE ORIGIN
  'UAE_MOMBASA': { freightRoRo: 1350, freightContainer: 1850, transitDays: '12 - 16 days', insuranceRate: 0.010 },
  'UAE_DAR_ES_SALAAM': { freightRoRo: 1400, freightContainer: 1900, transitDays: '14 - 18 days', insuranceRate: 0.010 },
  'UAE_DURBAN': { freightRoRo: 1650, freightContainer: 2200, transitDays: '18 - 22 days', insuranceRate: 0.012 },
  'UAE_LAGOS': { freightRoRo: 2100, freightContainer: 2800, transitDays: '28 - 34 days', insuranceRate: 0.014 },
  'UAE_TEMA': { freightRoRo: 2050, freightContainer: 2750, transitDays: '26 - 32 days', insuranceRate: 0.014 },

  // UK ORIGIN
  'UK_LAGOS': { freightRoRo: 1650, freightContainer: 2200, transitDays: '16 - 20 days', insuranceRate: 0.011 },
  'UK_TEMA': { freightRoRo: 1600, freightContainer: 2150, transitDays: '15 - 19 days', insuranceRate: 0.011 },
  'UK_MOMBASA': { freightRoRo: 1950, freightContainer: 2650, transitDays: '26 - 32 days', insuranceRate: 0.013 }
};

/**
 * Calculates accurate ocean freight, insurance, and CIF shipping estimate
 */
export const calculateShippingEstimate = (originCountry = 'USA', destinationPortId = 'LAGOS', vehiclePrice = 25000) => {
  const normOrigin = (originCountry || 'USA').toUpperCase();
  const normDest = (destinationPortId || 'LAGOS').toUpperCase();

  const routeKey = `${normOrigin}_${normDest}`;
  const defaultRate = {
    freightRoRo: 1800,
    freightContainer: 2450,
    transitDays: '20 - 28 days',
    insuranceRate: 0.012
  };

  const rateData = SHIPPING_RATES_MATRIX[routeKey] || defaultRate;
  const insuranceAmount = Math.max(180, Math.round(Number(vehiclePrice) * rateData.insuranceRate));
  const cifRoRoTotal = Number(vehiclePrice) + rateData.freightRoRo + insuranceAmount;
  const cifContainerTotal = Number(vehiclePrice) + rateData.freightContainer + insuranceAmount;

  const destPortObj = TARGET_DESTINATION_PORTS.find(p => p.id === normDest) || TARGET_DESTINATION_PORTS[1];

  return {
    originCountry: normOrigin,
    destinationPort: destPortObj,
    roRoFreight: rateData.freightRoRo,
    containerFreight: rateData.freightContainer,
    transitDays: rateData.transitDays,
    insuranceAmount,
    cifRoRoTotal,
    cifContainerTotal
  };
};
