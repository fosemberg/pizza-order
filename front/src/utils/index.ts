import { ModalContent} from '../types';
import * as _ from 'lodash';
import { Order, OrderSizeInfo } from '../types/apiTypes';

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

export const classList = (classes: object) => {
  return Object.entries(classes)
    .filter((entry) => entry[1])
    .map((entry) => entry[0])
    .join(' ');
};

export const getRemoveToppingsModalContent = (order: Order, size: string, orderSizeInfo: OrderSizeInfo): ModalContent => {
  const { maximumToppings } = orderSizeInfo[size]
  return ({
    header: 'Toppings Limit',
    body: `Please, remove ${order.toppings.length - maximumToppings} toppings. The maximum of toppings for the ${order.size} size is ${maximumToppings}, but the current number is ${order.toppings.length}.`,
  })
}
