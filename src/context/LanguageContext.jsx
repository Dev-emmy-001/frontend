import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { SUPPORTED_LANGUAGES, translations } from '../translations';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'motors_selected_lang';

/**
 * Detect browser's preferred language matching one of our supported languages
 */
const detectBrowserLanguage = () => {
  try {
    const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage];
    for (const lang of browserLangs) {
      if (!lang) continue;
      const lower = lang.toLowerCase();
      // Direct match (e.g., 'fr', 'es', 'ar', 'ja', 'pt', 'en')
      const match = SUPPORTED_LANGUAGES.find(l => lower.startsWith(l.code));
      if (match) return match.code;
    }
  } catch (e) {
    console.warn('Language auto-detection note:', e);
  }
  return 'en';
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
      return saved;
    }
    return detectBrowserLanguage();
  });

  // Current language metadata object
  const currentLanguage = useMemo(() => {
    return SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];
  }, [language]);

  const isRTL = currentLanguage.dir === 'rtl';

  // Apply document attributes on language change
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = currentLanguage.dir;
    
    if (isRTL) {
      document.documentElement.classList.add('lang-rtl');
      document.body.classList.add('lang-rtl');
    } else {
      document.documentElement.classList.remove('lang-rtl');
      document.body.classList.remove('lang-rtl');
    }
  }, [language, currentLanguage, isRTL]);

  // Set Language Handler
  const setLanguage = useCallback((code) => {
    const target = SUPPORTED_LANGUAGES.find(l => l.code === code);
    if (target) {
      setLanguageState(code);
      localStorage.setItem(STORAGE_KEY, code);
      localStorage.setItem('motors_user_manual_lang', 'true');
    }
  }, []);

  /**
   * Translation Helper
   * Supports dot-notation keys: e.g. t('nav.home')
   * Supports variable interpolation: e.g. t('inventory.showing', { count: 5 })
   * Graceful fallback to English and then to provided fallback text
   */
  const t = useCallback((keyPath, fallbackOrParams = '', params = {}) => {
    let actualFallback = typeof fallbackOrParams === 'string' ? fallbackOrParams : '';
    let actualParams = typeof fallbackOrParams === 'object' && fallbackOrParams !== null ? fallbackOrParams : params;

    const resolveKey = (dict, path) => {
      if (!dict || !path) return null;
      const parts = path.split('.');
      let current = dict;
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          return null;
        }
      }
      return typeof current === 'string' ? current : null;
    };

    // 1. Try active language
    let result = resolveKey(translations[language], keyPath);

    // 2. Fallback to English
    if (!result && language !== 'en') {
      result = resolveKey(translations.en, keyPath);
    }

    // 3. Fallback to provided string or the key name itself
    if (!result) {
      result = actualFallback || keyPath.split('.').pop();
    }

    // 4. Interpolate variables: {varName} -> params[varName]
    if (actualParams && typeof actualParams === 'object') {
      Object.keys(actualParams).forEach(k => {
        result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), actualParams[k]);
      });
    }

    return result;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    currentLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    isRTL,
    dir: currentLanguage.dir,
    t
  }), [language, setLanguage, currentLanguage, isRTL, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

export const useLanguage = useTranslation;

export default LanguageContext;
