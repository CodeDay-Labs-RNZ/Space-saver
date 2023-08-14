import React from 'react';
import './styles/App.css';
import LandingPage from './pages/LandingPage';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
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
