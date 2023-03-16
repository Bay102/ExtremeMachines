import React from 'react';
import { Cart } from '../Cart/Cart';
import Shipping from '../Shipping/Shipping';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import './Main.css';
import logo from '../images/IMG_3565.PNG';
import { BuildRadios } from '../HomeScreenButtons/BuildRadios';
import { allUsers } from '../stateData';
import Payments from '../Payment/Payments';
import { Confirmation } from '../Confirmation/Confirmation';
import Products from '../Products/Products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

class Main extends React.Component {
  state = {
    displayPage: 'store',
    currentUser: undefined,
    users: allUsers,
    storeItems: [],
    cartSubtotal: '',
    shippingOption: 'standard',
    cartFinalPrice: '',
    cartDisable: true,
    checkoutDisabled: false,
    currentStep: 1,
    promoCode: 'devslopes',
    promoSuccess: false,
  };

  changePage = (value) => {
    this.setState({
      displayPage: value,
    });
  };

  enableCartButton = () => {
    const isNotLoggedIn = this.state.currentUser === undefined;
    console.log(isNotLoggedIn);
    if (isNotLoggedIn) {
      this.changePage('signIn');
    }
    if (!isNotLoggedIn) {
      this.changePage('cart');
    }
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

  setStoreItems = (products) => {
    this.setState({ storeItems: products });
  };

  addToUserCart = (item) => {
    const productData = this.state.storeItems.find((product) => {
      return product.id === item;
    });
    this.setState((prev) => ({
      currentUser: {
        ...prev.currentUser,
        cart: [...prev.currentUser.cart, productData],
      },
    }));
  };

  handleQuantityChange = (parent, name, sub, newState) =>
    this.updateSubSubState(parent, name, sub, newState);

  removeItemFromCart = (itemName) => {
    const itemIndex = this.state.currentUser.cart.findIndex((item) => {
      return item.title === itemName;
    });
    console.log(itemIndex);

    const newCart = [...this.state.currentUser.cart];
    newCart.splice(itemIndex, 1);
    this.enableCheckout();
    this.setState((prev) => ({
      currentUser: {
        ...prev.currentUser,
        cart: newCart,
      },
    }));
  };

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

  getCartFinalPrice = (cart) => {
    let totalPrice = 0;
    for (const item of Object.values(cart)) {
      const priceString = item.price.replace(/[$,]/g, '');
      let quantityPrices = parseInt(priceString * item.quantity);
      totalPrice = totalPrice += quantityPrices;
    }
    let formattedPrice;
    if (this.state.shippingOption === 'express') {
      formattedPrice = totalPrice + 1500;
    } else formattedPrice = totalPrice;

    const addSymbols = formattedPrice.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    this.setState({ cartFinalPrice: addSymbols });
  };

  enableCheckout = () => {
    if (Object.entries(this.state.storeItems).length <= 1) {
      this.setState({ checkoutDisabled: true });
    }
  };

  handleShippingChange = (event) => {
    this.setState({
      shippingOption: event.target.value,
    });
  };

  updateUserPaymentMethod = (value) => {
    const last4 = value.substr(-4);
    this.setState((prev) => ({
      currentUser: {
        ...prev.currentUser,
        paymentMethod: last4,
      },
    }));
  };

  applyPromo = (totalPrice, enteredPromo) => {
    let afterPromo;
    if (enteredPromo === this.state.promoCode) {
      const priceString = totalPrice.replace(/[$,]/g, '');
      afterPromo = priceString - 10000;
      const addSymbols = afterPromo.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      this.setState({ cartFinalPrice: addSymbols });
      this.setState({ promoSuccess: true });
    }
  };
  changeCurrentStep = (value) => {
    this.setState({ currentStep: value });
  };

  render() {
    return (
      <div>
        <div className="headerWrapper">
          <img style={{ width: '100px' }} src={logo} alt="" />
          <BuildRadios changePage={this.changePage} />
          <button onClick={() => this.enableCartButton()} className="navCartIcon">
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
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
          {this.state.displayPage === 'store' && (
            <Products
              mainState={this.state}
              addToUserCart={this.addToUserCart}
              changePage={this.changePage}
              setStoreItems={this.setStoreItems}
            />
          )}
          {this.state.displayPage === 'cart' && (
            <Cart
              mainState={this.state}
              handleQuantityChange={this.handleQuantityChange}
              storeItems={this.state.storeItems}
              removeItem={this.removeItemFromCart}
              changePage={this.changePage}
              updateState={this.updateState}
              updateItemPrice={this.updateItemPrice}
              totalCartPrice={this.totalCartPrice}
              getSubtotal={this.getSubtotal}
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
              changeCurrentStep={this.changeCurrentStep}
              getCartFinalPrice={this.getCartFinalPrice}
            />
          )}
          {this.state.displayPage === 'payments' && (
            <Payments
              mainState={this.state}
              changePage={this.changePage}
              changeCurrentStep={this.changeCurrentStep}
              updateUserPaymentMethod={this.updateUserPaymentMethod}
              applyPromo={this.applyPromo}
            />
          )}
          {this.state.displayPage === 'confirmation' && (
            <Confirmation
              mainState={this.state}
              changePage={this.changePage}
              changeCurrentStep={this.changeCurrentStep}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Main;
