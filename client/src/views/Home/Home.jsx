import React, { useCallback } from 'react';
import styles from './Home.module.css';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDrivers } from '../../redux/actions';
import SearchBar from '../../components/SearchBar/SearchBar';

const Home = () => {

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  //Cuando se monta el componente hace el dispatch
  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  const [search, setSearch] = useState('');

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    setCurrentPage(1); // para reseatear la paginacion al hacer una busqueda
  };

  const [filter, setFilter] = useState({ team: '', origin: '' });
  const [sort, setSort] = useState('');

  const [searchedDrivers, setSearchedDrivers] = useState([]); // Estado para guardar busqueda de drivers por nombre

  const handleSortChange = useCallback(
    (newSort) => {
      setSort(newSort);
      setCurrentPage(1); // para reseatear la paginacion al hacer un sort
    },
    [setSort]
  );
    
  const handleFilterChange = useCallback(
    (newFilter) => {
      setFilter(newFilter);
      setCurrentPage(1); // para reseatear la paginacion al hacer un filter
    },
    [setFilter]
  );

  const handleSearchedChange = (searchedDrivers) => {
    setSearchedDrivers(searchedDrivers);
    setCurrentPage(1); // para reseatear la paginacion al hacer una busqueda
  }
  
  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} onSortChange={handleSortChange} onNameSearch={handleSearchedChange} />
      <CardsContainer search={search} filter={filter} sort={sort} driversByName={searchedDrivers} currentPage={currentPage}
        setCurrentPage={setCurrentPage}/>
    </div>
  )
}

export default Home
