import React from "react";

export const CartSummary = (props) => {
   const {updateItemPrice , storeItems } = props; 
   return (
      Object.values(storeItems).length
      ? Object.values(storeItems).map((item, index) => (
         <div key={index} className="summaryWrapper">
               <div>{item.name}</div>
               <div className="summaryItemQuantity">
                 Quantity: {item.quantity}
               </div>
               <div className="totalPrice">
                 Total: {updateItemPrice(item.price, item.quantity)}
               </div>
             </div>
           ))
           : null
           )
         }