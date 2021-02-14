import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import * as _ from 'lodash';

import './App.scss';
import CardToggle from './components/CardToggle';
import CrustTypePicker from './containers/CrustTypePicker';
import PizzaPreview from './containers/PizzaPreview';
import Divider from './components/Divider';
import ModalContainer from './containers/Modal';
import { ModalContent } from './types';
import { formatToppingText } from './utils';
import { orderSizeInfo } from './data';
import OrderSection from './containers/OrderSection';

const classList = (classes: object) => {
  return Object.entries(classes)
    .filter((entry) => entry[1])
    .map((entry) => entry[0])
    .join(' ');
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
  const {
    order,
    setOrder,
    setModalContent,
    setIsFormValid,
    setIsModalShow,
  } = React.useContext(Context);

  const toggleSelect = (order: Order, topping: ToppingData) => () => {
    const exists = _.find(order.toppings, { name: topping.name });
    const newToppings = exists
      ? order.toppings.filter((t) => t.name !== topping.name)
      : [...order.toppings, topping];

    const { maximumToppings } = orderSizeInfo[order.size]

    if (
      newToppings.length > maximumToppings &&
      newToppings.length > order.toppings.length
    ) {
      setModalContent({
        header: 'Topping Limit',
        body: `The maximum of toppings for ${order.size} size: ${maximumToppings}`,
      });
      setIsModalShow(true);
    } else {
      if (newToppings.length <= maximumToppings) {
        setModalContent({
          header: '',
          body: '',
        });
        setIsFormValid(true)
      }
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

const getRemoveToppingsModalContent = (order: Order, size: string): ModalContent => {
  const { maximumToppings } = orderSizeInfo[size]
  return ({
    header: 'Topping Limit',
    body: `Please, remove ${order.toppings.length - maximumToppings} toppings. The maximum of toppings for ${order.size} size: ${maximumToppings}, but your current topping: ${order.toppings.length}`,
  })
}

const ChooseSize: React.FC = () => {
  const {
    order,
    setOrder,
    setModalContent,
    setIsFormValid,
    setIsModalShow,
  } = React.useContext(Context);

  const handleSetOrder = (size: string) => () => {
    const { maximumToppings } = orderSizeInfo[size]
    if (order.toppings.length > maximumToppings) {
      setModalContent(getRemoveToppingsModalContent(order, size));
      setIsFormValid(false);
      setIsModalShow(true);
    }

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

interface ContextProps {
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

const App: React.FC = () => {
  const [order, setOrder] = React.useState<Order>({
    size: 'medium',
    isThick: false,
    toppings: [],
  });
  const [isFormValid, setIsFormValid] = React.useState(true);
  const [modalContent, setModalContent] = React.useState({
    header: '',
    body: '',
  });
  const [isModalShow, setIsModalShow] = React.useState(false);

  return (
    <Context.Provider
      value={{
        order,
        setOrder,
        isFormValid,
        setIsFormValid,
        modalContent,
        setModalContent,
        isModalShow,
        setIsModalShow,
      }}
    >
      <div className="app">
        <div className="PizzaDisplay">
          <PizzaPreview />
          <Divider text="Place Order" />
          <OrderSection />
        </div>
        <PizzaForm />
        <ModalContainer />
      </div>
    </Context.Provider>
  );
};

export default App;
