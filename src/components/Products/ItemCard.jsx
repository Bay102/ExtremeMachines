import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";



export const ItemCard = ({ data, addToUserCart }) => {
  const { category, id, title, imageUrl, quantity, price, description } = data;

  return (
    <div className="cardContainer">
      <div className="left">
        <img className="itemImg" src={imageUrl} alt="" />
      </div>
      <div className="right">
        <h3 className='productTitle'>{title}</h3>
        <div className="itemPrice">Starting at: {price}</div>
        <div className="itemDescription">{description.replace(/(<([^>]+)>)/gi, '')}</div>
        <button onClick={() => addToUserCart(id)} id={id} className='addToCart'>
         <FontAwesomeIcon icon={faCartPlus} />
        </button>
      </div>
    </div>
  );
};
