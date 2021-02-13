import React from 'react';
import './index.scss';
import PizzaToggle from '../PizzaToggle';

interface CardToggleProps {
  imgSrc?: string;
  className?: string;
}

const CardToggle: React.FC<CardToggleProps> = (
  {
    imgSrc = '',
    className = '',
  }
) => {
  return <div className="CardToggle">
    <img
      className="CardToggle__img"
      src={imgSrc}
    />
    <PizzaToggle className="CardToggle__PizzaToggle"/>
  </div>
}

export default CardToggle;
