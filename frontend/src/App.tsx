import React from 'react';
import './styles/App.css';
import LandingPage from './components/LandingPage';
import Login from "./pages/login";
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
            </Routes>
          </div>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
