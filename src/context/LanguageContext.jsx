import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { en } from '../translations/en';
import { hi } from '../translations/hi';

const translations = { en, hi };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem('freightsense-lang') || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    document.documentElement.lang = language === 'hi' ? 'hi' : 'en';
  }, [language]);

  const changeLanguage = (lang) => {
    const targetLang = lang === 'hi' ? 'hi' : 'en';
    setLanguageState(targetLang);
    try {
      localStorage.setItem('freightsense-lang', targetLang);
    } catch (e) {
      console.warn('Unable to persist language to localStorage', e);
    }
  };

  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let value = translations[language];
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Fallback to English
          let fallback = translations.en;
          for (const fk of keys) {
            if (fallback && typeof fallback === 'object' && fk in fallback) {
              fallback = fallback[fk];
            } else {
              return key; // Return the key itself as last resort
            }
          }
          return fallback;
        }
      }
      return value;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
