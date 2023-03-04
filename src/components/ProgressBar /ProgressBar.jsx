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
  state = {
    currentStep: 1,
  };

  render() {
   const {mainState} = this.props  // ask how to destructure this better
    return (
      <div className="progressContainer">
        <div className="circle">
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
        <div id="cart" className={`line ${mainState.currentStep >= 1 ? 'active' : ''}`}></div>
        <div className="circle">
          <FontAwesomeIcon icon={faTruckFast} />
        </div>
        <div id="ship" className={`line ${mainState.currentStep >= 2 ? 'active' : ''}`}></div>
        <div className="circle">
          <FontAwesomeIcon icon={faCreditCard} />
        </div>
        <div id="payment" className={`line ${mainState.currentStep >= 3 ? 'confirmed' : ''}`}></div>
        <div className={`circle ${mainState.currentStep >= 3 ? 'confirmed' : ''}`}>
          <FontAwesomeIcon icon={faCircleCheck}  />
        </div>
      </div>
    );
  }
}
