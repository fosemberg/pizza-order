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

export const orderSizeInfo: OrderSizeInfo = {
  [OrderSize.Small]: { price: 800, inches: 8, maximumToppings: 5 },
  [OrderSize.Medium]: { price: 1_000, inches: 12, maximumToppings: 7 },
  [OrderSize.Large]: { price: 1_200, inches: 16, maximumToppings: 9 }
};
