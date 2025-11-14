import React, { useEffect } from 'react';
import style from './Detail.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDriver } from '../../redux/actions';

const Detail = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDriver(id));
  }, [dispatch, id]);

  const driver = useSelector(state => state.driver);

  if (driver.length === 0) {
    return <div>Loading...</div>; // Render a loading message until data is available
  }

  const { forename, surname, teams, image, nationality, description, dob } = driver[0];

  return (
    <div className={style.container}>
      <div className={style.details}>
        <h2>Driver Profile Details</h2>
        <p>ID: {id}</p>
        <p>Forename: {forename}</p>
        <p>Surname: {surname}</p>
        <p>Nationality: {nationality}</p>
        <p>Description: {description}</p>
        <p>Birthdate: {dob}</p>
        <p>Teams: {teams?.split(',').join(', ')}</p>
      </div>

      <div className={style.imageContainer}>
        <img className={style.img} src={image} alt="Imagen piloto" />
      </div>
      
    </div>
    
  )
}

export default Detail
