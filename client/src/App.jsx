import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import DogDetail from './components/DogDetail/dogDetail';
import DogForm from './components/DogForm/dogForm';
import Landing from './components/LandingPage/LandingPage';

function App() {
  return (
    <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/home" Component={Home} />
        <Route path="/dogs/:id" Component={DogDetail} />
        <Route path="/form" Component={DogForm} />
    </Routes>
  );
}

export default App; 