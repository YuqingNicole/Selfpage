'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type Lang = 'en' | 'zh';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return (localStorage.getItem('lang') as Lang) || 'en';
    } catch {
      return 'en';
    }
  });

  const handleSetLang = (l: Lang) => {
    setLang(l);
    try { localStorage.setItem('lang', l); } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
