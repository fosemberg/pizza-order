import { ToppingData } from './apiTypes';

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

export interface ModalContent {
  body: string;
  header: string;
}

