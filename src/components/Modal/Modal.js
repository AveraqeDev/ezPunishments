import React from 'react';
import './Modal.css';

const Modal = (props) => {
  return (
      <>
        <div className='Back-drop'
          style={{
            opacity: props.show ? '1' : '0',
            'zIndex': props.show ? '50' : '-1'
          }}
          onClick={props.close}
        />
        <div className='Modal-wrapper'
          style={{
            transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0',
        }}>
          <div className='Modal-header'>
            <h2>{props.header}</h2>
            <span className='Modal-close-btn' onClick={props.close}>×</span>
          </div>
          <div className='Modal-body'>
              {props.children}
          </div>
        </div>
      </>
  )
}

export default Modal;