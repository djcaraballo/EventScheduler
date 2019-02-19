import React, { Fragment } from 'react';
import './Modal.css'

const Modal = props => {
  return (
    <Fragment className="modal">
      <header className="modal-header">
        <h1>{props.title}</h1>
      </header>
      <section className="modal-content">
        {props.children}
      </section>
      <section className="modal-actions">
        {props.userCancel &&
          <button className="modal-btn" onClick={props.onCancel}>
            Cancel
          </button>
        }
        {props.userConfirm &&
          <button className="modal-btn" onClick={props.onConfirm}>
            {props.confirmText}
          </button>
        }
      </section>
    </Fragment>
  )
};

export default Modal;
