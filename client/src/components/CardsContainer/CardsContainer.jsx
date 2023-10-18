import React, { useState } from 'react';
import Card from '../Card/Card';
import style from './CardsContainer.module.css';
import { useSelector } from 'react-redux';

//Debe tomar un array de usuarios y por cada uno renderizar un componente Card
const CardsContainer = ({ search, filter, sort }) => {

  // console.log(`Filtros ${filter}`);
  // console.log(`Filtros ${filter.team}`);
  // console.log(`Filtros ${filter.origin}`);
  // console.log(`Sort ${sort}`);
  let drivers = useSelector(state => state.drivers);
  
  if(search !== '') {
    drivers = drivers.filter((driver) =>
    driver.forename.toLowerCase().includes(search.toLowerCase())
  );
  }

  const sortedDriversAscending = drivers.slice().sort((a, b) => {
    const dobA = new Date(a.dob);
    const dobB = new Date(b.dob);
    return dobA - dobB;
  });

  const sortedDriversDescending = drivers.slice().sort((a, b) => {
    const dobA = new Date(a.dob);
    const dobB = new Date(b.dob);
    return dobB - dobA;
  });

  // Apply sorting logic based on sort
  if (sort === 'alpha-ascending') {
    drivers.sort((a, b) => a.forename.localeCompare(b.forename));
  } else if (sort === 'alpha-descending') {
    drivers.sort((a, b) => b.forename.localeCompare(a.forename));
  } else if(sort === 'dob-ascending') {
    drivers = sortedDriversAscending;
  } else if(sort === 'dob-descending') {
    drivers = sortedDriversDescending;
  }
  
  if(filter.origin) {
    drivers = filter.origin === 'db' ? drivers.filter(driver => driver.created) : drivers.filter(driver => !driver.created);
  }

  if(filter.team) {
    drivers = drivers.filter(driver => driver.teams?.includes(filter.team))
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(drivers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedDrivers = drivers.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }


  return (
    <div className={style.container}>
      {displayedDrivers.map(driver => {
        return <Card 
          key={driver.id}
          id={driver.id}
          forename={driver.forename}
          surname={driver.surname}
          teams={driver.teams}
          image={driver.image}
          dob={driver.dob}
        />
      })}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  )
}

export default CardsContainer
