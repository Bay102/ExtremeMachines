import React from "react";
import "./CartItemBase.css";

export const CartItemBase = ({
  handleQuantityChange,
  name,
  id,
  image,
  price,
  removeItem,
  quantity,
}) => {
  const options = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="cartItemContainer">
      <div className="itemName">{name}</div>
      <div className="itemImageWrapper">
        <img className="itemImage" src={image} alt={name} />
      </div>
      <div className="itemPrice">Price: {price}</div>
      <div className="itemQuantity">
        <div>Quantity</div>
        <select
          name={name}
          id={name}
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value, id)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <button
        id={name}
        onClick={() => removeItem(name)}
        className="removeFromCart"
      >
        X
      </button>
    </div>
  );
};
