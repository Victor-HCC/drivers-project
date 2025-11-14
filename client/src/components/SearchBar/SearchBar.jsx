import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams } from '../../redux/actions';
import styles from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const SearchBar = ({ onSearch, onFilterChange, onSortChange, onNameSearch }) => {
  
  const [ search, setSearch ] = useState('');
  
  const handleSearchInput = (e) => {
    // const searchTerm = e.target.value;
    // setSearch(searchTerm);
    // onSearch(searchTerm);
    setSearch(e.target.value)
  };

  const handleSearch = async () => {
    const name = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();
    try {
      const response = (await axios.get(`http://localhost:3001/drivers?name=${name}`));
      const data = response.data;
      onNameSearch(data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  // Handle cuando se presiona enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      onSearch(search);
    }
  };

  // Handle para el click del boton busqueda
  const handleSearchClick = () => {
    handleSearch();
    onSearch(search);
  };

  const [filter, setFilter] = useState({
    team: '',
    origin: '',
  });
  const [sort, setSort] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const teams = useSelector(state => state.teams);

  const changeHandler = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    
    setFilter({ ...filter, [property]: value });
    onFilterChange({ ...filter, [property]: value });
  }
  const sortHandler = (e) => {
    const value = e.target.value;
    setSort(value);
    onSortChange(value); 
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input className={styles.searchText} type="text" placeholder='  Buscar por nombre...' value={search} onChange={handleSearchInput} onKeyDown={handleKeyPress} />
        <button className={styles.searchBtn} href="#" onClick={handleSearchClick}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      <div className={styles.selectContainer}>
        <label>Ordenar por: </label>
        <select name='sort' value={sort} id="sort" onChange={sortHandler}>
          <option value="">--Seleccionar--</option>
          <option value="alpha-ascending">A &rarr; Z</option>
          <option value="alpha-descending">Z &rarr; A</option>
          <option value="dob-descending">Fecha de Nacimiento &uarr;</option>
          <option value="dob-ascending">Fecha de Nacimiento &darr;</option>
        </select>
      </div>

      <div className={styles.selectContainer}>
        <label>Filtrar por Escuderias: </label>
        <select name="team" value={filter.team} onChange={changeHandler}>
          <option value=''>--Seleccionar--</option>
          {teams.map((team) => {
            return <option key={team} value={team}>{team}</option>
          })}
        </select>
      </div>

      <div className={styles.selectContainer}>
        <label>Filtrar por origen: </label>
        <select name="origin" value={filter.origin} onChange={changeHandler}>
          <option>--Seleccionar--</option>
          <option value='api'>API</option>
          <option value='db'>DB</option>
        </select>
      </div>

    </div>
  )
}

export default SearchBar
