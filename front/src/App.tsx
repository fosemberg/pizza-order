import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import * as _ from 'lodash';

import './App.scss';
import CardToggle from './components/CardToggle';
import CrustTypePicker from './containers/CrustTypePicker';
import ErrorHandler from './containers/ErrorHandler';
import PizzaPreview from './containers/PizzaPreview';
import Divider from './components/Divider';

const formatToppingText = (str: string) => {
  return _.capitalize(str).replace(/-/g, ' ');
};

const classList = (classes: object) => {
  return Object.entries(classes)
    .filter((entry) => entry[1])
    .map((entry) => entry[0])
    .join(' ');
};

const formatPrice = (amount: number, currencyId?: string) => {
  const options = {
    style: 'currency',
    currency: currencyId || 'USD',
    minimumFractionDigits: 2
  };

  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(amount / 100);
};

const PlaceOrder: React.FC = () => {
  const { order, isFormValid } = React.useContext(Context);
  const {toppings, size} = order;

  const sizePrice = orderSizeInfo[size].price
  const crustTypePrice = order.isThick ? 400 : 200
  const toppingsPrice = toppings.length > 3
    ? (toppings.length - 3) * 50
    : 0
  const totalPrice = sizePrice + crustTypePrice + toppingsPrice

  return (
    <div className="order">
      <div className="order__summary">
        <ul className="order__list">
          <li className="order__item">
            <span>{formatToppingText(size)} Size</span>
            <span>{formatPrice(sizePrice)}</span>
          </li>
          <li className="order__item">
            <span>{order.isThick ? 'Thick' : 'Thin'} Crust type</span>
            <span>{formatPrice(crustTypePrice)}</span>
          </li>
          <li className="order__item">
            <span>Toppings</span>
            <span>{formatPrice(toppingsPrice)}</span>
          </li>
        </ul>
        <div className="order__total">
          <span>Total:</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>
      <button
        onClick={() =>
          alert(
            isFormValid
              ? 'Your order is being processed. Thank you!'
              : 'Some fields are incomplete.'
          )
        }
        className="order__btn neu-flat-red"
      >
        Place Order
      </button>
    </div>
  );
};

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

interface ToppingData {
  name: ToppingName;
  onPizza?: string;
  titleColor?: string;
}

const toppings: ToppingData[] = [
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

enum OrderSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

interface OrderSizeInfo {
  [size: string]: {
    price: number;
    inches: number;
    maximumToppings: number;
  };
}

const orderSizeInfo: OrderSizeInfo = {
  [OrderSize.Small]: { price: 800, inches: 8, maximumToppings: 5 },
  [OrderSize.Medium]: { price: 1_000, inches: 12, maximumToppings: 7 },
  [OrderSize.Large]: { price: 1_200, inches: 16, maximumToppings: 9 }
};

const ChooseToppings: React.FC = () => {
  const {
    order,
    setOrder,
    setErrorContent,
    setIsFormValid,
  } = React.useContext(Context);

  const toggleSelect = (order: Order, topping: ToppingData) => () => {
    const exists = _.find(order.toppings, { name: topping.name });
    const newToppings = exists
      ? order.toppings.filter((t) => t.name !== topping.name)
      : [...order.toppings, topping];

    console.log('front/src/App.tsx:toppings', newToppings);

    const { maximumToppings } = orderSizeInfo[order.size]

    if (
      newToppings.length > maximumToppings &&
      newToppings.length > order.toppings.length
    ) {
      setErrorContent({
        header: 'Topping Limit',
        body: 'The maximum of toppings for current Size: ' + maximumToppings,
      });
      setIsFormValid(true);
    } else {
      setOrder((prev: Order) => {
        return { ...prev, toppings: newToppings };
      });
    }
  };

  return (
    <div className="toppings">
      <div className="toppings__list">
        {toppings.map((topping) => (
          <CardToggle
            key={topping.name}
            onClick={toggleSelect(order, topping)}
            checked={!!_.find(order.toppings, {
              name: topping.name
            })}
            imgSrc={`./toggles/${topping.onPizza}`}
            titleText={formatToppingText(topping.name)}
            titleColor={topping.titleColor}
            toppingName={topping.name}
          />
        ))}
      </div>
    </div>
  );
};

const ChooseSize: React.FC = () => {
  const { order, setOrder } = React.useContext(Context);

  const handleSetOrder = (size: string) => () => {
    setOrder((prev: Order) => ({ ...prev, size }));
  };

  return (
    <div className="choose-size">
      <div className="choose-size__dishes">
        {Object.entries(orderSizeInfo).map(([size, details], i) => (
          <div
            key={i}
            onClick={handleSetOrder(size)}
            className={classList({
              'choose-size__size-dish': true,
              [`choose-size__size-dish--${size}`]: true,
              active: order.size === size
            })}
          >
            {details.inches}"
          </div>
        ))}
      </div>
    </div>
  );
};

const PizzaForm: React.FC = () => (
  <div className="form-container">
    <div className="form-inner">
      <Divider text="Size" />
      <ChooseSize />
      <Divider text="Crust type" />
      <CrustTypePicker/>
      <Divider text="Toppings" />
      <ChooseToppings />
    </div>
  </div>
);

export type Order = {
  size: string;
  isThick: boolean;
  toppings: ToppingData[];
};

interface ErrorContent {
  body: string;
  header: string;
}

interface ContextProps {
  order: Order;
  setOrder: (order: any) => void;
  isFormValid: boolean;
  setIsFormValid: (bool: boolean) => void;
  errorContent: ErrorContent;
  setErrorContent: (errorContent: ErrorContent) => void;
}

export const Context = React.createContext<ContextProps>({
  order: {
    size: '',
    isThick: false,
    toppings: [],
  },
  setOrder: () => {},
  isFormValid: true,
  setIsFormValid: () => {},
  errorContent: {
    header: '',
    body: '',
  },
  setErrorContent: () => {}
});

const App: React.FC = () => {
  const [order, setOrder] = React.useState<Order>({
    size: 'medium',
    isThick: false,
    toppings: [],
  });
  const [isFormValid, setIsFormValid] = React.useState(true);
  const [errorContent, setErrorContent] = React.useState({
    header: '',
    body: '',
  });

  return (
    <Context.Provider
      value={{
        order,
        setOrder,
        isFormValid,
        setIsFormValid,
        errorContent,
        setErrorContent,
      }}
    >
      <div className="app">
        <div className="PizzaDisplay">
          <PizzaPreview />
          <Divider text="Place Order" />
          <PlaceOrder />
        </div>
        <PizzaForm />
        <ErrorHandler/>
      </div>
    </Context.Provider>
  );
};

export default App;
