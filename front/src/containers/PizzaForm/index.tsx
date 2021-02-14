import React from 'react';

import Divider from '../../components/Divider';
import SizePicker from '../SizePicker';
import CrustTypePicker from '../CrustTypePicker';
import ToppingsPicker from '../ToppingsPicker';

import './index.scss'

const PizzaForm: React.FC = () => (
  <div className="PizzaForm">
    <div className="PizzaForm__inner">
      <Divider text="Size" />
      <SizePicker />
      <Divider text="Crust type" />
      <CrustTypePicker/>
      <Divider text="Toppings" />
      <ToppingsPicker />
    </div>
  </div>
);

export default PizzaForm;
