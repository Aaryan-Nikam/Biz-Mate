
import React, { createContext, useContext, useState, useEffect } from 'react';
import { NicheType } from '@/components/NicheSelection';

interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: 'homeowner' | 'provider';
  niche?: NicheType;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, password: string) => boolean;
  setUserRole: (role: 'homeowner' | 'provider') => void;
  setUserNiche: (niche: NicheType) => void;
  clearUserNiche: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate checking for a user session
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = (email: string, password: string) => {
    // In a real app, this would call an API
    const names = 'Demo User'.split(' ');
    setUser({
      id: '1',
      name: 'Demo User',
      firstName: names[0],
      lastName: names.length > 1 ? names.slice(1).join(' ') : '',
      email,
      role: user?.role || 'homeowner',
      niche: user?.niche
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (name: string, email: string, password: string) => {
    // In a real app, this would call an API
    const names = name.split(' ');
    setUser({
      id: '1',
      name,
      firstName: names[0],
      lastName: names.length > 1 ? names.slice(1).join(' ') : '',
      email,
      role: user?.role || 'homeowner',
      niche: user?.niche
    });
    return true;
  };

  const setUserRole = (role: 'homeowner' | 'provider') => {
    setUser(prev => {
      if (!prev) {
        return { 
          id: '1', 
          name: 'Guest', 
          firstName: 'Guest', 
          lastName: '', 
          email: '', 
          role 
        };
      }
      return { ...prev, role };
    });
  };

  const setUserNiche = (niche: NicheType) => {
    setUser(prev => {
      if (!prev) {
        return { 
          id: '1', 
          name: 'Guest', 
          firstName: 'Guest', 
          lastName: '', 
          email: '', 
          role: 'homeowner', 
          niche 
        };
      }
      return { ...prev, niche };
    });
  };
  
  const clearUserNiche = () => {
    setUser(prev => prev ? { ...prev, niche: undefined } : null);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user, 
      login, 
      logout, 
      signup, 
      setUserRole,
      setUserNiche,
      clearUserNiche
    }}>
      {children}
    </UserContext.Provider>
  );
};
