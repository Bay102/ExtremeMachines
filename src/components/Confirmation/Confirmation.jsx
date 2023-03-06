import React from 'react';
import { ProgressBar } from '../ProgressBar /ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import './Confirmation.css';
import 'animate.css';

export class Confirmation extends React.Component {
  state = {};

  render() {
    const { mainState } = this.props;
    return (
      <div>
        <ProgressBar mainState={mainState} />
        <div className="confirmationContainer">
          <h3>Order Placed!</h3>
          <div className="checkIcon">
            <FontAwesomeIcon
              className="animate__animated animate__backInUp orderPlaced"
              icon={faClipboardCheck}
            />
            </div>
            <div className="confirmationInfo">
              <div className="amountPaid">Paid: {mainState.cartFinalPrice}</div>
              <div className="cardNum">Payment Method: {mainState.currentUser.paymentMethod}</div>
            </div>
          
        </div>
      </div>
    );
  }
}
