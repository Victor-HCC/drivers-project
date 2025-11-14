import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './NavBar.module.css';

const NavBar = () => {

  const location = useLocation().pathname;

  return (
    <div className={style.container}>
      <Link to='/home' className={style.title}>
        <h1>Drivers APP</h1>
      </Link>
      <div className={style.links}>
        {location !== '/home' && <Link to='/home'>HOME</Link>}
        {location !== '/form' && <Link to='/form'>Create New Driver</Link>}
      </div>
      
    </div>
  )
}

export default NavBar
