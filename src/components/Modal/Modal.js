import React from 'react';
import { Button } from '../Utils/Utils';
import './Modal.css';

const Modal = (props) => {
  return (
      <div className='Modal-wrapper'
        style={{
          transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh',
          opacity: props.show ? '1' : '0'
      }}>
        <div className='Modal-header'>
          <h3>{props.header}</h3>
          <span className='Modal-close-btn' onClick={props.close}>×</span>
        </div>
        <div className='Modal-body'>
            {props.children}
        </div>
        {
          props.confirm
            ? (
                <div className='Modal-footer'>
                  <Button className='Modal-cancel-btn' onClick={props.close}>Cancel</Button>
                  <Button className='Modal-confirm-btn' onClick={props.confirm}>Confirm</Button>
                </div>
              )
            : null
        }
      </div>
  )
}

export default Modal;