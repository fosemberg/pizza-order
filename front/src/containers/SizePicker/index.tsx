import React from 'react';
import { Context, orderSizeInfo } from '../../data';
import { classList, getRemoveToppingsModalContent } from '../../utils';
import { Order } from '../../types';

import './index.scss'

const SizePicker: React.FC = () => {
  const {
    order,
    setOrder,
    setModalContent,
    setIsFormValid,
    setIsModalShow,
  } = React.useContext(Context);

  const handleSetOrder = (size: string) => () => {
    const { maximumToppings } = orderSizeInfo[size]
    if (order.toppings.length > maximumToppings) {
      setModalContent(getRemoveToppingsModalContent(order, size));
      setIsFormValid(false);
      setIsModalShow(true);
    }

    setOrder((prev: Order) => ({ ...prev, size }));
  };

  return (
    <div className="SizePicker">
      <div className="SizePicker__dishes">
        {Object.entries(orderSizeInfo).map(([size, details], i) => (
          <div
            key={i}
            onClick={handleSetOrder(size)}
            className={classList({
              'SizePicker__size-dish': true,
              [`SizePicker__size-dish--${size}`]: true,
              active: order.size === size
            })}
          >
            {details.inches}"
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizePicker;
