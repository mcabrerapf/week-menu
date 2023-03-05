import React from 'react';
import './Main.css';
import WeekView from '../WeekView';
import DishesView from '../DishesView';
import { useMainContext, MainContext } from '../../Context';
import IngredientsView from '../IngredientsView';

function Main() {
  const { view } = useMainContext(MainContext);

  return (
    <div className="main">
      <WeekView hidden={view !== 0} />
      <DishesView hidden={view !== 1} />
      <IngredientsView hidden={view !== 2} />
    </div>
  );
}

export default Main;
