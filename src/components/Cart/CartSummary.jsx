import React from 'react';

export const CartSummary = ({ updateItemPrice, mainState }) => {
  return mainState.currentUser.cart.length
    ? mainState.currentUser.cart.map((item, index) => (
        <div key={index} className="summaryWrapper">
          <div>{item.title}</div>
          <div className="summaryItemQuantity">Quantity: {item.quantity}</div>
          <div className="totalPrice">
            Total: {updateItemPrice(item.price, item.quantity)}
          </div>
        </div>
      ))
    : null;
};
