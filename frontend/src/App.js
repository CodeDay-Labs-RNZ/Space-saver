import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'; 
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header'

// <Route path='/' element={<Dashboard />} /> <-- routing to diff pgs if those pgs have been created

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
