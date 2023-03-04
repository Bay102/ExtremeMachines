import React from 'react';
import './progressBar.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faTruckFast,
  faCreditCard,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class ProgressBar extends React.Component {
  render() {
    return (
      <div className="progressContainer">
        <div className="circle">
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
        <div className="line"></div>
        <div className="circle">
          <FontAwesomeIcon icon={faTruckFast} />
        </div>
        <div className="line"></div>
        <div className="circle">
          <FontAwesomeIcon icon={faCreditCard} />
        </div>
        <div className="line"></div>
        <div className="circle">
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
      </div>
    );
  }
}
