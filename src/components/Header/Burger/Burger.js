import React from 'react';
import { Button } from '../../Utils/Utils';
import './Burger.css'

const Burger = (props) => {
  const { open, setOpen } = props;
  const handleClick = e => {
    setOpen(!open);
  }

  return (
    <Button 
      className='Burger'
      onClick={handleClick}
    >
      <div className={open ? 'burger_open' : ''} />
      <div className={open ? 'burger_open' : ''} />
      <div className={open ? 'burger_open' : ''} />
    </Button>
  )
}

export default Burger;