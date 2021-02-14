import { Order } from '../App';
import { orderSizeInfo } from '../data';
import { ModalContent } from '../types';
import * as _ from 'lodash';

export const getRemoveToppingsModalContent = (order: Order, size: string): ModalContent => {
  const { maximumToppings } = orderSizeInfo[size]
  return ({
    header: 'Topping Limit',
    body: `Please, remove ${order.toppings.length - maximumToppings} toppings. The maximum of toppings for ${order.size} size: ${maximumToppings}, but your current topping: ${order.toppings.length}`,
  })
}

export const formatToppingText = (str: string) => {
  return _.capitalize(str).replace(/-/g, ' ');
};

export const formatPrice = (amount: number, currencyId?: string) => {
  const options = {
    style: 'currency',
    currency: currencyId || 'USD',
    minimumFractionDigits: 2
  };

  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(amount / 100);
};
