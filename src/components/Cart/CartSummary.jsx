import React from 'react';

export const CartSummary = ({
  updateItemPrice,
  mainState,
  handleQuantityChange,
  removeItem,
}) => {
  const options = Array.from({ length: 10 }, (_, i) => i + 1);

  return mainState.currentUser.cart.length
    ? mainState.currentUser.cart.map((item, index) => (
        <div key={index} className="summaryWrapper">
          <button
            id={item.name}
            onClick={() => removeItem(item.title)}
            className="removeFromCart"
          >
            X
          </button>
          <div className="imageTitle">
            <div>{item.title}</div>
            <img style={{ width: '80px' }} src={item.imageUrl} alt="" />
          </div>
          <div className="quantityAndSelect">
            <div className="summaryItemQuantity">
              Quantity:
              <select
                name={item.title}
                id={item.title}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e.target.value, item.id)}
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="totalPrice">
            Total: {updateItemPrice(item.price, item.quantity)}
          </div>
        </div>
      ))
    : null;
};
