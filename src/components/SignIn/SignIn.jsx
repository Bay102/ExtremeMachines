import React, { Component } from "react";
import "./SignIn.css";
import { BuildSignInInputs, InputBase } from "../InputBase/InputBase";
import { emailContains, passwordLengthError } from "../validations";

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

  // handleBlur is capturing a 'name' and 'value' to be passed onto another function
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
    const errorCheck = this.preSubmit();
    if (!errorCheck) {
      this.props.updateCurrentUser(this.state.credentials);
      this.props.changePage("cart");
    }
  };

  render() {
    // const inputData = [
    //   {
    //     id: 1,
    //     type: "text",
    //     label: "email",
    //     name: "userEmail",
    //     error: "userEmail",
    //   },
    //   {
    //     id: 2,
    //     type: "password",
    //     label: "password",
    //     name: "userPassword",
    //     error: "userPassword",
    //   },
    // ];

    return (
      <form onSubmit={this.handleSignIn}>
        <BuildSignInInputs
          signInState={this.state}
          handleInputChange={this.handleInputChange}
          handleBlur={this.handleBlur}
        />
        {/* <div className="inputsWrapper">
          <h2>Sign In</h2>
          {inputData.length
            ? inputData.map((input, index) => (
                <label key={index} htmlFor={input.id}>
                  <InputBase
                    autoComplete="off"
                    id={input.id}
                    value={this.state.credentials[input.name] || ""}
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
         </div> */}
      </form>
    );
  }
}

export default SignIn;
