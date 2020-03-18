import React from 'react';
import { Section, Button } from '../Utils/Utils';
import './PopUp.css';

const PopUp = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'PopUp display-block' : 'PopUp display-none';

  return ( 
    <div className={showHideClassName}>
      <Section className={show ? 'PopUp__main' : 'PopUp_disabled'}>
        {children}
        <Button className='PopUp__close' onClick={handleClose}>CLOSE</Button>
      </Section>
    </div>
  );
}
 
export default PopUp;