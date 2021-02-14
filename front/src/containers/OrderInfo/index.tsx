import React from 'react';

import { Context } from '../../data';
import { orderSizeInfo } from '../../data';
import { formatPrice, formatToppingText } from '../../utils';

import './index.scss'

const OrderInfo: React.FC = () => {
  const {
    order,
  } = React.useContext(Context);
  const {toppings, size} = order;

  const sizePrice = orderSizeInfo[size].price
  const crustTypePrice = order.isThick ? 400 : 200
  const toppingsPrice = toppings.length > 3
    ? (toppings.length - 3) * 50
    : 0
  const totalPrice = sizePrice + crustTypePrice + toppingsPrice

  return (
    <div className="OrderInfo">
      <ul className="OrderInfo__list">
        <li className="OrderInfo__item">
          <span>{formatToppingText(size)} Size</span>
          <span>{formatPrice(sizePrice)}</span>
        </li>
        <li className="OrderInfo__item">
          <span>{order.isThick ? 'Thick' : 'Thin'} Crust type</span>
          <span>{formatPrice(crustTypePrice)}</span>
        </li>
        <li className="OrderInfo__item">
          <span>Toppings</span>
          <span>{formatPrice(toppingsPrice)}</span>
        </li>
      </ul>
      <div className="OrderInfo__total">
        <span>Total:</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
};

export default OrderInfo
