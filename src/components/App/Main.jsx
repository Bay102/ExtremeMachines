import { Component } from "react";
import { Cart } from "../Cart/Cart";
// import { fakeUser } from "../stateData";
import { storeItems } from "../storeItems";
import Shipping from "../Shipping/Shipping";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import "./Main.css";
import { BuildRadios } from "../HomeScreenButtons/BuildRadios";
import { allUsers } from "../stateData";

class Main extends Component {
  // list all state here
  /// state objects should be arrays

  state = {
    displayPage: "signIn",
    currentUser: [],
    users: allUsers,
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
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        [sub]: newState,
      },
    }));
  };

  updateSubSubState = (parent, name, sub, newState, callBack) => {
    this.setState(
      (prev) => ({
        [parent]: {
          ...prev[parent],
          [name]: {
            ...prev[parent][name],
            [sub]: newState,
          },
        },
      }),
      callBack
    );
  };

 
  // need an update currentUser function

  // need a remove from cart function
  

  updateCurrentUser = (name, newState) => 
  this.updateState(name, newState);
  
  // need a add to users function 
  createNewUser = (newUser) => {
    this.setState({users: [...this.state.users, newUser]})
  }

  handleQuantityChange = (parent, name, sub, newState) =>
    this.updateSubSubState(parent, name, sub, newState);

// need a update cart price function
  updateItemPrice = (parent, name, sub, newState) =>
    this.updateSubSubState(parent, name, sub, newState);

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
              mainState={this.state}
              changePage={this.changePage}
              checkIfEmailExists={this.checkIfEmailExists}
              updateCurrentUser={this.updateCurrentUser}
              updateState={this.updateState}
              updateSubState={this.updateSubState}
            />
          )}
          {this.state.displayPage === "createAccount" && (
            <SignUp
              state={this.state}
              changePage={this.changePage}
              checkIfEmailExists={this.checkIfEmailExists}
              updateState={this.updateState}
              createNewUser={this.createNewUser}
            />
          )}
          {this.state.displayPage === "shipping" && (
            <Shipping
              state={this.state}
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
