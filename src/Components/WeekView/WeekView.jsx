import React, { useState } from 'react';
import './WeekView.css';
import { buildWeekPlan } from '../helpers';
import Week from './Week';
import ShopingList from './ShopingList';
import WeekViewButtons from './WeekViewButtons';
import { serviceHandler } from '../../Services';
import { GET_ALL_STRING, DISH_STRING, INGREDIENT_STRING } from '../../constants';
import { useMainContext, MainContext } from '../../Context';
import Button from '../Button';

function WeekView() {
  const { view: generalView, offlineMode } = useMainContext(MainContext);
  const [weekPlan, setWeekPlan] = useState([]);
  const [view, setView] = useState(0);
  const isHidden = generalView !== 'menu';

  const handleBuildPlanClick = async () => {
    const allDishes = await serviceHandler(GET_ALL_STRING, offlineMode)(DISH_STRING);
    const allIngredients = await serviceHandler(GET_ALL_STRING, offlineMode)(INGREDIENT_STRING);
    if (!allDishes) return;
    const newMenu = buildWeekPlan(allDishes, allIngredients);
    setWeekPlan(newMenu);
  };

  const handleChangeView = (newView) => {
    setView(newView);
  };

  const [dishes, ingredienSections] = weekPlan;

  return (
    <div className="week-view" style={{ display: isHidden ? 'none' : 'flex' }}>
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
          <Button onClick={handleBuildPlanClick} buttonText="Gime FOOD!" />
        </div>
        )}
        <Week weekPlan={dishes} hidden={view !== 0} />
        <ShopingList hidden={view !== 1} ingredients={ingredienSections} />
      </div>
    </div>
  );
}

export default WeekView;
