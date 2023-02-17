import React, { Component } from "react";


import { InputBase } from "../InputBase/InputBase";
import "../SignUp/SignUp.css";
import {
  onlyTextValidation,
  passwordLengthError,
  matchingPasswords,
  emailSymbol,
  onlyNumberValidation,
} from "../validations";

// Passwords must match | Reveal password with eye icon | Names no numbers

// when new user is created , create a new user object in state

const INIT_NEW_USER = {
  userEmail: "",
  userPassword: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  zip: "",
};

class SignUp extends Component {
  state = {
    userData: INIT_NEW_USER,
    error: {},
  };

  handleInputChange = (e) => {
    this.setState((prevState) => ({
      userData: {
        ...prevState.userData,
        [e.target.name]: e.target.value,
      },
    }));
    // passing the userEmail up to main component state
    // if (e.target.name === "userEmail") {
    //   this.props.getEmail(e.target.value);
    // }
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
          this.state.userData.userPassword,
          this.state.userData.confirmPassword
        );
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            confirmPassword: errorText,
          },
        }));
        break;
        case "zip":
          errorText = onlyNumberValidation(value)
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
    Object.keys(this.state.userData).forEach((val) => {
      if (!this.state.userData[val].length) {
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
    if (!errorCheck) {
      this.props.changePage('cart')
      this.setState({
        userData: INIT_NEW_USER,
      });
    }
  };

  render() {
    const inputData = [
      {
        id: 1,
        type: "text",
        label: "Email",
        name: "userEmail",
        error: "userEmail",
      },
      {
        id: 2,
        type: "password",
        label: "Password",
        name: "userPassword",
        error: "userPassword",
      },
      {
        id: 3,
        type: "password",
        label: "Confirm Password",
        name: "confirmPassword",
        error: "confirmPassword",
      },
      {
        id: 4,
        type: "text",
        label: "First Name",
        name: "firstName",
        error: "firstName",
      },
      {
        id: 5,
        type: "text",
        label: "Last Name",
        name: "lastName",
        error: "lastName",
      },
      { id: 6, type: "text", label: "Zip Code", name: "zip", error: "zip" },
    ];

    return (
      <form onSubmit={this.handleSignUp}>
        <div className="inputsWrapper">
          <h2>Sign Up</h2>
          {inputData.length
            ? inputData.map((input, index) => (
                <label key={index} htmlFor={input.id}>
                  <InputBase
                    autoComplete="off"
                    id={input.id}
                    value={
                      this.state.userData && this.state.userData[input.name]
                    }
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
            : null}
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
