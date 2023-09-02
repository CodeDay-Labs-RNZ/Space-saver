import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const styles = require('../styles/Navbar.css');

const Navbar: React.FC = () => {

  const navigate = useNavigate();
  const { isAuthenticated, username, logout } = useAuth();

  const handleLogout= () => {
    /* handle logout logic here  */
    try {
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }

  }

  return (
    <div className='navbar'>
      <div className='navbar-content'>
        <Link to='/dashboard'>Home</Link>
        <Link to='/updateDeleteBookings'>Check Bookings</Link>
        <span>Hello: {isAuthenticated ? username : 'Guest'}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar