import React from 'react';
import { Cart } from '../Cart/Cart';
import Shipping from '../Shipping/Shipping';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import './Main.css';
import logo from '../images/IMG_3589.PNG';
import { allUsers } from '../stateData';
import Payments from '../Payment/Payments';
import { Confirmation } from '../Confirmation/Confirmation';
import Products from '../Products/Products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHouse } from '@fortawesome/free-solid-svg-icons';

class Main extends React.Component {
  state = {
    displayPage: 'store',
    currentUser: undefined,
    users: allUsers,
    storeItems: [],
    filteredItems: [],
    userSearch: '',
    userSearchFiltered: [],
    cartSubtotal: '',
    showAdded: '',
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
    if (isNotLoggedIn) {
      this.changePage('signIn');
    } else if (!isNotLoggedIn) {
      this.changePage('cart');
    }
  };

  updateUserSearch = (userQuery) => {
    this.setState({ userSearch: userQuery });
  };

  handleUserSearch = (query) => {
    const filteredItems = this.state.storeItems.filter((item) =>
      item.title.includes(query.toUpperCase())
    );
    this.setState({ userSearchFiltered: filteredItems });
  };

  filterNav = (value) => {
    const filteredItems = this.state.storeItems.filter((items) => {
      return items.category[0].name === value;
    });
    this.setState({
      filteredItems: filteredItems,
    });
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

  handleQuantityChange = (value, buttonId) => {
    this.setState((prev) => ({
      currentUser: {
        ...prev.currentUser,
        cart: prev.currentUser.cart.map((item) =>
          item.id === buttonId ? { ...item, quantity: +value } : item
        ),
      },
    }));
  };

  checkIfAlreadyInCart = (id) => {
    return this.state.currentUser?.cart.some((item) => item.id === id);
  };

  addToUserCart = (id) => {
    if (this.checkIfAlreadyInCart(id)) {
      return;
    } else if (!this.state.currentUser) {
      return this.changePage('signIn');
    }
    const productData = this.state.storeItems.find((product) => product.id === id);
    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        cart: [...prevState.currentUser.cart, productData],
      },
      showAdded: id,
    }));
    setTimeout(() => {
      this.setState({ showAdded: '' });
    }, 1000);
  };

  removeItemFromCart = (itemName) => {
    const itemIndex = this.state.currentUser.cart.findIndex((item) => {
      return item.title === itemName;
    });
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
    const totalPrice = Object.values(cart).reduce((acc, item) => {
      const priceString = item.price.replace(/[$,]/g, '');
      const quantityPrices = parseInt(priceString * item.quantity);
      return acc + quantityPrices;
    }, 0);

    const shippingCost = this.state.shippingOption === 'express' ? 1500 : 0;
    const totalPriceWithShipping = totalPrice + shippingCost;

    const formattedPrice = totalPriceWithShipping.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    this.setState({ cartFinalPrice: formattedPrice });
  };

  enableCheckout = () => {
    if (this.state.currentUser.cart.length <= 1) {
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
      this.setState({
        cartFinalPrice: addSymbols,
        promoSuccess: true,
      });
    }
  };
  changeCurrentStep = (value) => {
    this.setState({ currentStep: value });
  };

  render() {
    const stateOptions = {
      signIn: (
        <SignIn
          mainState={this.state}
          changePage={this.changePage}
          checkIfEmailExists={this.checkIfEmailExists}
          updateCurrentUser={this.updateCurrentUser}
        />
      ),
      createAccount: (
        <SignUp
          state={this.state}
          changePage={this.changePage}
          checkIfEmailExists={this.checkIfEmailExists}
          updateState={this.updateState}
          createNewUser={this.createNewUser}
        />
      ),
      store: (
        <Products
          mainState={this.state}
          filterNav={this.filterNav}
          addToUserCart={this.addToUserCart}
          changePage={this.changePage}
          setStoreItems={this.setStoreItems}
          updateUserSearch={this.updateUserSearch}
          handleUserSearch={this.handleUserSearch}
        />
      ),
      cart: (
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
      ),
      shipping: (
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
      ),
      payments: (
        <Payments
          mainState={this.state}
          changePage={this.changePage}
          changeCurrentStep={this.changeCurrentStep}
          updateUserPaymentMethod={this.updateUserPaymentMethod}
          applyPromo={this.applyPromo}
        />
      ),
      confirmation: (
        <Confirmation
          mainState={this.state}
          changePage={this.changePage}
          changeCurrentStep={this.changeCurrentStep}
        />
      ),
    };

    return (
      <div>
        <div className="headerWrapper">
          <img style={{ width: '80px' }} src={logo} alt="" />
          <button
            className="navIcon"
            type="button"
            onClick={() => this.changePage('signIn')}
          >
            Log In
          </button>
          <button
            className="navIcon"
            type="button"
            onClick={() => this.changePage('createAccount')}
          >
            Sign Up
          </button>
          <button
            className="navIcon"
            type="button"
            onClick={() => this.changePage('store')}
          >
            <FontAwesomeIcon icon={faHouse} />
          </button>
          {/* <BuildRadios changePage={this.changePage} /> */}
          <button onClick={() => this.enableCartButton()} className="navIcon">
            <FontAwesomeIcon icon={faCartShopping} />
            {this.state.currentUser && (
              <div className="count">{this.state.currentUser.cart.length}</div>
            )}
          </button>
        </div>
        <div className="mainContent">{stateOptions[this.state.displayPage]}</div>
      </div>
    );
  }
}

export default Main;
