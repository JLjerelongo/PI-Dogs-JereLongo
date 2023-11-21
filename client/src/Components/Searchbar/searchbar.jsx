import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="search-bar-container">
      <input
        className='input'
        id="searchInput"
        type="text"
        placeholder="Ingrese la raza del perro"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button onClick={() => onSearch(searchTerm)}>Buscar</button>
    </div>
  );
};

export default SearchBar;