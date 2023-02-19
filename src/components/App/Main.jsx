import { Component } from "react";
import { Cart } from "../Cart/Cart";
import { storeItems } from "../constants";
import { Radios } from "../HomeScreenButtons/Radios";
import Shipping from "../Shipping/Shipping";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import "./Main.css";

class Main extends Component {
  state = {
    displayPage: "cart",
    stateData: {
      userData: {
        userEmail: "",
        userPassword: "",
        userFirstName: "",
        userLastName: "",
        userZip: "",
      },
      userAccounts: {
        account1: {},
        account2: {},
      },
      userCart: storeItems,

      cartSummary: {
        cartTotal: "",
      },
    },
  };

  signInOrUp = (e) => {
    this.setState({
      displayPage: e.target.value,
    });
  };

  changePage = (value) => {
    this.setState({
      displayPage: value,
    });
  };

  updateState = (name, newState) => {
    // console.log([name], newState);
    this.setState({
      [name]: newState,
    });
  };

  updateSubState = (name, sub, state) => {
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        [sub]: state,
      },
    }));
  };



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
    console.log(this.state.stateData.userCart);

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
          {this.state.displayPage === "cart" && (
            <Cart
              updateSubState={this.updateSubState}
              storeItems={this.state.stateData.userCart}
              changePage={this.changePage}
              updateState={this.updateState}
            />
          )}
          {this.state.displayPage === "signIn" && (
            <SignIn
              changePage={this.changePage}
              updateState={this.updateState}
            />
          )}
          {this.state.displayPage === "createAccount" && (
            <SignUp
              changePage={this.changePage}
              updateState={this.updateState}
            />
          )}
          {this.state.displayPage === "shipping" && (
            <Shipping
              changePage={this.changePage}
              updateState={this.updateState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Main;
