import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDogDetail } from '../../Redux/Actions/actions'; // Ajusta según la acción y el estado de tu aplicación
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './dogDetail.css'

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
  
  const image = `https://cdn2.thedogapi.com/images/${dog?.reference_image_id}.jpg`

  return (
    <div className="detail-container">
      <div className="footer">
        <NavBar />
        <h1 className='title'>WikiDogs</h1>
      </div>
      <div className='card'>
        <h2>{dog?.name}</h2>
        <p>Altura: {dog?.height.metric}</p>
        <p>Peso: {dog?.weight.metric}</p>
        <p>Años de vida: {dog?.life_span}</p>
        <p>Temperamentos: {dog?.temperament}</p>
        {loading ? (
          <div>Cargando imagen...</div>
        ) : (
          <img src={image} alt={dog?.name} loading='lazy'/>
        )}
      </div>
    </div>
  );
};

export default DogDetail;