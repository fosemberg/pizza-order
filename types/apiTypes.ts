export interface OrderSizeInfo {
  [size: string]: {
    price: number;
    inches: number;
    maximumToppings: number;
  };
}

export enum ToppingName {
  Pepperoni = 'pepperoni',
  Mushrooms = 'mushrooms',
  Onion = 'onion',
  Sausage = 'sausage',
  Bacon = 'bacon',
  ExtraCheese = 'extra-cheese',
  BlackOlives = 'black-olives',
  GreenPeppers = 'green-peppers',
  Pineapple = 'pineapple',
  Spinach = 'spinach',
}

export interface ToppingData {
  name: ToppingName;
  onPizza?: string;
  titleColor?: string;
}

export enum OrderSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type Order = {
  size: OrderSize;
  isThick: boolean;
  toppings: ToppingData[];
};
