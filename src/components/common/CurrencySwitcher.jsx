import React, { useState } from 'react';
import { Globe, ChevronDown, Check, Zap, Sparkles } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

/**
 * CurrencySwitcher Component
 * Displays auto-detected buyer country and allows seamless switching of currencies
 * with live real-time FX rate indicators.
 */
export const CurrencySwitcher = ({ isDark = true, showCountry = true }) => {
  const { 
    currency, 
    setCurrency, 
    currencyInfo, 
    supportedCurrencies, 
    detectedCountry, 
    isLiveRate,
    rates 
  } = useCurrency();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="position-relative d-inline-block font-sans">
      <div className="d-flex align-items-center gap-2">
        
        {/* Auto-Detected Country Badge */}
        {showCountry && detectedCountry && (
          <span 
            className={`badge d-none d-md-inline-flex align-items-center gap-1.5 py-1 px-2 fw-semibold ${
              isDark 
                ? 'bg-dark text-white-50 border border-secondary border-opacity-50' 
                : 'bg-light text-secondary border border-light'
            }`}
            style={{ fontSize: '11px', letterSpacing: '0.3px' }}
            title={`Location auto-detected based on your timezone & network: ${detectedCountry}`}
          >
            <span style={{ fontSize: '12px' }}>{currencyInfo.flag}</span>
            <span>{detectedCountry}</span>
            {isLiveRate && (
              <span className="text-success fw-bold d-inline-flex align-items-center gap-0.5" style={{ fontSize: '9px' }}>
                <span className="p-0.5 rounded-circle bg-success d-inline-block" style={{ width: '5px', height: '5px' }}></span>
                Live FX
              </span>
            )}
          </span>
        )}

        {/* Currency Selector Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`btn btn-sm d-flex align-items-center gap-1.5 py-1 px-2.5 rounded-2 transition-all fw-bold ${
            isDark 
              ? 'btn-dark text-white border-secondary hover-text-white' 
              : 'btn-light text-dark border border-secondary border-opacity-25'
          }`}
          style={{ fontSize: '12px' }}
          aria-expanded={isOpen}
          title="Change currency and view converted prices"
        >
          <span style={{ fontSize: '13px' }}>{currencyInfo.flag}</span>
          <span>{currencyInfo.code} ({currencyInfo.symbol})</span>
          <ChevronDown size={13} className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop click dismiss */}
          <div 
            className="position-fixed top-0 start-0 w-100 h-100" 
            style={{ zIndex: 1040 }} 
            onClick={() => setIsOpen(false)} 
          />

          <div 
            className="position-absolute end-0 mt-2 bg-dark text-white border border-secondary rounded-3 shadow-lg p-2"
            style={{ 
              width: '280px', 
              zIndex: 1050, 
              maxHeight: '380px', 
              overflowY: 'auto' 
            }}
          >
            <div className="p-2 border-bottom border-secondary mb-1 d-flex justify-content-between align-items-center">
              <div>
                <strong className="d-block small text-white">Select Currency</strong>
                <small className="text-white-50" style={{ fontSize: '10px' }}>
                  Auto-converts all vehicle prices live
                </small>
              </div>
              {isLiveRate && (
                <span className="badge bg-success bg-opacity-25 text-success small" style={{ fontSize: '10px' }}>
                  ● Live FX
                </span>
              )}
            </div>

            <div className="d-flex flex-column gap-1">
              {supportedCurrencies.map((c) => {
                const isSelected = currency === c.code;
                const rateVal = rates[c.code] || c.defaultRate;
                
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setCurrency(c.code);
                      setIsOpen(false);
                    }}
                    className={`btn btn-sm d-flex align-items-center justify-content-between text-start p-2 rounded-2 border-0 transition-all ${
                      isSelected 
                        ? 'bg-danger text-white fw-bold shadow-xs' 
                        : 'text-white-50 hover-bg-dark hover-text-white'
                    }`}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: '15px' }}>{c.flag}</span>
                      <div>
                        <div className="d-flex align-items-center gap-1">
                          <span className={isSelected ? 'text-white' : 'text-white'}>{c.code}</span>
                          <span className="small opacity-75">({c.symbol})</span>
                        </div>
                        <small className="d-block opacity-75" style={{ fontSize: '10px' }}>{c.name}</small>
                      </div>
                    </div>

                    <div className="text-end">
                      {isSelected ? (
                        <Check size={14} className="text-white" />
                      ) : (
                        <small className="text-white-50 font-monospace" style={{ fontSize: '10px' }}>
                          1 USD = {c.symbol}{Number(rateVal).toLocaleString()}
                        </small>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrencySwitcher;
