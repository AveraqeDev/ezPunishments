import React from 'react';

import './Header.css';

function Header({ title }) {
  return (
    <div className='Header'>
      <h2>{title}</h2>
      <div />
    </div>
  )
}

export default Header;