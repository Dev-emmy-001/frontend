import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Comprehensive Currency Metadata
export const SUPPORTED_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', defaultRate: 1.0, decimals: 0 },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', flag: '🇳🇬', defaultRate: 1540.0, decimals: 0 },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', flag: '🇰🇪', defaultRate: 130.5, decimals: 0 },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', flag: '🇬🇭', defaultRate: 15.6, decimals: 0 },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', flag: '🇿🇦', defaultRate: 18.4, decimals: 0 },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', defaultRate: 0.92, decimals: 0 },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', defaultRate: 0.79, decimals: 0 },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', flag: '🇦🇪', defaultRate: 3.67, decimals: 0 },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', flag: '🇨🇦', defaultRate: 1.38, decimals: 0 },
  { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar', flag: '🇦🇺', defaultRate: 1.52, decimals: 0 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵', defaultRate: 152.0, decimals: 0 }
];

// Timezone to Country & Currency Mapping for Instant Auto-Detection
const TIMEZONE_TO_CURRENCY_MAP = {
  'Africa/Lagos': { code: 'NGN', country: 'Nigeria', flag: '🇳🇬' },
  'Africa/Nairobi': { code: 'KES', country: 'Kenya', flag: '🇰🇪' },
  'Africa/Accra': { code: 'GHS', country: 'Ghana', flag: '🇬🇭' },
  'Africa/Johannesburg': { code: 'ZAR', country: 'South Africa', flag: '🇿🇦' },
  'Africa/Dar_es_Salaam': { code: 'KES', country: 'Tanzania', flag: '🇹🇿' },
  'Europe/London': { code: 'GBP', country: 'United Kingdom', flag: '🇬🇧' },
  'Europe/Berlin': { code: 'EUR', country: 'Germany', flag: '🇩🇪' },
  'Europe/Paris': { code: 'EUR', country: 'France', flag: '🇫🇷' },
  'Europe/Amsterdam': { code: 'EUR', country: 'Netherlands', flag: '🇳🇱' },
  'Asia/Dubai': { code: 'AED', country: 'United Arab Emirates', flag: '🇦🇪' },
  'Asia/Tokyo': { code: 'JPY', country: 'Japan', flag: '🇯🇵' },
  'America/Toronto': { code: 'CAD', country: 'Canada', flag: '🇨🇦' },
  'America/Vancouver': { code: 'CAD', country: 'Canada', flag: '🇨🇦' },
  'Australia/Sydney': { code: 'AUD', country: 'Australia', flag: '🇦🇺' }
};

// ISO Country Code to Currency Map
const COUNTRY_CODE_TO_CURRENCY = {
  'NG': { code: 'NGN', country: 'Nigeria', flag: '🇳🇬' },
  'KE': { code: 'KES', country: 'Kenya', flag: '🇰🇪' },
  'GH': { code: 'GHS', country: 'Ghana', flag: '🇬🇭' },
  'ZA': { code: 'ZAR', country: 'South Africa', flag: '🇿🇦' },
  'GB': { code: 'GBP', country: 'United Kingdom', flag: '🇬🇧' },
  'AE': { code: 'AED', country: 'United Arab Emirates', flag: '🇦🇪' },
  'DE': { code: 'EUR', country: 'Germany', flag: '🇩🇪' },
  'FR': { code: 'EUR', country: 'France', flag: '🇫🇷' },
  'NL': { code: 'EUR', country: 'Netherlands', flag: '🇳🇱' },
  'CA': { code: 'CAD', country: 'Canada', flag: '🇨🇦' },
  'AU': { code: 'AUD', country: 'Australia', flag: '🇦🇺' },
  'JP': { code: 'JPY', country: 'Japan', flag: '🇯🇵' },
  'US': { code: 'USD', country: 'United States', flag: '🇺🇸' }
};

const CurrencyContext = createContext(null);

