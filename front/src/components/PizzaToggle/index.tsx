import { camelCase } from 'lodash';
import React from 'react';
import './index.scss';

const toppingNameToCssClass = (toppingName: ToppingName) => camelCase(toppingName)

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

enum ToppingShape {
  Round = 'round',
  Oval = 'oval',
  Square = 'square',
  Gull = 'gull',
  Thick = 'thick',
  Big = 'big',
}

const mapToppingNameToToppingShape: {[key: string]: ToppingShape} = {
  [ToppingName.Pepperoni]: ToppingShape.Round,
  [ToppingName.Mushrooms]: ToppingShape.Gull,
  [ToppingName.Onion]: ToppingShape.Round,
  [ToppingName.Sausage]: ToppingShape.Oval,
  [ToppingName.Bacon]: ToppingShape.Square,
  [ToppingName.ExtraCheese]: ToppingShape.Round,
  [ToppingName.BlackOlives]: ToppingShape.Round,
  [ToppingName.GreenPeppers]: ToppingShape.Gull,
  [ToppingName.Pineapple]: ToppingShape.Square,
  [ToppingName.Spinach]: ToppingShape.Round,
}

interface PizzaToggleProps {
  className?: string;
  toppingShape?: ToppingShape;
  toppingName?: ToppingName;
  toppingColor?: string;
  titleText?: string;
  titleColor?: string;
}

const PizzaToggle: React.FC<PizzaToggleProps> = (
  {
    className = '',
    toppingName = ToppingName.Pepperoni,
    toppingColor = 'red',
    titleText = 'pepperoni',
    titleColor = 'yellow',
  }
) => (
  <div className={[
    'PizzaToggle',
    `PizzaToggle_toppingName_${camelCase(toppingName)}`,
    `PizzaToggle_toppingShape_${mapToppingNameToToppingShape[toppingName]}`,
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
    <input id="checkBox" type="checkbox"/>
    <div className="PizzaToggle__shadow"/>
    <div className="PizzaToggle__pizza">
      <div className="PizzaToggle__inner">
        { new Array(5).fill(0).map(() => (
          <div className="PizzaToggle__topping"/>
        )) }
      </div>
    </div>
  </div>
)

export default PizzaToggle;
