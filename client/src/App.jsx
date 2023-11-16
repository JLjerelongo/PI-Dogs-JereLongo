import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Views/Home/Home';
import Landing from './Views/Landing/Landing';
import Details from './Views/Details/Details';
import Form from './Views/Form/Form';

import Navbar from './Components/Navbar/Navbar';

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;