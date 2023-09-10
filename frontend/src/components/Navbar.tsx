import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const styles = require('../styles/Navbar.css');

/**
 * Navbar functional component that displays navigation links, 
 * user information, and a logout button.
 * 
 * @returns Navbar component is returning a JSX element.
 */
const Navbar: React.FC = () => {

  const navigate = useNavigate();
  const { isAuthenticated, username, logout } = useAuth();

  const handleLogout= () => {
    // handling logout logic  
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
        <Link to='/aboutus'>About Us</Link>
        <span>Hello: {isAuthenticated ? username : 'Guest'}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar