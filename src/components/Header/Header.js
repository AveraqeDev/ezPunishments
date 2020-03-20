import React from 'react';

import './Header.css';

function Header({ title, subtitle }) {
  return (
    <div className='Header'>
      {title 
        ? <h2>{title}</h2>
        : <h3>{subtitle}</h3>
      }
      <div />
    </div>
  )
}

export default Header;