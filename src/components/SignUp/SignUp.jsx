import React, { Component } from "react";
import { InputBase } from "../InputBase/InputBase";
import "../SignUp/SignUp.css";
import {
  onlyTextValidation,
  passwordLengthError,
  matchingPasswords,
  emailSymbol,
} from "../validations";

// Passwords must match | Reveal password with eye icon | Names no numbers

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
    if (e.target.name === "userEmail") {
      this.props.getEmail(e.target.value);
    }
  };

  // Get help with this function, 
  // matchingPasswords = (passwordState, confirmState) => {
  //   return confirmState !== passwordState ?  undefined : 'Passwords do not match'
  // }

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
      default:
        break;
    }
  };

  // handleBlur is capturing a 'name' and 'value' to be passed onto another function
  handleBlur = (e) => this.handleValidations(e.target.name, e.target.value);



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
      { id: 6, type: "number", label: "Zip Code", name: "zip" },
    ];

    return (
      <form onSubmit={this.handleSubmit}>
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
        </div>
      </form>
    );
  }
}

export default SignUp;
