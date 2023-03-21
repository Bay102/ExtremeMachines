import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';


export const ItemCard = ({ data, addToUserCart, mainState }) => {
  const { id, title, imageUrl, price, description } = data;

  return (
    <div className="cardContainer">
      <div className="left">
        <img className="itemImg" src={imageUrl} alt="" />
      </div>
      <div className="right">
        <h3 className="productTitle">{title}</h3>
        <h3 className="itemPrice">Starting at: {price}</h3>
        <div className="itemDescription">{description.replace(/(<([^>]+)>)/gi, '')}</div>

        <button onClick={() => addToUserCart(id)} id={id} className="addToCart">
         {mainState.showAdded === id ? <div className='toCart'>Added to Cart</div>: <FontAwesomeIcon icon={faCartPlus} />}
        </button>
      </div>
    </div>
  );
};
