import React from "react";
import './CartItemBase.css'



export const CartItemBase = ({ updateQuantity, ...props}) => (
   
   <div className="cartItemContainer">
      <div className="itemName">{props.name}</div>
      <div className="itemImageWrapper">
         <img className="itemImage" src={props.image} alt={props.name} />
      </div>
      <div className="itemPrice">Price: {props.price}</div>
      <div className="itemQuantity">
         <div>Quantity</div>
         <select value={''} onChange={() => updateQuantity('')} name={props.name} id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
         </select>
      </div>
      <button className="removeFromCart">Remove</button>
   </div>
)