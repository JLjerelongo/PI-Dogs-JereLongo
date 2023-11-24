import React from 'react';
import "./Card.css"
import viole from  "../../images/IMG-20220330-WA0044.jpg"

const Card = ({ image, name, temperaments, weight }) => {
  // console.log("soy la card: " ,temperaments);
  // console.log("soy la imagen:", image);

  return (
    <div className="card-conteiner">
      <div className='imagen'>
       <img src={image ? image : viole} alt={name} className='img'/>
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        {temperaments? <p>Temperamentos: {temperaments.join(', ')}</p>:null}
        <p>Peso: {weight} kg</p>
      </div>
    </div>
  );
};

export default Card;