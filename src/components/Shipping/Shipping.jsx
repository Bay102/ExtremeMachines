// Show all shipping fields as depicted in the screenshot below
// Have standard and express shipping options -- the shipping & handling/checkout prices should adjust accordingly
// Ensure phone fields cannot take text (only numbers)
// Ensure postal code cannot take text (only numbers)
// Make sure all fields are completed or prevent the user from moving forward. Show appropriate error messages
// Back to cart button should go back to cart
// There should be a Next or "Payment" button to go to next screen
import React from "react";
import { CartSummary } from "../Cart/CartSummary";
import { BuildShippingInputs } from "./BuildShippingInputs";

class Shipping extends React.Component {
  state = {
    shippingInfo: {
      addressTitle: "",
      name: "",
      address: "",
      zip: "",
      homePhone: "",
      cellPhone: "",
    },
    error: {},
  };

  handleInputChange = (e) => {
    this.setState((prevState) => ({
      shippingInfo: {
        ...prevState.shippingInfo,
        [e.target.name]: e.target.value,
      },
    }));
  };

  // handleValidations = (type, value) => {

  //   let errorText;
  //   switch (type) {
  //     case "userEmail":
  //       errorText =
  //         // emailContains(value) || checkIfEmailAlreadyExists(users, userEmail);
  //       this.setState((prevState) => ({
  //         error: {
  //           ...prevState.error,
  //           userEmail: errorText,
  //         },
  //       }));
  //       break;
  //     case "firstName":
  //       // errorText = onlyTextValidation(value);
  //       this.setState((prevState) => ({
  //         error: {
  //           ...prevState.error,
  //           firstName: errorText,
  //         },
  //       }));
  //       break;
  //     case "lastName":
  //       // errorText = onlyTextValidation(value);
  //       this.setState((prevState) => ({
  //         error: {
  //           ...prevState.error,
  //           lastName: errorText,
  //         },
  //       }));
  //       break;
  //     case "userPassword":
  //       // errorText = passwordLengthError(value);
  //       this.setState((prevState) => ({
  //         error: {
  //           ...prevState.error,
  //           userPassword: errorText,
  //         },
  //       }));
  //       break;
  //     case "confirmPassword":
  //     // // ≥  // errorText = matchingPasswords(
  //     //     this.state.credentials.userPassword,
  //     //     this.state.credentials.confirmPassword
  //     //   );
  //       this.setState((prevState) => ({
  //         error: {
  //           ...prevState.error,
  //           confirmPassword: errorText,
  //         },
  //       }));
  //       break;
  //     case "zip":
  //       // errorText = onlyNumberValidation(value);
  //       this.setState((prevState) => ({
  //         error: {
  //           ...prevState.error,
  //           zip: errorText,
  //         },
  //       }));
  //       break;
  //     // add email already exists validation
  //     default:
  //       break;
  //   }
  // };

  // handleBlur = (e) => this.handleValidations(e.target.name, e.target.value);

  // preSubmit = () => {
  //   let errorValue = {};
  //   let isError = false;
  //   Object.keys(this.state.credentials)
  //     .slice(0, 6)
  //     .forEach((val) => {
  //       //ask how to make other validations required
  //       if (!this.state.credentials[val].length) {
  //         errorValue = { ...errorValue, [`${val}`]: "Required" };
  //         isError = true;
  //       }
  //     });
  //   this.setState({ error: errorValue });

  //   return isError;
  // };

  render() {
    return (
      <div>
        <form className="inputsWrapper" action="">
          <h3>Shipping</h3>
          <BuildShippingInputs
            state={this.state}
            changePage={this.changePage}
            updateState={this.updateState}
            handleInputChange={this.handleInputChange}
          />
          <button onClick={""}>Pay Now</button>
        </form>
        {/* <CartSummary /> */}
      </div>
    );
  }
}

export default Shipping;
