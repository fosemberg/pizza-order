import React from 'react';
import { Context } from '../../App';
import './index.scss'

interface PizzaPreviewProps {
  className?: string;
}

const PizzaPreview: React.FC<PizzaPreviewProps> = (
  {
    className = '',
  }
) => {
  const { order } = React.useContext(Context);

  return (
    <div className={`PizzaPreview ${className}`}>
      <img
        className="PizzaPreview__part"
        src={`./pizza-base.png`}
        alt=""
      />
      <img
        className="PizzaPreview__part"
        src={`./pizza-sauce.png`}
        alt=""
      />
      {order.toppings.map(({onPizza}, i) => (
        <img
          key={onPizza}
          className="PizzaPreview__part"
          src={`./toppings/on-pizza/${onPizza}`}
          alt=""
        />
      ))}
    </div>
  );
};

export default PizzaPreview;
