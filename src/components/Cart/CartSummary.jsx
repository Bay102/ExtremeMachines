import React from "react";

export const CartSummary = (props) => {
   const {updateItemPrice , storeItems , mainState} = props; 
   return (
      Object.values(mainState.currentUser.cart).length
      ? Object.values(mainState.currentUser.cart).map((item, index) => (
         <div key={index} className="summaryWrapper">
               <div>{item.name}</div>
               <div className="summaryItemQuantity">
                 Quantity: {item.quantity}
               </div>
               <div className="totalPrice">
                 {/* Total: {updateItemPrice(item.price, item.newQuantity)} */}
               </div>
             </div>
           ))
           : null
           )
         }