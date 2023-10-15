import React from 'react';
import style from './Card.module.css';

//Debe mostrar la info de cada usuario y un link para ir al detalle del usuario en cuestion
const Card = (props) => {
  const { id, forename, surname, nationality, image } = props;
  return (
    <div className={style.card}>
      <p>ID: {id}</p>
      <p>Name: {forename} {surname}</p>
      <p>Nacionalidad: {nationality}</p>
      <img src={image} width="50" alt="Imagen piloto" />
    </div>
  )
}

export default Card
