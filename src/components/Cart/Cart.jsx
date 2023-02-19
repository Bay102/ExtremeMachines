import React from "react";
import "./Cart.css";
import { CartItemBase } from "./CartItemBase";

// items can be removed items from cart | total sum of all items calculated | if 0 items in cart checkout disabled

export class Cart extends React.Component {
  state = {
    totalCartPrice: "",
  };

  continueToShipping = (e) => {
    e.preventDefault();
    this.props.changePage("shipping");
  };

  render() {
    // mapping through state of storeItems to display state
    const { storeItems, updateQuantity } = this.props;
    
    return (
      <div>
        <h2 className="cartH2">CART</h2>
        <div className="cartContainer">
          {Object.values(storeItems).length
            ? Object.values(storeItems).map((item, index) => (
                <div key={index} className="itemWrapper">
                  <CartItemBase
                    updateQuantity={updateQuantity}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    image={item.image}
                  />
                </div>
              ))
            : null}
        </div>

        <div className="continueToCheckout">
          <div className="boxTitle">Cart Summary</div>
          <div className="cartSummary">
            {Object.values(storeItems).length
              ? Object.values(storeItems).map((item, index) => (
                  <div key={index} className="summaryWrapper">
                    <div>{item.name}</div>
                    <div className="summaryItemQuantity">
                      Quantity: {item.quantity}
                    </div>
                    <div>Total: {item.price}</div>
                  </div>
                ))
              : null}
            <div className="totalPrice">
              Cart Total: {this.state.totalCartPrice}
              <button
                onClick={this.continueToShipping}
                className="checkoutButton"
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
