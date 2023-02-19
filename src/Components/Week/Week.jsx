import React, { useState } from 'react';
import './Week.css';
import Day from '../Day';
import Button from '../Button';
import ShopingList from '../ShopingList';
import { DISHES } from '../constants';
import { buildWeekPlan } from '../helpers';

const getIngredientsList = (plan = []) => {
  const ingredientsList = [];
  if (!plan) return ingredientsList;
  plan.forEach(({ meals }) => {
    meals.forEach(({ ingredients }) => ingredients.forEach((ingredient) => ingredientsList.push(ingredient)));
  });
  return ingredientsList;
};
function Week() {
  const [weekPlan, setWeekPlan] = useState(null);

  const buildWeek = () => {
    const newPlan = buildWeekPlan(DISHES);
    setWeekPlan(newPlan);
  };

  const ingredientsList = getIngredientsList(weekPlan);

  return (
    <div className="week">
      {weekPlan && <div className="days">{weekPlan.map((plan) => <Day key={plan.label} plan={plan} />)}</div>}
      <ShopingList ingredients={ingredientsList} />
      <Button handleOnClick={buildWeek} />
    </div>
  );
}

export default Week;
