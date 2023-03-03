import React from 'react';
import { BuildPaymentInputs } from './BuildPaymentInputs';

class Payments extends React.Component {
  state = {};



  

  render() {
    const { mainState } = this.props;
    return (
      <div className=" inputsWrapper paymentsContainer">
        <h2>Payment</h2>
        <BuildPaymentInputs />
        <div className="payNowButton">
         <button type='button'>PayNow</button>
        </div>
      </div>
    );
  }
}

export default Payments;
