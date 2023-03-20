import React from 'react';
import './Cart.css';
import { CartItemBase } from './CartItemBase';
import { CartSummary } from './CartSummary';

export class Cart extends React.Component {
  state = {
    subTotal: '',
    checkoutDisabled: true,
  };

  continueToShipping = (e) => {
    e.preventDefault();
    this.props.getSubtotal(this.props.totalCartPrice(this.props.mainState.currentUser.cart));
    this.props.changePage('shipping');
  };

  render() {
    const {
      mainState,
      handleQuantityChange,
      removeItem,
      updateItemPrice,
      totalCartPrice,
    } = this.props;
    return (
      <div>
        <h2 className="cartH2">CART</h2>
        <div className="cartContainer">
          {mainState.currentUser.cart.length
            ? mainState.currentUser.cart.map((item) => (
                <div key={item.id} className="itemWrapper">
                  <CartItemBase
                    state={mainState}
                    handleQuantityChange={handleQuantityChange}
                    name={item.title}
                    quantity={item.quantity}
                    price={item.price}
                    image={item.imageUrl}
                    removeItem={removeItem}
                    id={item.id}
                  />
                </div>
              ))
            : null}
        </div>
        <div className="continueToCheckout">
          <div className="boxTitle">Cart Summary</div>
          <div className="cartSummary">
            <CartSummary mainState={mainState} updateItemPrice={updateItemPrice} />
            <div className="totalCartPrice">
              Cart Total: <br /> {totalCartPrice(mainState.currentUser.cart)}
              <button
                disabled={mainState.checkoutDisabled}
                className="checkoutButton"
                onClick={this.continueToShipping}
                type="button"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
