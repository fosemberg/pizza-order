import React, { useState } from 'react';

import { Context, sendNewOrder } from '../../data';

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

  const [isLoading, seIsLoading] = useState<boolean>(false)

  return (
    <button
      onClick={async () => {
        if (orderSizeInfo.isLoading || orderSizeInfo.error || isLoading) {
          return
        }
        if (isFormValid) {
          try {
            seIsLoading(true)
            const response = await sendNewOrder(order)
            setModalContent({
              header: 'Success!',
              body: response
            })
            seIsLoading(false)
          } catch (e) {
            setModalContent({
              header: 'Error',
              body: String(e)
            })
          }
        } else {
          setModalContent(getRemoveToppingsModalContent(order, order.size, orderSizeInfo.data))
        }
        setIsModalShow(true)
      }}
      className="OrderButton"
    >
      {orderSizeInfo.isLoading || isLoading
        ? <Spinner animation="border" variant="warning" />
        : orderSizeInfo.error
          ? orderSizeInfo.error
          : 'Make an order'
      }
    </button>
  );
};

export default OrderButton;
