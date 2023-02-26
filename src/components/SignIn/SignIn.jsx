import React, { Component } from "react";
import "./SignIn.css";
import {
  emailContains,
  findUserToLogIn,
  passwordLengthError,
  userValidation,
  userValidationError,
} from "../validations";
import { BuildSignInInputs } from "./BuildSignInInputs";

// User can sign in | if password is incorrect prompt error |
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
        errorText =
          passwordLengthError(value) ||
          userValidationError(
            this.props.mainState.users,
            this.state.credentials.userEmail,
            this.state.credentials.userPassword
          );
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

  errorCheck = () => {
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

  findUserToLogIn = (users, email) => {
    let user;
    for (let i = 0; i < users.length; i++) {
      if (email === users[i].userEmail) {
        user = users[i];
      }
    }
    return user;
  };

  handleSignIn = (e) => {
    e.preventDefault();
    const requiredFieldErrorCheck = this.errorCheck();
    const emailContainsSymbolsRequirement = emailContains(
      this.state.credentials.userEmail
    );
    const validateCredentials = userValidation(
      this.props.mainState.users,
      this.state.credentials.userEmail,
      this.state.credentials.userPassword
    );
    if (
      !requiredFieldErrorCheck &&
      !emailContainsSymbolsRequirement &&
      validateCredentials
    ) {
      const user = this.props.updateCurrentUser(
        this.findUserToLogIn(
          this.props.mainState.users,
          this.state.credentials.userEmail
        )
      );
      console.log(user);
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
