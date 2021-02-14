export type Order = {
  size: string;
  isThick: boolean;
  toppings: ToppingData[];
};

export enum OrderSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export interface OrderSizeInfo {
  [size: string]: {
    price: number;
    inches: number;
    maximumToppings: number;
  };
}

export interface ModalContent {
  body: string;
  header: string;
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
