import React from 'react';
import './index.scss';

interface PizzaToggleProps {
  className?: string;
  pizzaToggleType?: PizzaToggleType;
}

enum PizzaToggleType {
  Round = 'round',
  Oval = 'oval',
  Square = 'square',
  Gull = 'gull',
  Thick = 'thick',
  Big = 'big',
}

const PizzaToggle: React.FC<PizzaToggleProps> = (
  {
    className = '',
    pizzaToggleType = PizzaToggleType.Round,
  }
) => {
  return <div className={`PizzaToggle PizzaToggle_type_${pizzaToggleType} ${className}`}>
    <div className="PizzaToggle__title">some text</div>
    <input id="checkBox" type="checkbox"/>
        <div className="PizzaToggle__shadow"/>
        <div className="PizzaToggle__pizza">
          <div className="PizzaToggle__inner">
            <div className="PizzaToggle__toppings"></div>
            <div className="PizzaToggle__toppings"></div>
            <div className="PizzaToggle__toppings"></div>
            <div className="PizzaToggle__toppings"></div>
            <div className="PizzaToggle__toppings"></div>
          </div>
        </div>
  </div>
}

export default PizzaToggle;
