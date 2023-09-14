import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// '/auth/signout' endpoint
const LOGOUT_URL = '/auth/signout'

/**
 * LogoutButton functional component that handles logout functionality 
 * by making API call to invalidate token on the server side, 
 * removing the token from local storage, and redirecting to the login page.
 * 
 * @returns LogoutButton component is returning a button element with the text "Logout".
 */
const LogoutButton: React.FC = () => {

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // make api call to invalidate token on server side 
      const token = localStorage.getItem('userToken');
      await axios.post(LOGOUT_URL, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // remove token from local storage 
      localStorage.removeItem('userToken');
      // redirect to login page
      navigate('/login');

    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <button onClick={handleLogout}>Logout</button>
  );
 };

 export default LogoutButton;