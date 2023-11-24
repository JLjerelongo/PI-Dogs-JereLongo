import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDogDetail } from '../../Redux/Actions/actions'; // Ajusta según la acción y el estado de tu aplicación
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './dogDetail.css'
import viole from  "../../images/IMG-20220330-WA0044.jpg"

const DogDetail = () => {
  const dispatch = useDispatch();
  const [ loading, setLoading] = useState(true);
  const { id } = useParams();
  console.log("ID del perro:", id);
  const dog = useSelector((state) => state.dogDetail); // Ajusta según la estructura de tu estado global;
  
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchDogDetail(id));
      setLoading(false);
    };
  
    fetchData();
  }, [dispatch, id]);
  
  console.log(dog);

  const defaultImage = viole 
  
  const image = `https://cdn2.thedogapi.com/images/${dog?.imagen}.jpg`

  return (
    <div className="detail-container">
      <div className="footer">
        <NavBar />
        <h1 className='title'>WikiDogs</h1>
      </div>
      <div className='card'>
        <h2>{dog?.nombre}</h2>
        <p>Altura: {dog?.altura}</p>
        <p>Peso: {dog?.peso}</p>
        <p>Años de vida: {dog?.longevidad}</p>
        <p>Temperamentos: {dog?.temperamento.join(", ")}</p>
        {loading ? (
          <div>Cargando imagen...</div>
        ) : (
          <img
            src={image}
            alt={dog?.name}
            loading="lazy"
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DogDetail;