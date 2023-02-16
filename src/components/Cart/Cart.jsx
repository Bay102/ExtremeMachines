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
    const cartItems = [
      {
        name: "Gladiator",
        price: "$109,255",
        quantity: "",
        image:
          "https://images.unsplash.com/photo-1609044761425-dac671e75597?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8amVlcCUyMGdsYWRpYXRvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      },
      {
        name: "NSX",
        price: "$179,500",
        quantity: "",
        image:
          "https://images.unsplash.com/photo-1560361586-8242b1fc06c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bnN4fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      },
      {
        name: "Delorian",
        price: "$249,999",
        quantity: "",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFNHNYdQsJW2Rg0EHMoB6mSamxIdkuUvR4jQ&usqp=CAU",
      },
      {
        name: "Skyline GTR",
        price: "$92,490",
        quantity: "",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNOfQ8_IpVKT6_i63mt3Uzw6HaXNlpfUO_7g&usqp=CAU",
      },
    ];

    return (
      <div>
        <h2>SHOPPING CART</h2>
        <div className="cartContainer">
          {cartItems.length
            ? cartItems.map((item, index) => (
                <div key={index} className="itemWrapper">
                  <CartItemBase
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    image={item.image}
                  />
                </div>
              ))
            : null}
          <div className="continueToCheckout">
            <div className="cartSummary">
              <div className="boxTitle">Cart Summary</div>
              {cartItems.length
                ? cartItems.map((item, index) => (
                    <div key={index} className="summaryWrapper">
                      <div>{item.name}</div>
                      <div className="summaryItemQuantity">{item.quantity}</div>
                      <div>{item.price}</div>
                    </div>
                  ))
                : null}
              <div className="totalPrice">
                Total: {this.state.totalCartPrice}
              </div>
            </div>
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
    );
  }
}
