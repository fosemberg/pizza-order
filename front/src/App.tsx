import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import ModalContainer from './containers/Modal';
import { Order, } from './types';
import { Context } from './data';
import PizzaForm from './containers/PizzaForm';
import PizzaDisplay from './containers/PizzaDisplay';

import './App.scss';

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
        <PizzaDisplay />
        <PizzaForm />
        <ModalContainer />
      </div>
    </Context.Provider>
  );
};

export default App;
