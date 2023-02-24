import React, { Component } from "react";
import "./SignIn.css";
import { emailContains, passwordLengthError } from "../validations";
import { BuildSignInInputs } from "./BuildSignInInputs";

// User can sign in | if password in incorrect prompt error |
// Eye Icon on Password | if successful render Cart

class SignIn extends Component {
  state = {
    credentials: {
      userEmail: "",
      userPassword: "",
    },
    error: {},
  };

  handleInputChange = (e) => {
    this.setState((prevState) => ({
      credentials: {
        ...prevState.credentials,
        [e.target.name]: e.target.value,
      },
    }));
    if (e.target.name === "userEmail") {
    }
  };

  handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case "userEmail":
        errorText = emailContains(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            userEmail: errorText,
          },
        }));
        break;
      // add check if user exists here
      case "userPassword":
        errorText = passwordLengthError(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            userPassword: errorText,
          },
        }));
        break;
      default:
        break;
    }
  };

  handleBlur = (e) => this.handleValidations(e.target.name, e.target.value);

  preSubmit = () => {
    let errorValue = {};
    let isError = false;
    Object.keys(this.state.credentials).forEach((val) => {
      if (!this.state.credentials[val].length) {
        errorValue = { ...errorValue, [`${val}`]: "Required" };
        isError = true;
      }
    });
    this.setState({ error: errorValue });
    return isError;
  };

  handleSignIn = (e) => {
    e.preventDefault();
    const requiredFieldErrorCheck = this.preSubmit();
    const emailContainsSymbolsRequirement = emailContains(this.state.credentials.userEmail) 
    console.log(emailContainsSymbolsRequirement);
    if (!requiredFieldErrorCheck && !emailContainsSymbolsRequirement) {
      this.props.updateCurrentUser(this.state.credentials);
      this.props.changePage("cart");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSignIn}>
        <BuildSignInInputs
          signInState={this.state}
          handleInputChange={this.handleInputChange}
          handleBlur={this.handleBlur}
        />
      </form>
    );
  }
}

export default SignIn;
