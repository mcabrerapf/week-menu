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
      {view === 'week' && <WeekView />}
      {view === 'dishes' && <DishesView />}
      {view === 'ingredients' && <IngredientsView />}
    </div>
  );
}

export default Main;
