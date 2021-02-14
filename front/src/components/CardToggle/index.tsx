import React from 'react';
import './index.scss';
import PizzaToggle, { PizzaTogglePizzaShape, PizzaToggleToppingShape } from '../PizzaToggle';
import { ToppingName } from '../../App';

interface CardToggleProps {
  className?: string;
  imgSrc?: string;
  titleText?: string;
  titleColor?: string;
  toppingName?: ToppingName;
  toppingShape?: PizzaToggleToppingShape;
  pizzaShape?: PizzaTogglePizzaShape;
}

const CardToggle: React.FC<CardToggleProps> = (
  {
    className = '',
    imgSrc = '',
    titleText,
    titleColor,
    toppingName,
    toppingShape,
    pizzaShape,
  }
) => {
  return <div className={`CardToggle ${className}`}>
    <img
      className="CardToggle__img"
      alt={titleText}
      src={imgSrc}
    />
    <PizzaToggle
      className="CardToggle__PizzaToggle"
      titleText={titleText}
      titleColor={titleColor}
      toppingName={toppingName}
      toppingShape={toppingShape}
      pizzaShape={pizzaShape}
    />
  </div>
}

export default CardToggle;
