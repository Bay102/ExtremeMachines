import React from 'react';
import { Cart } from '../Cart/Cart';
import { storeItems } from '../storeItems';
import Shipping from '../Shipping/Shipping';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import './Main.css';
import logo from '../images/IMG_3558.jpeg';
import { BuildRadios } from '../HomeScreenButtons/BuildRadios';
import { allUsers } from '../stateData';
import Payments from '../Payment/Payments';

class Main extends React.Component {
  state = {
    displayPage: 'signIn',
    currentUser: '',
    users: allUsers,
    storeItems,
    cartSubtotal: '',
    shippingOption: 'standard',
    cartFinalPrice: '',
    checkoutDisabled: false,
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
    const priceString = itemPrice.replace(/[$,]/g, '');
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
    if (this.state.shippingOption === 'express') {
      totalPrice += 1500;
    }
    const formattedPrice = totalPrice.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return formattedPrice;
  };

  getSubtotal = (value) => {
    this.setState({ cartSubtotal: value });
  };

  enableCheckout = () => {
    console.log(Object.entries(this.state.storeItems));
    if (Object.entries(this.state.storeItems).length <= 1) {
      this.setState({ checkoutDisabled: true });
    }
  };

  removeItemFromCart = (itemName) => {
    const storeItemsCopy = { ...this.state.storeItems };
    delete storeItemsCopy[itemName];
    this.enableCheckout();
    this.setState({ storeItems: storeItemsCopy });
  };

  updateUserCart = (users, buttonId) => {
    const findUser = users.find((user) => user.user === buttonId);
    console.log(findUser);
  };

  handleShippingChange = (event) => {
    this.setState({
      shippingOption: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="headerWrapper">
          <img style={{ width: '130px' }} src={logo} alt="" />
          <BuildRadios changePage={this.changePage} />
        </div>
        <div className="mainContent">
          {this.state.displayPage === 'signIn' && (
            <SignIn
              mainState={this.state}
              changePage={this.changePage}
              checkIfEmailExists={this.checkIfEmailExists}
              updateCurrentUser={this.updateCurrentUser}
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
              mainState={this.state}
              handleQuantityChange={this.handleQuantityChange}
              storeItems={this.state.storeItems}
              removeItem={this.removeItemFromCart}
              updateUserCart={this.updateUserCart}
              changePage={this.changePage}
              updateState={this.updateState}
              updateItemPrice={this.updateItemPrice}
              totalCartPrice={this.totalCartPrice}
              getSubtotal={this.getSubtotal}
              // checkoutDisabled={this.checkoutDisabled}
            />
          )}
          {this.state.displayPage === 'shipping' && (
            <Shipping
              mainState={this.state}
              changePage={this.changePage}
              updateState={this.updateState}
              storeItems={this.state.storeItems}
              updatePriceAfterShipping={this.updatePriceAfterShipping}
              updateItemPrice={this.updateItemPrice}
              totalCartPrice={this.totalCartPrice}
              handleShippingChange={this.handleShippingChange}
            />
          )}
          {this.state.displayPage === 'payments' && (
            <Payments mainState={this.state} changePage={this.changePage} />
          )}
        </div>
      </div>
    );
  }
}

export default Main;
