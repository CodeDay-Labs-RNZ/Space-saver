import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LOGOUT_URL = '/auth/signout'

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      /* make api call to invalidate token on server side */
      const token = localStorage.getItem('userToken');
      await axios.post(LOGOUT_URL, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      /* remove token from local storage */
      localStorage.removeItem('userToken');

      /* redirect to login */
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