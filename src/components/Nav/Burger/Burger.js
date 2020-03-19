import React from 'react';
import './Burger.css'

const Burger = (props) => {
  const { open, setOpen } = props;
  const handleClick = e => {
    setOpen(!open);
  }

  return (
    <button 
      className='Burger'
      onClick={handleClick}
    >
      <div className={open ? 'burger_open' : ''} />
      <div className={open ? 'burger_open' : ''} />
      <div className={open ? 'burger_open' : ''} />
    </button>
  )
}

export default Burger;