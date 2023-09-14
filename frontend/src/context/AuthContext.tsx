import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


/**
 * function isTokenExpired checks if a decoded token has expired based on the current time.
 * 
 * @param {DecodedToken} decoded - `decoded`is an object that represents a decoded JWT (JSON Web Token). 
 * Contains info about token, such as the expiration time (`exp`) and other claims.
 * 
 * @returns boolean value indicating whether the token has expired or not.
 */
const isTokenExpired = (decoded: DecodedToken) => {
  const currTime = Date.now() / 1000;
  return decoded.exp < currTime;
}


/* interface defines the shape of the authentication context object. 
Specifies the properties and methods that will be available in the context. */
interface AuthContextProps {
  isAuthenticated: boolean;
  username: string | null;
  email: string | null;
  clientId: string | null;
  login: (token: string, username: string, email: string, clientId: string) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);


/* interface is defining the shape of props that can be passed to the `AuthProvider` component. 
Specifies that the `children` prop should be of type `ReactNode`, 
which means it can accept any valid React node as its value. 
This allows the `AuthProvider` component to wrap its child components and provide the authentication context to them. */
interface AuthProviderProps {
  children: ReactNode;
}


/* interface is defining the shape of an object that represents a decoded JWT (JSON Web Token). 
Specifies properties that can be present in the decoded token, such as `username`, `email`, `id`, 
`iat` (issued at), `exp` (expiration time), and any other fields that might be in the token. 
Interface helps ensure the decoded token object has the correct structure and properties when used in code. */
interface DecodedToken {
  username: string;
  email: string;
  id: string;
  iat: number;  // issued at
  exp: number;  // expiration time
  // ... any other fields that might be in the token
}


/**
 * function decodes JSON Web Token (JWT) to extract the username or email from its payload.
 * 
 * @param {string} token - `token` parameter represents a JSON Web Token (JWT).
 * JWTs used for securely transmitting information between parties as a JSON object. 
 * Consist of three parts separated by dots: the header, the payload, and the signature. 
 * function decoding the payload
 * 
 * @returns the decoded payload of the JWT token.
 */
const decodeJWT = (token: string): DecodedToken => {
  // decoding token to get username/email 
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const payload = JSON.parse(window.atob(base64));
  return payload;
}


/**
 * useAuth function, custom hook that returns the authentication context from the AuthContext.
 * 
 * @returns `useAuth` function returns the `context` object obtained from the `useContext` hook.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  // console.log('Context in useAuth', context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context;
}


/**
 * `AuthProvider` component is React context provider that manages authentication state,
 * including access token, username, email, and client ID, and provides login and logout functions.
 * 
 * @param  - `AuthProviderProps`: This is the type for the props that the `AuthProvider` component
 * accepts. likely includes any additional props that the component needs.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    () => localStorage.getItem('Token')
  );
  const [username, setUserName] = useState<string | null>(null);
  const [email, setUserEmail] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  
  const isAuthenticated = !!accessToken

/**
 * login function takes JWT token, decodes it, 
 * and sets the decoded values in the state if they exist, otherwise it logs an error.
 * 
 * @param {string} token - `token` represents a JSON Web Token (JWT). 
 * Used for authentication and contains encoded information about the user, such as their username, email, and ID.
 */
  const login = (token: string) => {
    try {
      const decoded = decodeJWT(token);
      // console.log("Decoded JWT:", decoded)
      if (decoded && decoded.username && decoded.email && decoded.id) {
        // console.log('Setting access token:', token);
        localStorage.setItem('Token', token);
        setAccessToken(token);
        setUserName(decoded.username);
        setUserEmail(decoded.email);
        setClientId(decoded.id);
      } else {
        console.error('JWT did not contain username or email')
      }
    } catch (error) {
      console.error('Failed to decode JWT:', error);
    }
  }


/* `useEffect` hook used to perform side effects in a functional component. 
In this case, `useEffect` hook is being used to check if the `accessToken` state variable has changed. */
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


/* useEffect hook used to perform side effects in a functional component. 
In this case, `useEffect` hook is being used to log values of `clientId` and `accessToken` 
to console when the component is first rendered. */
  useEffect(() => {
    console.log('ClientId and Token in CreateBooking:', clientId, accessToken);
  }, [])


/**
 * logout function removes 'Token' item from localStorage and sets access token, username, and user email to null.
 */
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
