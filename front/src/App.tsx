import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import ModalContainer from './containers/Modal';
import {Order, OrderSize,} from './types';
import { Context, fetchOrderSizeInfo, fetchToppings, getDefaultStore, StoreItem } from './data';
import PizzaForm from './containers/PizzaForm';
import PizzaDisplay from './containers/PizzaDisplay';

import './App.scss';
import { OrderSizeInfo, ToppingData } from './types/apiTypes';

const App: React.FC = () => {
  const [toppings, setToppings] = useState<StoreItem<ToppingData[]>>(getDefaultStore<ToppingData[]>([]))
  const [orderSizeInfo, setOrderSizeInfo] = useState<StoreItem<OrderSizeInfo>>(getDefaultStore<OrderSizeInfo>({}))
  const [order, setOrder] = React.useState<Order>({
    size: OrderSize.Medium,
    isThick: false,
    toppings: [],
  });
  const [isFormValid, setIsFormValid] = React.useState(true);
  const [modalContent, setModalContent] = React.useState({
    header: '',
    body: '',
  });
  const [isModalShow, setIsModalShow] = React.useState(false);

  useEffect(() => {
    (async () => {
      try {
        setToppings({
          data: await fetchToppings(),
          isLoading: false,
          error: '',
        })
      } catch (e) {
        setToppings({
          data: [],
          isLoading: false,
          error: String(e),
        })
      }

      try {
        setOrderSizeInfo({
          data: await fetchOrderSizeInfo(),
          isLoading: false,
          error: '',
        })
      } catch (e) {
        setOrderSizeInfo({
          data: {},
          isLoading: false,
          error: String(e),
        })
      }
    })()
  }, []);

  return (
    <Context.Provider
      value={{
        orderSizeInfo,
        toppings,
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
