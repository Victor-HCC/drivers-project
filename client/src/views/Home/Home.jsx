import React from 'react';
import styles from './Home.module.css';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDrivers } from '../../redux/actions';
import SearchBar from '../../components/SearchBar/SearchBar';

const Home = () => {

  const dispatch = useDispatch();
  //Cuando se monta el componente hace el dispatch
  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  const [search, setSearch] = useState('');

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
  };

  const [filter, setFilter] = useState({ team: '', origin: '' });
  const [sort, setSort] = useState('');

  return (
    <>
      <h1 className={styles.homeTitle}>En la vista de Home</h1>
      <SearchBar onSearch={handleSearch} onFilterChange={setFilter} onSortChange={setSort} />
      <CardsContainer search={search} filter={filter} sort={sort} />
    </>
  )
}

export default Home
