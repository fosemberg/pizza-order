import React from 'react';
import { Context } from '../../data';
import { classList, getRemoveToppingsModalContent } from '../../utils';
import { Order } from '../../types';

import './index.scss'
import { Alert, Spinner } from 'react-bootstrap';

const SizePicker: React.FC = () => {
  const {
    orderSizeInfo,
    order,
    setOrder,
    setModalContent,
    setIsFormValid,
    setIsModalShow,
  } = React.useContext(Context);

  const handleSetOrder = (size: string) => () => {
    const { maximumToppings } = orderSizeInfo.data[size]
    if (order.toppings.length > maximumToppings) {
      setModalContent(getRemoveToppingsModalContent(order, size, orderSizeInfo.data));
      setIsFormValid(false);
      setIsModalShow(true);
    }

    setOrder((prev: Order) => ({ ...prev, size }));
  };

  return (
    <div className="SizePicker">
      <div className="SizePicker__dishes">
        { orderSizeInfo.isLoading
          ? <Spinner animation="border" variant="warning" />
          : orderSizeInfo.error
            ? <Alert variant="danger">{orderSizeInfo.error}</Alert>
            : Object.entries(orderSizeInfo.data).map(([size, details], i) => (
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
            ))
        }
      </div>
    </div>
  );
};

export default SizePicker;
