import React, { Component } from "react";
import "./SignIn.css";
import { InputBase } from "../InputBase/InputBase";
import { passwordLengthError, emailSymbol } from "../validations";


// User can sign in | if password in incorrect prompt error |
// Eye Icon on Password | if successful render Cart

const INIT_USER = {
  userEmail: "",
  userPassword: "",
};

class SignIn extends Component {
  state = {
    isLoggedIn: false,
    error: {},
    userData: INIT_USER,
  };

  handleInputChange = (e) => {
    this.setState((prevState) => ({
      userData: {
        ...prevState.userData,
        [e.target.name]: e.target.value,
      },
    }));
  };

  handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case "userEmail":
        errorText = emailSymbol(value) 
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            userEmail: errorText,
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
      default:
        break;
    }
  };

  // handleBlur is capturing a 'name' and 'value' to be passed onto another function
  handleBlur = (e) => this.handleValidations(e.target.name, e.target.value);

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     userData: INIT_USER,
  //   });
  // };

  render() {
    const inputData = [
      {
        id: 1,
        type: "text",
        label: "email",
        name: "userEmail",
        error: "userEmail",
      },
      {
        id: 2,
        type: "password",
        label: "password",
        name: "userPassword",
        error: "userPassword",
      },
    ];

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="inputsWrapper">
          <h2>Sign In</h2>
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
            <button type="submit">Sign In</button>
          </div>
        </div>
      </form>
    );
  }
}

export default SignIn;
