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
    <div className={style.detail}>
      <p>ID: {id}</p>
      <p>Nombre: {forename}</p>
      <p>Apellido: {surname}</p>
      <p>Nacionalidad: {nationality}</p>
      <img src={image} width="50" alt="Imagen piloto" />
      <p>Descripción: {description}</p>
      <p>Fecha de Nacimiento: {dob}</p>
      <p>Escuderias: {teams.split(',').join(', ')}</p>
    </div>
  )
}

export default Detail
