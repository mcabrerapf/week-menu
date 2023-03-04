import React, { useState } from 'react';
import './WeekView.css';
import Button from '../Button';
import { DISHES } from '../constants';
import { buildWeekPlan, getIngredientsList } from '../helpers';
import ShopingList from '../ShopingList';
import Week from '../Week';

function WeekView() {
  const [weekPlan, setWeekPlan] = useState([]);

  const buildWeek = () => {
    const newPlan = buildWeekPlan(DISHES);
    setWeekPlan(newPlan);
  };
  const ingredientsList = getIngredientsList(weekPlan);

  return (
    <div>
      <div className="week-buttons"><Button handleOnClick={buildWeek} /></div>
      {!!weekPlan.length && <Week weekPlan={weekPlan} />}
      {!!ingredientsList.length && <ShopingList ingredients={ingredientsList} />}
    </div>
  );
}

export default WeekView;
