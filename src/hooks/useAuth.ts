import { useState, useEffect } from "react";

const ADMIN_EMAIL = "admin@institutohorizonte.edu.br";
const ADMIN_PASSWORD = "Horizonte@2027";
const SESSION_KEY = "horizonte_admin_session";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(SESSION_KEY) === "true";
  });

  useEffect(() => {
    localStorage.setItem(SESSION_KEY, String(isAuthenticated));
  }, [isAuthenticated]);

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(SESSION_KEY);
  };

  return { isAuthenticated, login, logout };
}
