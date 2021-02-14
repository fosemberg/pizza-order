import React from 'react';

import OrderInfo from '../OrderInfo';
import OrderButton from '../OrderButton';

import './index.scss'

const OrderSection: React.FC = () => (
  <div className="OrderSection">
    <OrderInfo />
    <OrderButton />
  </div>
)

export default OrderSection;
