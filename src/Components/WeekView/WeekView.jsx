import React, { useState } from 'react';
import './WeekView.css';
import Button from '../Button';
import { DISHES } from '../constants';
import { buildWeekPlan } from '../helpers';
import Week from './Week';
import ShopingListNote from './ShopingList/ShopingListNote';

function WeekView() {
  const [weekPlan, setWeekPlan] = useState([]);

  const buildWeek = () => {
    const newPlan = buildWeekPlan(DISHES);
    setWeekPlan(newPlan);
  };
  const [dishes, ingredients] = weekPlan;

  return (
    <div className="week-view">
      <div className="week-buttons"><Button handleOnClick={buildWeek} /></div>
      {!!dishes && <Week weekPlan={dishes} />}
      {!!ingredients && <ShopingListNote ingredients={ingredients} />}
    </div>
  );
}

export default WeekView;
