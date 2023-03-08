import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './WeekView.css';
import { buildWeekPlan } from '../helpers';
import Week from './Week';
import ShopingList from './ShopingList';
import WeekViewButtons from './WeekViewButtons';
import { handleGetAllDishes } from '../../Services';

function WeekView({ hidden }) {
  const [weekPlan, setWeekPlan] = useState([]);
  const [view, setView] = useState(0);

  const handleBuildPlanClick = async () => {
    const {
      data,
    } = await handleGetAllDishes();
    if (!data) return;
    const {
      listDishes: { items },
    } = data;
    const newMenu = buildWeekPlan(items);
    setWeekPlan(newMenu);
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
        {!dishes && (
        <div className="no-week-container">
          <button type="button" onClick={handleBuildPlanClick}>Gime FOOOD!</button>
        </div>
        )}
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
