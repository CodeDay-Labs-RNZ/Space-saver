import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  
  const isAuthenticated = !!accessToken

  const login = (token: string) => {
    setAccessToken(token);
  }


  const logout = () => {
    setAccessToken(null);
  }

  const value = {
    isAuthenticated,
    login, 
    logout, 
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}
