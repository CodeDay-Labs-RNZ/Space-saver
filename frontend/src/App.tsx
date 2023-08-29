import React from 'react';
import './styles/App.css';
import './styles/Calendar.css';
import LandingPage from './pages/LandingPage';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Registration from "./pages/Registration";
import Calendar from "./pages/CalendarPage";
import CreateBooking from './pages/CreateBooking';
import { AuthProvider } from './context/AuthContext';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// testing new branch creation

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <React.Fragment>
          <Router>
              <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/booking' element={<CreateBooking/>}/>
                <Route path='/calendar' element={<Calendar onBookingData={() => {}} />}/>
                <Route path='/contact' element={<Contact/>}/>
              {/*<Route path='/services' element={<Services/>}/>*/}
              </Routes>
          </Router>
        </React.Fragment>
      </AuthProvider>
    </div>
  );
}

export default App;
