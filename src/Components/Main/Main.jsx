import React, { useState } from 'react';
import './Main.css';
import Week from '../Week';
import Button from '../Button';
import ShopingList from '../ShopingList';
import { DISHES } from '../constants';
import { buildWeekPlan, getIngredientsList } from '../helpers';

function Main() {
  const [weekPlan, setWeekPlan] = useState(null);

  const buildWeek = () => {
    const newPlan = buildWeekPlan(DISHES);
    setWeekPlan(newPlan);
  };
  const ingredientsList = getIngredientsList(weekPlan);

  return (
    <div className="main">
      <div className="main-buttons"><Button handleOnClick={buildWeek} /></div>
      {weekPlan && <Week weekPlan={weekPlan} />}
      {ingredientsList.length && <ShopingList ingredients={ingredientsList} />}
    </div>
  );
}

export default Main;
