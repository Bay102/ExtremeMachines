import { Component } from "react";
import { Cart } from "../Cart/Cart";
import { fakeUser } from "../stateData";
import { storeItems } from "../storeItems";
import Shipping from "../Shipping/Shipping";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import "./Main.css";
import { BuildRadios } from "../HomeScreenButtons/BuildRadios";

class Main extends Component {
  // list all state here
  /// state objects should be arrays

  state = {
    displayPage: "cart",
    currentUser: [],
    users: [fakeUser],
    storeItems,
  };

  changePage = (value) => {
    this.setState({
      displayPage: value,
    });
  };

  updateState = (name, newState) => {
    this.setState((prevState) => ({
      ...prevState[name],
      [name]: newState,
    }));
  };

  updateSubState = (name, sub, newState) => {
    // console.log(name,sub, newState);
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        [sub]: newState,
      },
    }));
  };

  updateSubSubState = (parent, name, sub, newState) => {
    console.log(parent, name, sub, newState);
    this.setState((prev) => ({
      [parent]: {
        ...prev[parent],
        [name]: {
          ...prev[parent][name],
          [sub]: newState
        }
      }
    }))
  };

  createNewUser = (name, sub, newState) =>
    this.updateSubState(name, sub, newState);

  handleQuantityChange = (parent, name, sub, newState) =>
    this.updateSubSubState(parent, name, sub, newState);

  // this.updateSubState(('storeItems', 'quantity', e.target.value));

  render() {
    return (
      <div>
        <div className="headerWrapper">
          <h2>CarCommerce</h2>
          <BuildRadios changePage={this.changePage} />
        </div>
        <div className="mainContent">
          {this.state.displayPage === "cart" && (
            <Cart
              state={this.state}
              handleQuantityChange={this.handleQuantityChange}
              storeItems={this.state.storeItems}
              changePage={this.changePage}
              updateState={this.updateState}
            />
          )}
          {this.state.displayPage === "signIn" && (
            <SignIn
              changePage={this.changePage}
              updateState={this.updateState}
              updateSubState={this.updateSubState}
            />
          )}
          {this.state.displayPage === "createAccount" && (
            <SignUp
              changePage={this.changePage}
              updateState={this.updateState}
              createNewUser={this.createNewUser}
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
