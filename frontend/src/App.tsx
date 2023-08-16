import React from 'react';
import './styles/App.css';
import './styles/Calendar.css';
import LandingPage from './components/LandingPage';
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Calendar from "./pages/calendar";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Router>
          <div className='container'>
            <Routes>
              <Route path='/' element={<LandingPage/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/calendar' element={<Calendar/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/contact' element={<Contact/>}/>
            </Routes>
          </div>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
