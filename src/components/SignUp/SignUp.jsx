import React, { Component } from "react";
import "../SignUp/SignUp.css";
import { InputBase } from "../InputBase/InputBase";
import { NEW_USER_DATA } from "../stateData";
import {
  onlyTextValidation,
  passwordLengthError,
  matchingPasswords,
  onlyNumberValidation,
  emailContains,
  checkIfEmailExists,
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
    const { userEmail } = this.state.credentials;
    const { users } = this.props.state;
    let errorText;
    switch (type) {
      case "userEmail":
        errorText =
          emailContains(value) || checkIfEmailExists(users, userEmail);
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
        //ask how to make other validations required
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
    const { userEmail } = this.state.credentials;
    const { users } = this.props.state;
    const errorCheck = this.preSubmit();
    const userAlreadyExists = checkIfEmailExists(users, userEmail);
    if (!errorCheck && !userAlreadyExists) {
      this.props.createNewUser(this.state.credentials); // why is index now user
      this.props.changePage("signIn");
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
