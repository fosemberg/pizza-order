import React from 'react';
import './index.scss';

interface PizzaToggleProps {
  className?: string;
}

const PizzaToggle: React.FC<PizzaToggleProps> = (
  {
    className = '',
  }
) => {
  return <div className={`PizzaToggle ${className}`}>
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
