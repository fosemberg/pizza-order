import React from 'react';
import {SERVER_HOST, SERVER_HTTP_PORT} from "../config/env";
import { ModalContent, Order, OrderSize} from '../types';
import { OrderSizeInfo, ToppingData, ToppingName } from '../types/apiTypes';

export interface StoreItem<T = any> {
  data: T;
  isLoading: boolean;
  error: string;
}

const hostUrl = `${SERVER_HOST}:${SERVER_HTTP_PORT}`;

function fetchStoreFabric<T = any> (endPoint: string) {
  return (): Promise<T> => {
    const fullUrl = `${hostUrl}/${endPoint}`
    return fetch(`${fullUrl}`).then((res) => res.json());
  }
}

export function getDefaultStore<T> (defaultData: T): StoreItem<T> {
  return ({
    data: defaultData,
    isLoading: true,
    error: '',
  })
}

export const fetchOrderSizeInfo = fetchStoreFabric<OrderSizeInfo>('orderSizeInfo')

export const fetchToppings = fetchStoreFabric<ToppingData[]>('toppings')

interface ContextProps {
  toppings: StoreItem<ToppingData[]>;
  orderSizeInfo: StoreItem<OrderSizeInfo>;
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
  orderSizeInfo: getDefaultStore<OrderSizeInfo>({}),
  toppings: getDefaultStore<ToppingData[]>([]),
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
