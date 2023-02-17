import { Component } from "react";
import { Cart } from "../Cart/Cart";
import { Radios } from "../HomeScreenButtons/Radios";
import Shipping from "../Shipping/Shipping";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import "./Main.css";


class Main extends Component {
  state = {
    displayPage: 'cart',
    stateData: {},
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
          <h2>CarCommerce</h2>
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
            {this.state.displayPage === 'cart'  && <Cart changePage={this.changePage} /> }
            {this.state.displayPage === "signIn" && <SignIn changePage={this.changePage} /> }
            {this.state.displayPage === "createAccount" && <SignUp changePage={this.changePage}  getEmail={this.getEmail} /> }
            {this.state.displayPage === 'shipping'  && <Shipping changePage={this.changePage} /> }
          </div>
      </div>
    );
  }
}

export default Main;
