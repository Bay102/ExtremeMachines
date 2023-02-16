import React from "react";
import './CartItemBase.css'

export const CartItemBase = ({...props}) => (
   <div className="cartItemContainer">
      <div className="itemName">{props.name}</div>
      <div className="itemImageWrapper">
         <img className="itemImage" src={props.image} alt={props.name} />
      </div>
      <div className="itemPrice">Price: {props.price}</div>
      <div className="itemQuantity">
         <div>Quantity</div>
         <select name={props.name} id="">
            <option value="1">1</option>
            <option value="1">2</option>
            <option value="1">3</option>
            <option value="1">4</option>
            <option value="1">5</option>
         </select>
      </div>
   </div>
)