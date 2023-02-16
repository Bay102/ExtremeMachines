import { Component } from "react";
import { Cart } from "../Cart/Cart";
import { Radios } from "../HomeScreenButtons/Radios";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import "./Main.css";

class Main extends Component {
  state = {
    isLoggedIn: false,
    chooseLogin: "signIn",
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({
      ...prevState,
      [name]: value 
    }));
  };

  // getEmail = (value) => {
  //   this.setState({
  //     email: value,
  //   })
  // }

  render() {
    const radioData = [
      {
        title: "Sign In",
        id: "signIn",
        type: "radio",
        name: "chooseLogin",
        value: "signIn",
      },
      {
        title: "Create Account",
        id: "createAccount",
        type: "radio",
        name: "chooseLogin",
        value: "createAccount",
      },
    ];

    return (
      <div>
        <div className="headerWrapper">
          <h2>Welcome to Code Commerce!</h2>
     
          {radioData.length
            ? radioData.map((radio, index) => (
                <label
                  style={{ marginRight: "20px" }}
                  htmlFor={radio.id}
                  key={index}
                >
                  <Radios
                    id={radio.id}
                    type={radio.type}
                    onChange={this.handleChange}
                    name={radio.name}
                    value={radio.value}
                  />
                  {radio.title}
                </label>
              ))
            : null}
        </div>
        <div className="mainContent">
          <div className="fieldWrapper">
            {this.state.chooseLogin === "signIn" ? <SignIn /> : <SignUp />}
            {/* {this.state.chooseLogin === "createAccount" ? <SignUp getEmail={this.getEmail} /> : <Cart />} */}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
