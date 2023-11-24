import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDogs,
  filterByTemperament,
  originFilter,
  sortDogs,
  getTemperaments,
  fetchDogsDb,
  dogsByName
} from '../../Redux/Actions/actions';
import { Link } from 'react-router-dom';
import './Home.css';

import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import Card from '../Card/Card';

const Home = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const allDogs = useSelector((state) => state.allDogs)
  const temperaments = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTemperament, setSelectedTemperament] = useState('');
  const [filterOption, setFilterOption] = useState({
    field: 'nombre',
    order: 'asc',
  });

  console.log("soy el home:", dogs);

  useEffect(() => {
    dispatch(fetchDogs());
    dispatch(fetchDogsDb());
    dispatch(getTemperaments());
  }, [dispatch]);

  // Lógica para manejar la búsqueda de perros
  const onSearch = (name) => {
    dispatch(dogsByName(name))
  };


  // Si hay resultados de búsqueda, mostrar esos resultados
  if (searchResults.length > 0) {
    dogsToPaginate = searchResults;
  }

  const handleFilterByTemperament = (selectedTemperament) => {
    setSelectedTemperament(selectedTemperament);
    dispatch(filterByTemperament(selectedTemperament));
  };

  const handleFilterByOrigin = (origin) => {
    dispatch(originFilter(origin));
  };

  const handleSort = (field) => {
    const newOrder = filterOption.field === field && filterOption.order === 'asc' ? 'desc' : 'asc';
    setFilterOption({ field, order: newOrder });

    if (field === 'nombre' || field === 'peso') {
      dispatch(sortDogs({ field, order: newOrder }));
    }
  };


  const dogsPerPage = 8;
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs?.slice(indexOfFirstDog, indexOfLastDog);

  const pageNumbers = Array.from({ length: Math.ceil(dogs?.length / dogsPerPage) }, (_, i) => i + 1);

  const renderOrderArrow = () => (
    filterOption.order === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>
  );

  return (
    <div className="home-container">
      <div className="footer">
        <NavBar />
        <h1 className="title">WikiDogs</h1>
        <SearchBar onSearch={onSearch} />
      </div>

      <div className='botones'>
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

        <div className="right-button-container">
          <button className="origin-button" onClick={() => handleFilterByOrigin('Todos')}>Mostrar Todos</button>
          <button className="origin-button" onClick={() => handleFilterByOrigin('DB')}>Base de Datos</button>
          <button className="origin-button" onClick={() => handleFilterByOrigin('API')}>API</button>
        </div>



        <div className="left-button-container">
          <button className="sort-button" onClick={() => handleSort('nombre')}>
            Ordenar por Nombre {filterOption.field === 'nombre' && renderOrderArrow()}
          </button>
          <button className="sort-button" onClick={() => handleSort('peso')}>
            Ordenar por Peso {filterOption.field === 'peso' && renderOrderArrow()}
          </button>
        </div>
      </div>

      <div className="cards">

        { currentDogs.length? currentDogs.map((dog) => (
          <Link to={`/dogs/${dog?.id}`} key={dog?.id}>
            <Card image={dog?.imagen} name={dog?.nombre} temperaments={dog?.temperamento} weight={dog?.peso} />
          </Link>
        )):null}
      </div>

      <div className="pagination-container">{pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={currentPage === number ? 'current-page' : ''}
        >
          {number}
        </button>
      ))}</div>
    </div>
  );
};

export default Home;

   