import React from 'react';
import './Modal.css'
const mixer = require('../../assets/mixer.jpg')
const mixer2 = require('../../assets/mixer2.jpg')
const networking = require('../../assets/networking.jpg')
const networking2 = require('../../assets/networking2.jpg')

const Modal = props => {
  const imgUrls = [
    mixer,
    mixer2,
    networking,
    networking2
  ]
  const srcUrl = imgUrls[Math.floor(Math.random() * Math.floor(4))]
  console.log(srcUrl)

  return (
    <div className="modal">
      <header className="modal-header">
        <h1>{props.title}</h1>
        <img src={srcUrl}  />
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
    </div>
  )
};

export default Modal;
