import React from 'react';

import PizzaPreview from '../PizzaPreview';
import Divider from '../../components/Divider';
import OrderSection from '../OrderSection';

import './index.scss'

const PizzaDisplay: React.FC = () => (
  <div className="PizzaDisplay">
    <PizzaPreview />
    <Divider text="Place Order" />
    <OrderSection />
  </div>
)

export default PizzaDisplay;
