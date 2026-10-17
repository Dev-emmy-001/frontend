import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Languages } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

/**
 * LanguageSwitcher Component
 * Instant toggle to switch the entire application across major automotive trading languages:
 * - English (en) 🇺🇸
 * - French (fr) 🇫🇷
 * - Spanish (es) 🇪🇸
 * - Arabic (ar) 🇸🇦 (RTL)
 * - Japanese (ja) 🇯🇵
 * - Portuguese (pt) 🇧🇷
 */
export const LanguageSwitcher = ({ isDark = true, compact = false, showLabel = true }) => {
  const { 
    language, 
    setLanguage, 
    currentLanguage, 
    supportedLanguages, 
    isRTL,
    t 
  } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelectLanguage = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="position-relative d-inline-block font-sans" ref={dropdownRef}>
      {/* Trigger Button */}
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
        aria-haspopup="listbox"
        title={t('languageSwitcher.selectLanguage', 'Select Language')}
      >
        <span style={{ fontSize: '13px' }}>{currentLanguage.flag}</span>
        <span className="text-uppercase tracking-wider">
          {compact ? currentLanguage.code : currentLanguage.code.toUpperCase()}
        </span>
        {showLabel && !compact && (
          <span className="d-none d-sm-inline fw-semibold opacity-90" style={{ fontSize: '11px' }}>
            ({currentLanguage.nativeName})
          </span>
        )}
        <ChevronDown 
          size={13} 
          className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          style={{ transition: 'transform 0.2s ease', transform: isOpen ? 'rotate(180deg)' : 'none' }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop click dismiss overlay */}
          <div 
            className="position-fixed top-0 start-0 w-100 h-100" 
            style={{ zIndex: 1045 }} 
            onClick={() => setIsOpen(false)} 
          />

          <div 
            className={`position-absolute mt-2 rounded-3 shadow-lg p-2 border ${
              isRTL ? 'start-0' : 'end-0'
            } ${
              isDark 
                ? 'bg-dark text-white border-secondary' 
                : 'bg-white text-dark border-secondary border-opacity-25'
            }`}
            style={{ 
              width: '300px', 
              zIndex: 1055, 
              maxHeight: '420px', 
              overflowY: 'auto',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)'
            }}
            role="listbox"
          >
            {/* Header info */}
            <div className={`p-2 border-bottom mb-1 d-flex justify-content-between align-items-center ${isDark ? 'border-secondary' : 'border-light'}`}>
              <div className="d-flex align-items-center gap-1.5">
                <Globe size={15} className="text-danger" />
                <div>
                  <strong className={`d-block small ${isDark ? 'text-white' : 'text-dark'}`} style={{ fontSize: '12px' }}>
                    {t('languageSwitcher.tradingLanguages', 'Trading Languages')}
                  </strong>
                  <small className={isDark ? 'text-white-50' : 'text-muted'} style={{ fontSize: '10px' }}>
                    {t('languageSwitcher.instantToggleDesc', 'Instant translation across all pages')}
                  </small>
                </div>
              </div>
              <span className="badge bg-danger bg-opacity-25 text-danger small px-2 py-0.5" style={{ fontSize: '10px' }}>
                i18n
              </span>
            </div>

            {/* Language List Options */}
            <div className="d-flex flex-column gap-1">
              {supportedLanguages.map((lang) => {
                const isSelected = language === lang.code;

                return (
                  <button
                    key={lang.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`btn btn-sm d-flex align-items-center justify-content-between text-start p-2 rounded-2 border-0 transition-all ${
                      isSelected 
                        ? 'bg-danger text-white fw-bold shadow-xs' 
                        : isDark
                          ? 'text-white-50 hover-bg-dark hover-text-white'
                          : 'text-dark hover-bg-light'
                    }`}
                    style={{
                      transition: 'background-color 0.15s ease, color 0.15s ease'
                    }}
                  >
                    <div className="d-flex align-items-center gap-2.5">
                      <span style={{ fontSize: '18px' }} aria-hidden="true">
                        {lang.flag}
                      </span>
                      <div>
                        <div className="d-flex align-items-center gap-1.5">
                          <span className={`fw-bold ${isSelected ? 'text-white' : isDark ? 'text-white' : 'text-dark'}`} style={{ fontSize: '13px' }}>
                            {lang.nativeName}
                          </span>
                          <span className="small opacity-75" style={{ fontSize: '11px' }}>
                            ({lang.name})
                          </span>
                          {lang.dir === 'rtl' && (
                            <span 
                              className={`badge ${isSelected ? 'bg-white text-danger' : 'bg-secondary bg-opacity-25 text-warning'} px-1.5 py-0.5`}
                              style={{ fontSize: '9px', fontWeight: 'bold' }}
                            >
                              RTL
                            </span>
                          )}
                        </div>
                        <small className="d-block opacity-75" style={{ fontSize: '10px' }}>
                          {lang.region}
                        </small>
                      </div>
                    </div>

                    <div className="text-end ps-2">
                      {isSelected ? (
                        <span className="badge bg-white text-danger d-flex align-items-center gap-1 px-1.5 py-0.5" style={{ fontSize: '10px' }}>
                          <Check size={11} /> {t('languageSwitcher.activeBadge', 'Active')}
                        </span>
                      ) : (
                        <span className="text-uppercase small font-monospace opacity-50" style={{ fontSize: '10px' }}>
                          {lang.code}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer note */}
            <div className={`mt-2 pt-2 border-top text-center ${isDark ? 'border-secondary' : 'border-light'}`}>
              <small className={isDark ? 'text-white-50' : 'text-muted'} style={{ fontSize: '10px' }}>
                🌐 Auto-detects & persists your preference
              </small>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
