// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/home">Inicio</Link>
        </li>
        <li className="nav-item">
          <Link to="/form">Crear un perro</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;