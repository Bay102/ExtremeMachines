import React from 'react';
import './Cart.css';
import { CartItemBase } from './CartItemBase';
import { CartSummary } from './CartSummary';

// if 0 items in cart checkout disabled

export class Cart extends React.Component {
  state = {
    subTotal: '',
    checkoutDisabled: true,
  };

  continueToShipping = (e) => {
    e.preventDefault();
    this.props.getSubtotal(this.props.totalCartPrice(this.props.mainState.storeItems));
    this.props.changePage('shipping');
    // this.props.updateSubTotal(this.props.state)
  };

  render() {
    const {
      mainState,
      handleQuantityChange,
      storeItems,
      removeItem,
      updateItemPrice,
      totalCartPrice,
    } = this.props;
    return (
      <div>
        <h2 className="cartH2">CART</h2>
        <div className="cartContainer">
          {Object.values(storeItems).length
            ? Object.entries(storeItems).map(([key, value]) => (
                <div key={key} className="itemWrapper">
                  <CartItemBase
                    state={mainState}
                    handleQuantityChange={handleQuantityChange}
                    name={`${key}`}
                    quantity={`${value.quantity}`}
                    price={`${value.price}`}
                    image={`${value.image}`}
                    removeItem={removeItem}
                  />
                </div>
              ))
            : null}
        </div>
        <div className="continueToCheckout">
          <div className="boxTitle">Cart Summary</div>
          <div className="cartSummary">
            <CartSummary storeItems={storeItems} updateItemPrice={updateItemPrice} />
            <div className="totalCartPrice">
              Cart Total: <br /> {totalCartPrice(mainState.storeItems)}
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
