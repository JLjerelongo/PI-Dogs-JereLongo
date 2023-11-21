import React from 'react';
import "./Card.css"

const Card = ({ image, name, temperaments, weight }) => {
  return (
    <div className="card-conteiner">
      <div className='imagen'>
       <img src={image} alt={name} className='img'/>
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>Temperamentos: {temperaments.join(', ')}</p>
        <p>Peso: {weight} kg</p>
      </div>
    </div>
  );
};

export default Card;