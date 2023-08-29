import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  username: string | null;
  email: string | null;
  login: (token: string, username: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface DecodedToken {
  username: string;
  email: string;
  iat: number;  // issued at
  exp: number;  // expiration time
  // ... any other fields that might be in the token
}

const decodeJWT = (token: string): DecodedToken => {
  /* decoding token to get username/email */
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const payload = JSON.parse(window.atob(base64));
  return payload;
}


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('Token'));
  const [username, setUserName] = useState<string | null>(null);
  const [email, setUserEmail] = useState<string | null>(null);
  
  const isAuthenticated = !!accessToken

  const login = (token: string) => {
    try {
      const decoded = decodeJWT(token);
      console.log("Decoded JWT:", decoded)
      if (decoded && decoded.username && decoded.email) {
        localStorage.setItem('Token', token);
        setAccessToken(token);
        setUserName(decoded.username);
        setUserEmail(decoded.email);
        console.log('Updated state:', {token, username: decoded.username, email: decoded.email});
      } else {
        console.error('JWT did not contain username or email')
      }
    } catch (error) {
      console.error('Failed to decode JWT:', error);
    }
  }

  useEffect(() => {
    if (accessToken) {
      const decoded = decodeJWT(accessToken);
      setUserName(decoded.username);
      setUserEmail(decoded.email);
    }
  }, [accessToken]);


  const logout = () => {
    localStorage.removeItem('Token');
    setAccessToken(null);
    setUserName(null);
    setUserEmail(null);
  }

  const value = {
    isAuthenticated,
    username, 
    email, 
    login, 
    logout, 
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}
