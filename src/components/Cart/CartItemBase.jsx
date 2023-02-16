import React from "react";
import './CartItemBase.css'

export const CartItemBase = ({...props}) => (
   <div className="cartItemContainer">
      <div className="itemName">{props.name}</div>
      <div className="itemImageWrapper">
         <img className="itemImage" src={props.image} alt={props.name} />
      </div>
      <div className="itemPrice">{props.price}</div>
      <div className="itemQuantity"></div>
   </div>
)