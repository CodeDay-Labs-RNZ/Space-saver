import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


/* utility function checking if token is expired */
const isTokenExpired = (decoded: DecodedToken) => {
  const currTime = Date.now() / 1000;
  return decoded.exp < currTime;
}


interface AuthContextProps {
  isAuthenticated: boolean;
  username: string | null;
  email: string | null;
  clientId: string | null;
  login: (token: string, username: string, email: string, clientId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface DecodedToken {
  username: string;
  email: string;
  id: string;
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
  console.log('Context in useAuth', context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    () => localStorage.getItem('Token')
  );
  const [username, setUserName] = useState<string | null>(null);
  const [email, setUserEmail] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  
  const isAuthenticated = !!accessToken

  const login = (token: string) => {
    try {
      const decoded = decodeJWT(token);
      console.log("Decoded JWT:", decoded)
      if (decoded && decoded.username && decoded.email && decoded.id) {
        console.log('Setting access token:', token);
        localStorage.setItem('Token', token);
        setAccessToken(token);
        setUserName(decoded.username);
        setUserEmail(decoded.email);
        setClientId(decoded.id);
        console.log('Updated state:', {token, username: decoded.username, email: decoded.email, id: decoded.id});
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
      /* checking if token is expired */
      if (isTokenExpired(decoded)) {
        logout();
      } else {
        setUserName(decoded.username);
        setUserEmail(decoded.email);
        setClientId(decoded.id);
      }
    }
  }, [accessToken]);

  useEffect(() => {
    console.log('ClientId and Token in CreateBooking:', clientId, accessToken);
  }, [])


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
    clientId,
    login, 
    logout, 
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}
