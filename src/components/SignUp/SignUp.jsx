import React, { Component } from "react";

import { InputBase } from "../InputBase/InputBase";
import "../SignUp/SignUp.css";
import { NEW_USER_DATA } from "../stateData";

import {
  onlyTextValidation,
  passwordLengthError,
  matchingPasswords,
  emailSymbol,
  onlyNumberValidation,
} from "../validations";
import { SignUpInputs } from "./SignUpInputs";

// Passwords must match | Reveal password with eye icon | Names no numbers

// when new user is created , create a new user object in state

class SignUp extends Component {
  state = {
    credentials: NEW_USER_DATA, 
    error: {},
  };

  handleInputChange = (e) => {
    this.setState((prevState) => ({
      credentials: {
        ...prevState.credentials,
        [e.target.name]: e.target.value,
      },
    }));
  };

  handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case "userEmail":
        errorText = emailSymbol(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            userEmail: errorText,
          },
        }));
        break;
      case "firstName":
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            firstName: errorText,
          },
        }));
        break;
      case "lastName":
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            lastName: errorText,
          },
        }));
        break;
      case "userPassword":
        errorText = passwordLengthError(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            userPassword: errorText,
          },
        }));
        break;
      case "confirmPassword":
        errorText = matchingPasswords(
          this.state.credentials.userPassword,
          this.state.credentials.confirmPassword
        );
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            confirmPassword: errorText,
          },
        }));
        break;
      case "zip":
        errorText = onlyNumberValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            zip: errorText,
          },
        }));
        break;
      // add email already exists validation
      default:
        break;
    }
  };

  handleBlur = (e) => this.handleValidations(e.target.name, e.target.value);

  preSubmit = () => {
    let errorValue = {};
    let isError = false;
    Object.keys(this.state.credentials)
      .slice(0, 6)
      .forEach((val) => {
        if (!this.state.credentials[val].length) {
          errorValue = { ...errorValue, [`${val}`]: "Required" };
          isError = true;
        }
      });
    this.setState({ error: errorValue });

    return isError;
  };

  handleSignUp = (e) => {
    e.preventDefault();
    const errorCheck = this.preSubmit();
    // Create a new user (add new user to Users State)
    if (!errorCheck ) {
      this.props.createNewUser('users', 'newUser', this.state.credentials) 
      this.props.changePage("cart");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSignUp}>
        <div className="inputsWrapper">
          <h2>Sign Up</h2>
          <SignUpInputs
            state={this.state}
            handleBlur={this.handleBlur}
            handleInputChange={this.handleInputChange}
          />
          <div className="signInSubmit">
            <button type="submit">Sign Up</button>
          </div>
          <div className="facebook">Sign Up with Facebook</div>
        </div>
      </form>
    );
  }
}

export default SignUp;
