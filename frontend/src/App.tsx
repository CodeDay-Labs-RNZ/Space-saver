import React from 'react';
import './styles/App.css';
import './styles/Calendar.css';
import LandingPage from './pages/LandingPage';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Calendar from "./pages/CalendarPage";
import CreateBooking from './pages/CreateBooking';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Router>
            <Routes>
              <Route path='/' element={<LandingPage/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
            {/*<Route path='/services' element={<Services/>}/>*/}

              <Route path='/booking' element={<CreateBooking/>}/>
              <Route path='/calendar' element={<Calendar onBookingData={() => {}} />}/>
              <Route path='/contact' element={<Contact/>}/>
            </Routes>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
