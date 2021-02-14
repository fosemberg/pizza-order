import { camelCase } from 'lodash';
import React from 'react';
import './index.scss';

enum ToppingName {
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

export enum PizzaToggleToppingShape {
  Round = 'round',
  Ring = 'ring',
  Oval = 'oval',
  Square = 'square',
  Gull = 'gull',
}

const mapToppingNameToToppingShape: {[key: string]: PizzaToggleToppingShape} = {
  [ToppingName.Pepperoni]: PizzaToggleToppingShape.Round,
  [ToppingName.Mushrooms]: PizzaToggleToppingShape.Gull,
  [ToppingName.Onion]: PizzaToggleToppingShape.Ring,
  [ToppingName.Sausage]: PizzaToggleToppingShape.Oval,
  [ToppingName.Bacon]: PizzaToggleToppingShape.Square,
  [ToppingName.ExtraCheese]: PizzaToggleToppingShape.Round,
  [ToppingName.BlackOlives]: PizzaToggleToppingShape.Round,
  [ToppingName.GreenPeppers]: PizzaToggleToppingShape.Gull,
  [ToppingName.Pineapple]: PizzaToggleToppingShape.Square,
  [ToppingName.Spinach]: PizzaToggleToppingShape.Round,
}

export enum PizzaTogglePizzaShape {
  Thick = 'thick',
  Big = 'big',
  Default = 'default',
}

interface PizzaToggleProps {
  className?: string;
  checked?: boolean;
  onChange?: (e: any) => void;
  toppingName?: ToppingName;
  toppingShape?: PizzaToggleToppingShape;
  pizzaShape?: PizzaTogglePizzaShape;
  titleText?: string;
  titleColor?: string;
}

const PizzaToggle: React.FC<PizzaToggleProps> = (
  {
    className = '',
    checked,
    onChange = (e) => void(0),
    toppingName,
    toppingShape,
    pizzaShape = PizzaTogglePizzaShape.Default,
    titleText = 'pepperoni',
    titleColor = 'yellow',
  }
) => (
  <div className={[
    'PizzaToggle',
    ...(toppingName
      ? [
        `PizzaToggle_toppingName_${camelCase(toppingName)}`,
        `PizzaToggle_toppingShape_${mapToppingNameToToppingShape[toppingName]}`
      ]
      : [
        `PizzaToggle_toppingShape_${toppingShape}`
      ]),
    `PizzaToggle_pizzaShape_${pizzaShape}`,
    className,
  ].join(' ')}>
    <div
      className="PizzaToggle__title"
      style={{
        color: titleColor,
      }}
    >
      {titleText}
    </div>
    <input
      type="checkbox"
      onChange={onChange}
      checked={checked}
    />
    <div className="PizzaToggle__shadow"/>
    <div className="PizzaToggle__pizza">
      <div className="PizzaToggle__inner">
        { new Array(5).fill(0).map((val, index) => (
          <div
            key={index}
            className="PizzaToggle__topping"
          />
        )) }
      </div>
    </div>
  </div>
)

export default PizzaToggle;
