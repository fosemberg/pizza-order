import React from 'react';

import { Context } from '../../App';

import './index.scss'
import { getRemoveToppingsModalContent } from '../../utils';
import { Button } from 'react-bootstrap';

const OrderButton: React.FC = () => {
  const {
    order,
    isFormValid,
    setIsModalShow,
    setModalContent,
  } = React.useContext(Context);
  return (
    <button
      onClick={() => {
        if (isFormValid) {
          setModalContent({
            header: 'Success!',
            body: 'Your pizza will start cook soon!'
          })
        } else {
          setModalContent(getRemoveToppingsModalContent(order, order.size))
        }
        setIsModalShow(true)
      }}
      className="OrderButton"
    >
      Place Order
    </button>
  );
};

export default OrderButton;
