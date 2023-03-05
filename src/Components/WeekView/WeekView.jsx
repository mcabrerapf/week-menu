import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './WeekView.css';
import Button from '../Button';
import { DISHES } from '../constants';
import { buildWeekPlan } from '../helpers';
import Week from './Week';
import ShopingList from './ShopingList';

function WeekView({ hidden }) {
  const [weekPlan, setWeekPlan] = useState([]);

  const buildWeek = () => {
    const newPlan = buildWeekPlan(DISHES);
    setWeekPlan(newPlan);
  };
  const [dishes, ingredients] = weekPlan;

  return (
    <div className="week-view" hidden={hidden}>
      <div className="week-buttons"><Button handleOnClick={buildWeek} /></div>
      <Week weekPlan={dishes} />
      <ShopingList ingredients={ingredients} />
    </div>
  );
}

WeekView.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default WeekView;
