import React from 'react';
import './index.scss';
import PizzaToggle from '../PizzaToggle';
import { ToppingName } from '../../App';

interface CardToggleProps {
  className?: string;
  imgSrc?: string;
  titleText?: string;
  titleColor?: string;
  toppingName?: ToppingName;
}

const CardToggle: React.FC<CardToggleProps> = (
  {
    className = '',
    imgSrc = '',
    titleText = '',
    titleColor = '',
    toppingName= ToppingName.Pepperoni,
  }
) => {
  return <div className="CardToggle">
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
    />
  </div>
}

export default CardToggle;
