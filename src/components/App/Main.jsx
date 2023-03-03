import React from 'react';
import { Cart } from '../Cart/Cart';
import { storeItems } from '../storeItems';
import Shipping from '../Shipping/Shipping';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import './Main.css';
import logo from "../images/IMG_3558.jpeg"
import { BuildRadios } from '../HomeScreenButtons/BuildRadios';
import { allUsers } from '../stateData';
import Payments from '../Payment/Payments';

class Main extends React.Component {
  state = {
    displayPage: 'signIn',
    currentUser: '',
    users: allUsers,
    storeItems,
    subTotal: '',
    finalPrice: '',
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
    console.log(name, sub, newState);
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        [sub]: newState,
      },
    }));
  };

  updateSubSubState = (parent, name, sub, newState) => {
    this.setState((prev) => ({
      [parent]: {
        ...prev[parent],
        [name]: {
          ...prev[parent][name],
          [sub]: newState,
        },
      },
    }));
  };

  updateCurrentUser = (user) => {
    this.setState({ currentUser: user });
  };

  createNewUser = (newUser) => {
    this.setState({ users: [...this.state.users, newUser] });
  };

  handleQuantityChange = (parent, name, sub, newState) =>
    this.updateSubSubState(parent, name, sub, newState);

  updateItemPrice = (itemPrice, itemQuantity) => {
    const priceString = itemPrice.replace(/[$,]/g, ''); // remove dollar sign and commas
    const doMath = parseInt(priceString) * itemQuantity;
    const formattedPrice = doMath.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formattedPrice;
  };

  totalCartPrice = (cart) => {
    let totalPrice = 0;
    for (const item of Object.values(cart)) {
      const priceString = item.price.replace(/[$,]/g, '');
      let quantityPrices = parseInt(priceString * item.quantity);
      totalPrice = totalPrice += quantityPrices;
    }
    return totalPrice.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  removeItemFromCart = (itemName) => {
    const storeItemsCopy = { ...this.state.storeItems };
    delete storeItemsCopy[itemName];
    this.setState({ storeItems: storeItemsCopy });
  };

  updateUserCart = (users, buttonId) => {
    const findUser = users.find((user) => user.user === buttonId);
    console.log(findUser);
  };

  render() {
    return (
      <div>
        <div className="headerWrapper">
          <img style={{width: '120px'}} src={logo} alt="" />
          {/* <h2>CarCommerce</h2> */}
          <BuildRadios changePage={this.changePage} />
        </div>
        <div className="mainContent">
          {this.state.displayPage === 'signIn' && (
            <SignIn
              mainState={this.state}
              changePage={this.changePage}
              checkIfEmailExists={this.checkIfEmailExists}
              updateCurrentUser={this.updateCurrentUser}
              updateSubState={this.updateSubState}
            />
          )}
          {this.state.displayPage === 'createAccount' && (
            <SignUp
              state={this.state}
              changePage={this.changePage}
              checkIfEmailExists={this.checkIfEmailExists}
              updateState={this.updateState}
              createNewUser={this.createNewUser}
            />
          )}
          {this.state.displayPage === 'cart' && (
            <Cart
              state={this.state}
              handleQuantityChange={this.handleQuantityChange}
              storeItems={this.state.storeItems}
              removeItem={this.removeItemFromCart}
              updateUserCart={this.updateUserCart}
              changePage={this.changePage}
              updateState={this.updateState}
              updateItemPrice={this.updateItemPrice}
              totalCartPrice={this.totalCartPrice}
            />
          )}
          {this.state.displayPage === 'shipping' && (
            <Shipping
              mainState={this.state}
              changePage={this.changePage}
              updateState={this.updateState}
              storeItems={this.state.storeItems}
              updateItemPrice={this.updateItemPrice}
              totalCartPrice={this.totalCartPrice}
            />
          )}
          {this.state.displayPage === 'payments' && (
          <Payments mainState={this.state}/>
          )}
        </div>
      </div>
    );
  }
}

export default Main;
