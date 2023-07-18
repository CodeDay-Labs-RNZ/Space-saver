import * as React from 'react';
// bringing in icons for login, register, dashboard
// react-icons/fa <-fa(FontAwesome) one of many icon libraries, feel free to change to your liking
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
// links to pages
import {Link} from 'react-router-dom';


// in unordered list is the shell for login/register.. 
// ..if user isn't logged in, they should see login and register icon
// if user is logged in, they should see logout icon
// if user is logged in, they should see dashboard icon


function Header() {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Homepage</Link>
      </div>
      <ul>
        <li>
          <Link to='/login'>
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <FaUser /> Register
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header