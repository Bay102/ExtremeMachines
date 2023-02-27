import React from "react";
import "./CartItemBase.css";

export const CartItemBase = ({
  handleQuantityChange,
  name,
  image,
  price,
removeItem,
  ...props
}) => (
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
        value={props.state.storeItems.quantity}
        onChange={(e) => handleQuantityChange('storeItems', name ,'quantity' , e.target.value)}
         >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
    <button id={name} onClick={() => removeItem(name)} className="removeFromCart">Remove</button>
  </div>
);

