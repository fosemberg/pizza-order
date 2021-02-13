import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import * as _ from 'lodash';

import './App.scss';
import PizzaToggle from './components/PizzaToggle';
import CardToggle from './components/CardToggle';

const Base = 'https://svgshare.com/i/PoA.svg';
const Bacon = 'https://svgshare.com/i/Ppd.svg';
const Mozzarella = 'https://svgshare.com/i/PpB.svg';
const Mushroom = 'https://svgshare.com/i/Ppm.svg';
const Olive = 'https://svgshare.com/i/PoH.svg';
const Onion = 'https://svgshare.com/i/PoX.svg';
const Pepper = 'https://svgshare.com/i/Ppn.svg';
const Pepperoni = 'https://svgshare.com/i/PqD.svg';

const formatToppingText = (str: string) => {
  return str[0].toUpperCase() + str.slice(1).replace(/-/g, ' ');
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

const PhoneIcon: React.FC = (props) => (
  <svg {...props} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.46 5c-.06.89-.21 1.76-.45 2.59l1.2 1.2c.41-1.2.67-2.47.76-3.79h-1.51zM7.6 17.02c-.85.24-1.72.39-2.6.45v1.49c1.32-.09 2.59-.35 3.8-.75l-1.2-1.19zM16.5 3H20c.55 0 1 .45 1 1 0 9.39-7.61 17-17 17-.55 0-1-.45-1-1v-3.49c0-.55.45-1 1-1 1.24 0 2.45-.2 3.57-.57.1-.04.21-.05.31-.05.26 0 .51.1.71.29l2.2 2.2c2.83-1.45 5.15-3.76 6.59-6.59l-2.2-2.2c-.28-.28-.36-.67-.25-1.02.37-1.12.57-2.32.57-3.57 0-.55.45-1 1-1z"
    ></path>
  </svg>
);

const MarkerIcon: React.FC = (props) => (
  <svg {...props} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"
    ></path>
    <circle fill="currentColor" cx="12" cy="9" r="2.5"></circle>
  </svg>
);

const EnvelopeIcon: React.FC = (props) => (
  <svg {...props} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"
    ></path>
  </svg>
);

const MapIcon: React.FC = (props) => (
  <svg {...props} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM10 5.47l4 1.4v11.66l-4-1.4V5.47zm-5 .99l3-1.01v11.7l-3 1.16V6.46zm14 11.08l-3 1.01V6.86l3-1.16v11.84z"
    ></path>
  </svg>
);

const PersonIcon: React.FC = (props) => (
  <svg {...props} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
    />
  </svg>
);

type IconInterface = {
  name: string;
  className?: string;
  onClick?: (...args: any[]) => void;
};

const Icon: React.FC<IconInterface> = (props) => {
  switch (props.name) {
    case 'envelope':
      return <EnvelopeIcon {...props} />;
    case 'map':
      return <MapIcon {...props} />;
    case 'marker':
      return <MarkerIcon {...props} />;
    case 'person':
      return <PersonIcon {...props} />;
    case 'phone':
      return <PhoneIcon {...props} />;
    default:
      throw Error('Icon not found');
  }
};

const Divider: React.FC<{ text: string }> = (props) => (
  <div className="divider">{props.text}</div>
);

const PlaceOrder: React.FC = () => {
  const { order, formIsValid } = React.useContext(Context);
  const {toppings, size} = order;

  const sizePrice = sizePrices[size].price
  const toppingsPrice = toppings.length > 3
    ? (toppings.length - 3) * 50
    : 0
  const totalPrice = sizePrice + toppingsPrice

  return (
    <div className="order">
      <div className="order__summary">
        <ul className="order__list">
          <li className="order__item">
            <span>{formatToppingText(size)} Size</span>
            <span>{formatPrice(sizePrice)}</span>
          </li>
          <li key="Toppings" className="order__item">
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

type Topping =
  | 'pepperoni'
  | 'mushroom'
  | 'onion'
  | 'sausage'
  | 'bacon'
  | 'extra-cheese'
  | 'black-olives'
  | 'green-peppers'
  | 'pineapple'
  | 'spinach';

interface ToppingData {
  name: Topping;
  icon: string;
  onPizza?: string;
}

const toppings: ToppingData[] = [
  { name: 'pepperoni', icon: Pepperoni, onPizza: 'pepperoni.png' },
  { name: 'mushroom', icon: Mushroom, onPizza: 'mushrooms.png' },
  { name: 'onion', icon: Onion, onPizza: 'onions.png' },
  { name: 'sausage', icon: Onion, onPizza: 'sausage.png' },
  { name: 'bacon', icon: Bacon, onPizza: 'bacon.png' },
  { name: 'extra-cheese', icon: Mozzarella, onPizza: 'extra-cheese.png' },
  { name: 'black-olives', icon: Olive, onPizza: 'black-olives.png' },
  { name: 'green-peppers', icon: Pepper, onPizza: 'green-peppers.png' },
  { name: 'pineapple', icon: Pepper, onPizza: 'pineapple.png' },
  { name: 'spinach', icon: Pepper, onPizza: 'spinach.png' },
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
          <CardToggle imgSrc={`./toggles/${topping.onPizza}`} />
        ))}
        {toppings.map((t) => (
          <div
            key={t.name}
            onClick={toggleSelect(t)}
            className={classList({
              'neu-flat-light': !_.find(order.toppings, {
                name: t.name
              }),
              'neu-pressed-light': _.find(order.toppings, {
                name: t.name
              }),
              toppings__item: true
            })}
          >
            <span
              className={classList({
                'bg-gray': !_.find(order.toppings, {
                  name: t.name
                }),
                'bg-red': _.find(order.toppings, {
                  name: t.name
                }),
                toppings__icon: true
              })}
            >
              <img className="toppings__img" src={t.icon} alt={t.name} />
            </span>
            <span className="toppings__text">{formatToppingText(t.name)}</span>
          </div>
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

const sizePrices = {
  small: { price: 800, inches: 8 },
  medium: { price: 1_000, inches: 12 },
  large: { price: 1_200, inches: 16 }
} as SizePrice;

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
      <CardToggle imgSrc="./toggles/thin-thick-middle-pizza-with-arrows.png" />
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
              className="pizza__part"
              src={`./toppings/on-pizza/${onPizza}`}
              alt=""
            />
          ))}
    </div>
  );
};



type Order = {
  toppings: ToppingData[];
  size: string;
};

interface ContextProps {
  order: Order;
  formIsValid: boolean;
  setOrder: (order: any) => void;
  setFormIsValid: (bool: boolean) => void;
}

const Context = React.createContext<ContextProps>({
  order: { toppings: [], size: '' },
  formIsValid: true,
  setOrder: () => {
  },
  setFormIsValid: () => {
  }
});

const App: React.FC = () => {
  const [order, setOrder] = React.useState({
    toppings: [],
    size: 'medium'
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
