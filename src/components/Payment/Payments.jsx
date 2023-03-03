import React from "react";
import { BuildPaymentInputs } from "./BuildPaymentInputs";


class Payments extends React.Component {
   render() {
      const {mainState} = this.props
      return (
         <div className=" inputsWrapper paymentsContainer">
            <div>Payment</div>
         <BuildPaymentInputs />
         </div>  
      )
   }
}

export default Payments