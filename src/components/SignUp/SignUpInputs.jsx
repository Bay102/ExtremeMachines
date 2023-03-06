import React from 'react';
import { InputBase } from '../InputBase/InputBase';

const inputData = [
  {
    id: 1,
    type: 'text',
    label: 'Email',
    name: 'userEmail',
    error: 'userEmail',
  },
  {
    id: 2,
    type: 'password',
    label: 'Password',
    name: 'userPassword',
    error: 'userPassword',
  },
  {
    id: 3,
    type: 'password',
    label: 'Confirm Password',
    name: 'confirmPassword',
    error: 'confirmPassword',
  },
  {
    id: 4,
    type: 'text',
    label: 'First Name',
    name: 'firstName',
    error: 'firstName',
  },
  {
    id: 5,
    type: 'text',
    label: 'Last Name',
    name: 'lastName',
    error: 'lastName',
  },
  { id: 6, type: 'text', label: 'Zip Code', name: 'userZip', error: 'userZip' },
];

export const SignUpInputs = (props) => {
  const { state, handleBlur, handleInputChange } = props;
  return inputData.length
    ? inputData.map((input, index) => (
        <label key={index} htmlFor={input.id}>
          <InputBase
            autoComplete="off"
            id={input.id}
            value={state.credentials[input.name] || ''}
            onBlur={handleBlur}
            onChange={handleInputChange}
            placeholder={input.label}
            type={input.type}
            label={input.label}
            name={input.name}
            errorM={
              state.error &&
              state.error[input.error] &&
              state.error[input.error].length > 1
                ? state.error[input.error]
                : state.error[input.error]
            }
          />
        </label>
      ))
    : null;
};
