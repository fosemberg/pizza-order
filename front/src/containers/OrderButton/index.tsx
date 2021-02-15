import React from 'react';

import { Context } from '../../data';

import './index.scss'
import { getRemoveToppingsModalContent } from '../../utils';
import { Spinner } from 'react-bootstrap';

const OrderButton: React.FC = () => {
  const {
    orderSizeInfo,
    order,
    isFormValid,
    setIsModalShow,
    setModalContent,
  } = React.useContext(Context);
  return (
    <button
      onClick={() => {
        if (orderSizeInfo.isLoading || orderSizeInfo.error) {
          return
        }
        if (isFormValid) {
          setModalContent({
            header: 'Success!',
            body: 'Your pizza will start cook soon!'
          })
        } else {
          setModalContent(getRemoveToppingsModalContent(order, order.size, orderSizeInfo.data))
        }
        setIsModalShow(true)
      }}
      className="OrderButton"
    >
      {orderSizeInfo.isLoading
        ? <Spinner animation="border" variant="warning" />
        : orderSizeInfo.error
          ? orderSizeInfo.error
          : 'Make an order'
      }
    </button>
  );
};

export default OrderButton;
