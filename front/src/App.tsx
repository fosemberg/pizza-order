import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import * as _ from 'lodash';

import './App.scss';
import CardToggle from './components/CardToggle';
import CrustTypePicker from './containers/CrustTypePicker';

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

const Divider: React.FC<{ text: string }> = (props) => (
  <div className="divider">{props.text}</div>
);

const PlaceOrder: React.FC = () => {
  const { order, formIsValid } = React.useContext(Context);
  const {toppings, size} = order;

  const sizePrice = sizePrices[size].price
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
            formIsValid
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

const ChooseToppings: React.FC = () => {
  const { setOrder, order } = React.useContext(Context);

  const toggleSelect = (topping: ToppingData) => () => {
    setOrder((prev: Order) => {
      const exists = _.find(prev.toppings, { name: topping.name });
      const toppings = exists
        ? prev.toppings.filter((t) => t.name !== topping.name)
        : [...prev.toppings, topping];
      return { ...prev, toppings };
    });
  };

  return (
    <div className="toppings">
      <div className="toppings__list">
        {toppings.map((topping) => (
          <CardToggle
            key={topping.name}
            onClick={toggleSelect(topping)}
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

interface SizePrice {
  [size: string]: {
    price: number;
    inches: number;
  };
}

const sizePrices: SizePrice = {
  small: { price: 800, inches: 8 },
  medium: { price: 1_000, inches: 12 },
  large: { price: 1_200, inches: 16 }
};

const ChooseSize: React.FC = () => {
  const { order, setOrder } = React.useContext(Context);

  const handleSetOrder = (size: string) => () => {
    setOrder((prev: Order) => ({ ...prev, size }));
  };

  return (
    <div className="choose-size">
      <div className="choose-size__dishes">
        {Object.entries(sizePrices).map(([size, details], i) => (
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
      <Divider text="Place Order" />
      <PlaceOrder />
    </div>
  </div>
);

const PizzaViewer: React.FC = () => {
  const { order } = React.useContext(Context);

  return (
    <div className="PizzaViewer">
      <img
        className="pizza__part"
        src={`./pizza-base.png`}
        alt=""
      />
      <img
        className="pizza__part"
        src={`./pizza-sauce.png`}
        alt=""
      />
      {order.toppings.map(({onPizza}, i) => (
        <img
          key={onPizza}
          className="pizza__part"
          src={`./toppings/on-pizza/${onPizza}`}
          alt=""
        />
      ))}
    </div>
  );
};

export type Order = {
  size: string;
  isThick: boolean;
  toppings: ToppingData[];
};

interface ContextProps {
  order: Order;
  formIsValid: boolean;
  setOrder: (order: any) => void;
  setFormIsValid: (bool: boolean) => void;
}

export const Context = React.createContext<ContextProps>({
  order: {
    size: '',
    isThick: false,
    toppings: [],
  },
  formIsValid: true,
  setOrder: () => {
  },
  setFormIsValid: () => {
  }
});

const App: React.FC = () => {
  const [order, setOrder] = React.useState<Order>({
    size: 'medium',
    isThick: false,
    toppings: [],
  });
  const [formIsValid, setFormIsValid] = React.useState(true);

  return (
    <Context.Provider
      value={{
        order,
        formIsValid,
        setFormIsValid,
        setOrder
      }}
    >
      <div className="app">
        <PizzaViewer />
        <PizzaForm />
      </div>
    </Context.Provider>
  );
};

export default App;
