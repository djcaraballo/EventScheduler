import React from 'react';
import './Modal.css'

const Modal = props => {
  return (
    <div className="modal">
      <header className="modal-header">
        <h1>{props.title}</h1>
      </header>
      <section className="modal-content">
        {props.children}
      </section>
      <section className="modal-actions">
        {props.userCancel && <button className="modal-btn">Cancel</button>}
        {props.userConfirm && <button className="modal-btn">Confirm</button>}
      </section>
    </div>
  )
};

export default Modal;
