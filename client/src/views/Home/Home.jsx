import React from 'react';
import styles from './Home.module.css';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDrivers } from '../../redux/actions';

const Home = () => {

  const dispatch = useDispatch();
  //Cuando se monta el componente hace el dispatch
  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch])

  return (
    <>
      <h1 className={styles.homeTitle}>En la vista de Home</h1>
      <CardsContainer />
    </>
  )
}

export default Home
