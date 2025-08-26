'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth0Client, getUser, loginWithRedirect, logout as auth0Logout } from '../../lib/auth0';

interface Auth0ContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const Auth0Context = createContext<Auth0ContextType | null>(null);

export function Auth0Provider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const auth0Client = await getAuth0Client();
        if (auth0Client) {
          const isAuth = await auth0Client.isAuthenticated();
          setIsAuthenticated(isAuth);
          
          if (isAuth) {
            const userData = await getUser();
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async () => {
    await loginWithRedirect();
  };

  const logout = async () => {
    await auth0Logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Auth0Context.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </Auth0Context.Provider>
  );
}

export const useAuth0 = () => {
  const context = useContext(Auth0Context);
  if (!context) {
    throw new Error('useAuth0 must be used within an Auth0Provider');
  }
  return context;
};
