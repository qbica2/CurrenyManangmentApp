import React from 'react'
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Main from './components/Main'
import Error from './components/Error';
import Success from './components/Success'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/> 
        <Route path="/register" element={<Register/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
  );
}

export default App;
