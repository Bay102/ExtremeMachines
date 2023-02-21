// Show all shipping fields as depicted in the screenshot below
// Have standard and express shipping options -- the shipping & handling/checkout prices should adjust accordingly
// Ensure phone fields cannot take text (only numbers)
// Ensure postal code cannot take text (only numbers)
// Make sure all fields are completed or prevent the user from moving forward. Show appropriate error messages
// Back to cart button should go back to cart
// There should be a Next or "Payment" button to go to next screen

import React from "react";
// import { InputBase } from "../InputBase/InputBase";

class Shipping extends React.Component {
  state = {
   shippingInfo: {
      addressTitle: '',
      name: '',
      address: '',
      zip: '',
      homePhone: '',
      cellPhone: '',
   }
  };

  render() {
    // const shippingInputs = [
    //   { id: "", type: "text", label: "Address Title", name: "addressTitle" },
    //   { id: "", type: "text", label: "Name", name: "name" },
    //   { id: "", type: "text", label: "Address", name: "address" },
    //   { id: "", type: "text", label: "Zip", name: "zip" },
    //   { id: "", type: "text", label: "Home Phone", name: "homePhone" },
    //   { id: "", type: "text", label: "Cell Phone", name: "cellPhone" },
    // ];
    return (
      <div>
        {/* {shippingInputs.length
          ? shippingInputs.map((input, index) => (
              <label key={index} htmlFor={input.id}>
                <InputBase
                  autoComplete="off"
                  id={input.id}
                  value={this.state.shippingInfo && this.state.shippingInfo[input.name]}
                  onBlur={this.handleBlur}
                  onChange={this.handleInputChange}
                  placeholder={input.label}
                  type={input.type}
                  label={input.label}
                  name={input.name}
                  errorM={
                    this.state.error &&
                    this.state.error[input.error] &&
                    this.state.error[input.error].length > 1
                      ? this.state.error[input.error]
                      : this.state.error[input.error]
                  }
                />
              </label>
            ))
          : null} */}
      </div>
    );
  }
}

export default Shipping;
