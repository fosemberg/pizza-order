import React from 'react';
import {SERVER_HOST, SERVER_HTTP_PORT} from "../config/env";
import { ModalContent, Order, OrderSize} from '../types';
import { OrderSizeInfo, ToppingData, ToppingName } from '../types/apiTypes';

const hostUrl = `${SERVER_HOST}:${SERVER_HTTP_PORT}`;

export const orderSizeInfo: OrderSizeInfo = {
  [OrderSize.Small]: { price: 800, inches: 8, maximumToppings: 5 },
  [OrderSize.Medium]: { price: 1_000, inches: 12, maximumToppings: 7 },
  [OrderSize.Large]: { price: 1_200, inches: 16, maximumToppings: 9 }
};

export const toppings: ToppingData[] = [
  { name: ToppingName.Pepperoni, onPizza: 'pepperoni.png'},
  { name: ToppingName.Mushrooms, onPizza: 'mushrooms.png', titleColor: 'black' },
  { name: ToppingName.Onion, onPizza: 'onions.png', titleColor: 'black' },
  { name: ToppingName.Sausage, onPizza: 'sausage.png' },
  { name: ToppingName.Bacon, onPizza: 'bacon.png', titleColor: 'black' },
  { name: ToppingName.ExtraCheese, onPizza: 'extra-cheese.png', titleColor: 'black' },
  { name: ToppingName.BlackOlives, onPizza: 'black-olives.png' },
  { name: ToppingName.GreenPeppers, onPizza: 'green-peppers.png' },
  { name: ToppingName.Pineapple, onPizza: 'pineapple.png', titleColor: 'black' },
  { name: ToppingName.Spinach, onPizza: 'spinach.png' },
];

export const fetchToppings = (): Promise<ToppingData[]> => {
  const endPoint = 'toppings';
  const fullUrl = `${hostUrl}/${endPoint}`;
  return fetch(`${fullUrl}`).then((res) => res.json());
};

export interface ToppingsStore {
  data: ToppingData[],
  isLoading: boolean,
  error: string,
}

interface ContextProps {
  toppings: ToppingsStore;
  order: Order;
  setOrder: (order: any) => void;
  isFormValid: boolean;
  setIsFormValid: (bool: boolean) => void;
  modalContent: ModalContent;
  setModalContent: (modalContent: ModalContent) => void;
  isModalShow: boolean;
  setIsModalShow: (isModalShow: boolean) => void;
}

export const Context = React.createContext<ContextProps>({
  toppings: {
    data: [],
    isLoading: false,
    error: '',
  },
  order: {
    size: '',
    isThick: false,
    toppings: [],
  },
  setOrder: () => {},
  isFormValid: true,
  setIsFormValid: () => {},
  modalContent: {
    header: '',
    body: '',
  },
  setModalContent: () => {},
  isModalShow: false,
  setIsModalShow: () => {},
});
