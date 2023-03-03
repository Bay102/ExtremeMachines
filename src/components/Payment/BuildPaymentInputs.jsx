import React from 'react';
import { InputBase } from '../InputBase/InputBase';

export const BuildPaymentInputs = (props) => {
  
   const paymentInputs = [
    {
      id: '1',
      type: 'text',
      label: 'Card Holder Name',
      name: 'cardHolder',
      error: 'cardHolder',
    },
    {
      id: '1',
      type: 'text',
      label: 'Card Number',
      name: 'cardNumber',
      error: 'cardNumber',
    },
    { id: '1', type: 'text', label: 'Exp.Date', name: 'exp', error: 'exp' },
    { id: '1', type: 'text', label: 'CVV', name: 'CVV', error: 'CVV' },
  ];

  return paymentInputs.length
    ? paymentInputs.map((input, index) => (
        <label key={index} htmlFor={input.name}>
          <InputBase
            id={input.id}
            name={input.name}
            type={input.type}
            label={input.label}
            error={input.error}
            placeholder={input.label}
          />
        </label>
      ))
    : null;
};
