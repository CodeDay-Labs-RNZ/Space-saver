import React, { useEffect } from 'react';
import './styles/App.css';
import './styles/Calendar.css';
import LandingPage from './pages/LandingPage';
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Registration from "./pages/Registration";
import Calendar from "./pages/CalendarPage";
import CreateBooking from './pages/CreateBooking';
import About from './pages/AboutUs';
import Navbar from './components/Navbar';
import UpdateDeleteBooking from './pages/UpdateDeleteBooking';
import { AuthProvider, useAuth } from './context/AuthContext';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </div>
  )
}

const AppContent = () => {

  const { isAuthenticated } = useAuth();
  useEffect(() => {
    console.log('Is authenticated:', isAuthenticated);
  }, [isAuthenticated]);

  return (
      <React.Fragment>
        <Router>
          {isAuthenticated ? <Navbar /> :  null}
            <Routes>
              <Route path='/' element={<LandingPage/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/registration' element={<Registration/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/booking' element={<CreateBooking/>}/>
              <Route path='/updateDeleteBookings' element={<UpdateDeleteBooking/>}/>
              <Route path='/calendar' element={<Calendar onBookingData={() => {}} />}/>
              <Route path='/contact' element={<Contact/>}/>
            </Routes>
        </Router>
      </React.Fragment>
  );
}

export default App;
