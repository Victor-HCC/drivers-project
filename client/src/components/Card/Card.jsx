import React from 'react';
import style from './Card.module.css';
import { useNavigate } from 'react-router-dom';

//Debe mostrar la info de cada usuario y un link para ir al detalle del usuario en cuestion
const Card = (props) => {
  const { id, forename, surname, teams, image, dob } = props;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/detail/${id}`);
  }

  return (
    <div className={style.card} onClick={handleCardClick}>
      <img src={image} width="50" alt="Imagen piloto" />
      <p>Name: {forename} {surname}</p>
      <p>Escuderias: {teams}</p>
      <p>DoB: {dob}</p>
    </div>
  )
}

export default Card
