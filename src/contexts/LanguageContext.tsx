'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

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
  // 服务端和客户端首次渲染保持一致（en），挂载后再读取本地偏好，避免 hydration 不匹配
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lang') as Lang | null;
      if (saved === 'zh' || saved === 'en') setLang(saved);
    } catch {
      // localStorage 不可用时保持默认
    }
  }, []);

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
