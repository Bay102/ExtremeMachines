import { Component } from "react";
import { Cart } from "../Cart/Cart";
import { Radios } from "../HomeScreenButtons/Radios";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import "./Main.css";

class Main extends Component {
  state = {
    displayPage: 'cart',
    isLoggedIn: false,
    // chooseLogin: "signIn",
  };

  signInOrUp = (e) => {
    this.setState({
      displayPage: e.target.value
    })
  } 
  
  changePage = (value) => {
    this.setState({
      displayPage: value
    })
  }

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
                    onChange={this.signInOrUp}
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
            {this.state.displayPage === 'cart' ? <Cart /> : null}
            {this.state.displayPage === "signIn" ? <SignIn changePage={this.changePage} /> : null}
            {this.state.displayPage === "createAccount" ? <SignUp changePage={this.changePage}  getEmail={this.getEmail} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
