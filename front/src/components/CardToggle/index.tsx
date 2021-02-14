import React from 'react';
import './index.scss';
import PizzaToggle, { PizzaTogglePizzaShape, PizzaToggleToppingShape } from '../PizzaToggle';
import { ToppingName } from '../../App';

interface CardToggleProps {
  className?: string;
  onClick?: (e: any) => void;
  checked?: boolean;
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
    onClick = () => void(0),
    checked,
    imgSrc = '',
    titleText,
    titleColor,
    toppingName,
    toppingShape,
    pizzaShape,
  }
) => {
  return <div
    className={`CardToggle ${className}`}
    onClick={onClick}
  >
    <img
      className="CardToggle__img"
      alt={titleText}
      src={imgSrc}
    />
    <PizzaToggle
      className="CardToggle__PizzaToggle"
      checked={checked}
      titleText={titleText}
      titleColor={titleColor}
      toppingName={toppingName}
      toppingShape={toppingShape}
      pizzaShape={pizzaShape}
    />
  </div>
}

export default CardToggle;
