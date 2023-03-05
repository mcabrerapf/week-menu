import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './WeekView.css';
import { DISHES } from '../constants';
import { buildWeekPlan } from '../helpers';
import Week from './Week';
import ShopingList from './ShopingList';
import WeekViewButtons from './WeekViewButtons';

function WeekView({ hidden }) {
  const [weekPlan, setWeekPlan] = useState([]);
  const [view, setView] = useState(0);

  const handleBuildPlanClick = () => {
    const newPlan = buildWeekPlan(DISHES);
    setWeekPlan(newPlan);
  };

  const handleChangeView = (newView) => {
    setView(newView);
  };

  const [dishes, ingredients] = weekPlan;

  return (
    <div className="week-view" style={{ display: hidden ? 'none' : 'flex' }}>
      <div className="week-view-header">
        <WeekViewButtons
          view={view}
          handleBuildPlanClick={handleBuildPlanClick}
          handleChangeView={handleChangeView}
        />
      </div>
      <div className="week-view-content">
        <Week weekPlan={dishes} hidden={view !== 0} />
        <ShopingList hidden={view !== 1} ingredients={ingredients} />
      </div>
    </div>
  );
}

WeekView.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default WeekView;
