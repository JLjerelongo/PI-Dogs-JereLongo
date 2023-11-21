import React from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css"


const Landing = () => {

  return (
    <div className="landing-container">
      <h1>WikiDogs</h1>
      <Link to="/home">
        <button>Explorar Razas de Perros</button>
      </Link>
    </div>
  );
};

export default Landing;