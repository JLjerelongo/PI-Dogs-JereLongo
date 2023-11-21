import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  searchDogs,
  filterByTemperament,
  originFilter,
  sortDogs,
  getTemperaments,
} from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';
import './Home.css';

import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';

const Home = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTemperament, setSelectedTemperament] = useState(''); // Agrega esta línea

  useEffect(() => {
    dispatch(searchDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    // Lógica para manejar la búsqueda de perros
    // Puedes filtrar la lista de perros según el término de búsqueda
    // Actualiza el estado o realiza la lógica necesaria en tu aplicación
  };

  const handleFilterByTemperament = (selectedTemperament) => {
    setSelectedTemperament(selectedTemperament);
    dispatch(filterByTemperament(selectedTemperament));
  };

  const handleFilterByOrigin = (origin) => {
    dispatch(originFilter(origin));
  };

  const handleSort = (sortBy) => {
    dispatch(sortDogs(sortBy));
  };

  // Lógica para calcular el índice de inicio y fin para la paginación
  const dogsPerPage = 8;
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  // Lógica para renderizar los botones de paginación
  const pageNumbers = Array.from({ length: Math.ceil(dogs.length / dogsPerPage) }, (_, i) => i + 1);

  const renderPageNumbers = pageNumbers.map((number) => (
    <button
      key={number}
      onClick={() => setCurrentPage(number)}
      className={currentPage === number ? 'current-page' : ''}
    >
      {number}
    </button>
  ));

  return (
    <div className="home-container">
      <div className="footer">
        <NavBar />
        <h1 className="title">WikiDogs</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
  
      <div className='botones'>
  {/* Mueve el selector antes de los botones */}
  <div className="select-container">
    <select onChange={(event) => handleFilterByTemperament(event.target.value)}>
      <option value="">Selecciona un temperamento</option>
      {temperaments.map((temperament) => (
        <option key={temperament.id} value={temperament.name}>
          {temperament.name}
        </option>
      ))}
    </select>
  </div>

  {/* Botones restantes */}
  <div className="left-button-container">
    <button className="sort-button" onClick={() => handleSort('asc')}>Ordenar Ascendente</button>
    <button className="sort-button" onClick={() => handleSort('desc')}>Ordenar Descendente</button>
  </div>

  <div className="right-button-container">
    <button className="origin-button" onClick={() => handleFilterByOrigin('AllOrigins')}>Mostrar Todos</button>
    <button className="origin-button" onClick={() => handleFilterByOrigin('Database')}>Base de Datos</button>
    <button className="origin-button" onClick={() => handleFilterByOrigin('API')}>API</button>
  </div>
</div>

  
      <div className="cards">
        {currentDogs.map((dog) => (
          <Link to={`/dogs/${dog.id}`} key={dog.id}>
            <Card image={dog.imagen} name={dog.nombre} temperaments={dog.temperamento} weight={dog.peso.metric} />
          </Link>
        ))}
      </div>
  
      <div className="pagination-container">{renderPageNumbers}</div>
    </div>
  );
};

export default Home;