export const CurrencyProvider = ({ children }) => {
  // Initial fallback rates
  const initialRates = useMemo(() => {
    const map = {};
    SUPPORTED_CURRENCIES.forEach(c => { map[c.code] = c.defaultRate; });
    return map;
  }, []);

  const [currency, setCurrencyState] = useState(() => {
    return localStorage.getItem('motors_selected_currency') || 'USD';
  });

  const [detectedCountry, setDetectedCountry] = useState(() => {
    return localStorage.getItem('motors_detected_country') || 'United States';
  });

  const [rates, setRates] = useState(() => {
    try {
      const cached = localStorage.getItem('motors_fx_rates');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.rates && Date.now() - parsed.timestamp < 3600000) {
          return parsed.rates;
        }
      }
    } catch (e) {
      // Ignore cache parse error
    }
    return initialRates;
  });

  const [isLiveRate, setIsLiveRate] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // 1. Auto-detect buyer location on mount
  useEffect(() => {
    const hasManualChoice = localStorage.getItem('motors_user_manual_currency');
    
    // Quick timezone heuristic
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const tzMatch = TIMEZONE_TO_CURRENCY_MAP[tz];
      if (tzMatch) {
        setDetectedCountry(tzMatch.country);
        localStorage.setItem('motors_detected_country', tzMatch.country);
        if (!hasManualChoice) {
          setCurrencyState(tzMatch.code);
          localStorage.setItem('motors_selected_currency', tzMatch.code);
        }
      }
    } catch (e) {
      console.warn('Timezone detection error:', e);
    }

    // IP Geolocation API lookup (CORS friendly, fast lookup)
    const detectViaIP = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);
        
        const res = await fetch('https://api.country.is/', { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (res.ok) {
          const data = await res.json();
          if (data && data.country && COUNTRY_CODE_TO_CURRENCY[data.country]) {
            const match = COUNTRY_CODE_TO_CURRENCY[data.country];
            setDetectedCountry(match.country);
            localStorage.setItem('motors_detected_country', match.country);

            if (!hasManualChoice) {
              setCurrencyState(match.code);
              localStorage.setItem('motors_selected_currency', match.code);
            }
          }
        }
      } catch (err) {
        // Fallback gracefully to timezone detection
      }
    };

    detectViaIP();
  }, []);

  // 2. Fetch live FX rates from open exchange API
  useEffect(() => {
    const fetchLiveRates = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        // Try primary live FX provider
        const res = await fetch('https://open.er-api.com/v6/latest/USD', { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data && data.rates) {
            const merged = { ...initialRates };
            SUPPORTED_CURRENCIES.forEach(c => {
              if (data.rates[c.code]) {
                merged[c.code] = data.rates[c.code];
              }
            });

            setRates(merged);
            setIsLiveRate(true);
            setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            localStorage.setItem('motors_fx_rates', JSON.stringify({
              rates: merged,
              timestamp: Date.now()
            }));
            return;
          }
        }
      } catch (err) {
        console.warn('Live FX primary fetch note: falling back to secondary or default cached rates.', err.message);
      }

      // Secondary fallback endpoint
      try {
        const res2 = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (res2.ok) {
          const data2 = await res2.json();
          if (data2 && data2.rates) {
            const merged2 = { ...initialRates };
            SUPPORTED_CURRENCIES.forEach(c => {
              if (data2.rates[c.code]) {
                merged2[c.code] = data2.rates[c.code];
              }
            });
            setRates(merged2);
            setIsLiveRate(true);
            setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          }
        }
      } catch (fallbackErr) {
        console.warn('Using standard base FX rates.');
      }
    };

    fetchLiveRates();
  }, [initialRates]);

  // Set Currency handler
  const setCurrency = (newCode) => {
    const valid = SUPPORTED_CURRENCIES.find(c => c.code === newCode);
    if (valid) {
      setCurrencyState(newCode);
      localStorage.setItem('motors_selected_currency', newCode);
      localStorage.setItem('motors_user_manual_currency', 'true');
    }
  };

  // Active currency metadata
  const currencyInfo = useMemo(() => {
    return SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];
  }, [currency]);

  /**
   * Convert an amount in USD to current active currency
   * @param {number} amountInUSD
   * @param {string} [targetCurrency]
   * @returns {number}
   */
  const convert = (amountInUSD = 0, targetCurrency = currency) => {
    const num = Number(amountInUSD) || 0;
    const rate = rates[targetCurrency] || 1.0;
    return Math.round(num * rate);
  };

  /**
   * Format converted price with active symbol and locale formatting
   * e.g. ₦41,059,500 or KSh 3,450,000 or $26,490
   * @param {number} amountInUSD
   * @param {string} [targetCurrency]
   * @returns {string}
   */
  const formatPrice = (amountInUSD = 0, targetCurrency = currency) => {
    if (amountInUSD == null || isNaN(Number(amountInUSD))) return 'Call for Price';
    const targetObj = SUPPORTED_CURRENCIES.find(c => c.code === targetCurrency) || currencyInfo;
    const convertedVal = convert(amountInUSD, targetObj.code);
    return `${targetObj.symbol}${convertedVal.toLocaleString()}`;
  };

  /**
   * Get dual price breakdown: Converted Local + Original USD
   */
  const getDualPrice = (amountInUSD = 0) => {
    const num = Number(amountInUSD) || 0;
    const local = formatPrice(num);
    const isUsd = currency === 'USD';
    return {
      local,
      base: `$${num.toLocaleString()} USD`,
      isUsd
    };
  };

  const value = {
    currency,
    setCurrency,
    currencyInfo,
    detectedCountry,
    supportedCurrencies: SUPPORTED_CURRENCIES,
    rates,
    isLiveRate,
    lastUpdated,
    convert,
    formatPrice,
    getDualPrice
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return ctx;
};

export default CurrencyContext;
