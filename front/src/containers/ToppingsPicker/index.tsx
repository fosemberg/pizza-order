import React from 'react';
import * as _ from 'lodash';

import { Context } from '../../data';
import CardToggle from '../../components/CardToggle';
import { formatToppingText } from '../../utils';

import './index.scss'
import { Order, ToppingData } from '../../types/apiTypes';
import { Alert, Spinner } from 'react-bootstrap';

const ToppingsPicker: React.FC = () => {
  const {
    orderSizeInfo,
    toppings,
    order,
    setOrder,
    setModalContent,
    setIsFormValid,
    setIsModalShow,
  } = React.useContext(Context);

  const toggleSelect = (order: Order, topping: ToppingData) => () => {
    const exists = _.find(order.toppings, { name: topping.name });
    const newToppings = exists
      ? order.toppings.filter((t) => t.name !== topping.name)
      : [...order.toppings, topping];

    const { maximumToppings } = orderSizeInfo.data[order.size]

    if (
      newToppings.length > maximumToppings &&
      newToppings.length > order.toppings.length
    ) {
      setModalContent({
        header: 'Toppings Limit',
        body: `The maximum of toppings for the ${order.size} size is ${maximumToppings}.`,
      });
      setIsModalShow(true);
    } else {
      if (newToppings.length <= maximumToppings) {
        setModalContent({
          header: '',
          body: '',
        });
        setIsFormValid(true)
      }
      setOrder((prev: Order) => {
        return { ...prev, toppings: newToppings };
      });
    }
  };

  return (
    <div className="ToppingsPicker">
      <div className="ToppingsPicker__list">
        { toppings.isLoading || orderSizeInfo.isLoading
          ? <Spinner animation="border" variant="warning" />
          : toppings.error || orderSizeInfo.error
            ? <Alert variant="danger">{toppings.error}</Alert>
            : toppings.data.map((topping) => (
              <CardToggle
                key={topping.name}
                onClick={toggleSelect(order, topping)}
                checked={!!_.find(order.toppings, {
                  name: topping.name
                })}
                imgSrc={`${process.env.PUBLIC_URL}/toggles/${topping.onPizza}`}
                titleText={formatToppingText(topping.name)}
                titleColor={topping.titleColor}
                toppingName={topping.name}
              />
            ))
        }
      </div>
    </div>
  );
};

export default ToppingsPicker;
