import { useState, useCallback } from 'react';

const STORAGE_KEY = 'blog_admin_password';

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(() => !!sessionStorage.getItem(STORAGE_KEY));

  const login = useCallback((password: string) => {
    sessionStorage.setItem(STORAGE_KEY, password);
    setIsAdmin(true);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAdmin(false);
  }, []);

  const getPassword = useCallback(() => {
    return sessionStorage.getItem(STORAGE_KEY) || '';
  }, []);

  return { isAdmin, login, logout, getPassword };
}
