import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import './InputBase.css';
import { CARD, CARDICON } from '../Payment/paymentData';
import { expiryInputs } from '../Payment/paymentValidations';

const revealPassword = () => {
  const eyeGrab = document.querySelectorAll('.eye');
  eyeGrab.forEach((button) => {
    button.addEventListener('click', () => {
      button.previousElementSibling.type === 'password'
        ? button.previousElementSibling.setAttribute('type', 'text')
        : button.previousElementSibling.setAttribute('type', 'password');
    });
  });
};

export const InputBase = ({ type, errorM, error, isCard, cardType, ...props }) => (
  <div className="inputContainer">
    <input className="input-root" type={type} {...props} />
    {type === 'password' ? (
      <FontAwesomeIcon onClick={revealPassword} icon={faEye} className="eye" />
    ) : undefined}
    {type === 'select' ? expiryInputs : undefined}
    {errorM && <div className="error">{errorM}</div>}
    {(!error || !error.cardError) && isCard && CARD.includes(cardType) && (
      <img
        style={{
          position: 'absolute',
          top: '-1px',
          right: '30px',
          width: '45px',
          height: '33px',
        }}
        src={CARDICON[cardType]}
        alt="card"
      />
    )}
  </div>
);
