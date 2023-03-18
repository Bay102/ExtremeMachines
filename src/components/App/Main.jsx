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
    filteredItems: [],
    cartSubtotal: '',
    showAdded: false,
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

  handleQuantityChange = (newState, buttonName) => {
    const cartItemIndex = this.state.currentUser.cart.findIndex((item) => {
      return item.title === buttonName;
    });

    this.setState((prev) => ({
      currentUser: {
        ...prev.currentUser,
        cart: [
          ...prev.currentUser.cart.slice(0, cartItemIndex),
          {
            ...prev.currentUser.cart[cartItemIndex],
            quantity: +newState,
          },
          ...prev.currentUser.cart.slice(cartItemIndex + 1),
        ],
      },
    }));
  };

  filterNav = (value) => {
    const filteredItems = this.state.storeItems.filter((items) => {
      return items.category[0].name === value;
    });
    console.log(filteredItems);

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

  addToUserCart = (item) => {
    if (this.state.currentUser) {
      const productData = this.state.storeItems.find((product) => {
        return product.id === item;
      });
      this.setState((prev) => ({
        showAdded: true,
        currentUser: {
          ...prev.currentUser,
          cart: [...prev.currentUser.cart, productData],
        },
      }));
      setTimeout(() => {
        this.setState({ showAdded: false });
      }, 2000);
    } else {
      this.changePage('signIn');
    }
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

  // updateItemPrice = (itemPrice, itemQuantity) => {
  //   const priceString = itemPrice.replace(/[\D]/g, '');
  //   const doMath = parseInt(priceString) * itemQuantity;
  //   const formattedPrice = doMath.toLocaleString('en-US', {
  //     style: 'currency',
  //     currency: 'USD',
  //   });
  //   return formattedPrice;
  // };

  // totalCartPrice = (cart) => {
  //   let totalPrice = 0;
  //   for (const item of Object.values(cart)) {
  //     console.log(item.price);

  //     const priceString = item.price.replace(/[\D]/g, '');

  //     console.log(priceString);

  //     let quantityPrices = parseInt(priceString * item.quantity);
  //     totalPrice = totalPrice += quantityPrices;

  //     console.log(quantityPrices);
  //     console.log(totalPrice);
  //   }
  //   // if (this.state.shippingOption === 'express') {
  //   //   totalPrice += 1500;
  //   // }
  //   // const formattedPrice = totalPrice.toLocaleString('en-US', {
  //   //   style: 'currency',
  //   //   currency: 'USD',
  //   // });
  //   // console.log(formattedPrice);
  //   // return formattedPrice;
  // };

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
          <img style={{ width: '100px' }} src={logo} alt="" />
          <BuildRadios changePage={this.changePage} />
          <button onClick={() => this.enableCartButton()} className="navCartIcon">
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
        </div>
        <div className="mainContent">{stateOptions[this.state.displayPage]}</div>
      </div>
    );
  }
}

export default Main;
