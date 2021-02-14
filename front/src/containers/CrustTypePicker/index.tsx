import React, { useContext } from 'react';
import { Context, Order } from '../../App';
import { PizzaTogglePizzaShape } from '../../components/PizzaToggle';
import CardToggle from '../../components/CardToggle';

const CrustTypePicker: React.FC = () => {
  const { order, setOrder } = useContext(Context);

  const handleSetOrder = () => {
    setOrder((prev: Order) => ({ ...prev, isThick: !order.isThick }));
  };

  return (
    <CardToggle
      imgSrc="./toggles/thin-thick-middle-pizza-with-arrows.png"
      titleText="&nbsp;THIN / THICK"
      titleColor="black"
      pizzaShape={PizzaTogglePizzaShape.Thick}
      onClick={handleSetOrder}
      checked={order.isThick}
    />
  );
};

export default CrustTypePicker;
