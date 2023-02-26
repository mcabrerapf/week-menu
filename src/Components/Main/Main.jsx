import React, { useState } from 'react';
import './Main.css';
import Week from '../Week';
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
      <Week weekPlan={weekPlan} />
      <ShopingList ingredients={ingredientsList} />
    </div>
  );
}

export default Main;
