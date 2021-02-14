import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import './App.scss';
import CrustTypePicker from './containers/CrustTypePicker';
import PizzaPreview from './containers/PizzaPreview';
import Divider from './components/Divider';
import ModalContainer from './containers/Modal';
import { Order, } from './types';
import { Context } from './data';
import OrderSection from './containers/OrderSection';
import ToppingsPicker from './containers/ToppingsPicker';
import SizePicker from './containers/SizePicker';

const PizzaForm: React.FC = () => (
  <div className="form-container">
    <div className="form-inner">
      <Divider text="Size" />
      <SizePicker />
      <Divider text="Crust type" />
      <CrustTypePicker/>
      <Divider text="Toppings" />
      <ToppingsPicker />
    </div>
  </div>
);

const App: React.FC = () => {
  const [order, setOrder] = React.useState<Order>({
    size: 'medium',
    isThick: false,
    toppings: [],
  });
  const [isFormValid, setIsFormValid] = React.useState(true);
  const [modalContent, setModalContent] = React.useState({
    header: '',
    body: '',
  });
  const [isModalShow, setIsModalShow] = React.useState(false);

  return (
    <Context.Provider
      value={{
        order,
        setOrder,
        isFormValid,
        setIsFormValid,
        modalContent,
        setModalContent,
        isModalShow,
        setIsModalShow,
      }}
    >
      <div className="app">
        <div className="PizzaDisplay">
          <PizzaPreview />
          <Divider text="Place Order" />
          <OrderSection />
        </div>
        <PizzaForm />
        <ModalContainer />
      </div>
    </Context.Provider>
  );
};

export default App;
