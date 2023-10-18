import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams } from '../../redux/actions';


const SearchBar = ({ onSearch, onFilterChange, onSortChange }) => {
  
  const [ search, setSearch ] = useState('');

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    onSearch(searchTerm);
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
    <div>
      <input type="text" placeholder='Buscar' value={search} onChange={handleSearch} />

      <div>
        <label>Ordenar por:</label>
        <div>
          <select name='sort' value={sort} id="sort" onChange={sortHandler}>
            <option value="">--Seleccionar--</option>
            <option value="alpha-ascending">A &rarr; Z</option>
            <option value="alpha-descending">Z &rarr; A</option>
            <option value="dob-descending">Fecha de Nacimiento &uarr;</option>
            <option value="dob-ascending">Fecha de Nacimiento &darr;</option>
          </select>
        </div>
      </div>

      <div>
        <label>Filtrar por Escuderias: </label>
        <select name="team" value={filter.team} onChange={changeHandler}>
          <option value=''>--Seleccionar--</option>
          {teams.map((team) => {
            return <option key={team} value={team}>{team}</option>
          })}
        </select>
      </div>

      <div>
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
