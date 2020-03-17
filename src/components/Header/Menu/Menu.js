import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = (props) => {
  const { open } = props;
  return (
    <nav className={`Menu ${open ? 'nav_open' : ''}`}>
      <Link
        className='Menu__link'
        to='/punishments'
      >
        Punishments
      </Link>
      <Link
        className='Menu__link'
        to='/users'
      >
        Users
      </Link>
      <Link
        className='Menu__link'
        to='/punish'
      >
        Punish
      </Link>
    </nav>
  );
}

export default Menu;