import React, { useState } from 'react';
import './WeekView.css';
import { buildDishesWithIngredients, buildMenu } from '../helpers';
import Week from './Week';
import ShopingList from './ShopingList';
import WeekViewButtons from './WeekViewButtons';
import { serviceHandler } from '../../Services';
import { GET_ALL_STRING, DISH_STRING, INGREDIENT_STRING } from '../../constants';
import { useMainContext, MainContext } from '../../Context';
import Button from '../Button';
import { defaultOptions } from './Week/constants';

function WeekView() {
  const { view: generalView, offlineMode } = useMainContext(MainContext);
  const [weekPlan, setWeekPlan] = useState([]);
  const [view, setView] = useState(0);
  const isHidden = generalView !== 'menu';

  const handleBuildMenu = async () => {
    const allDishes = await serviceHandler(GET_ALL_STRING, offlineMode)(DISH_STRING);
    const allIngredients = await serviceHandler(GET_ALL_STRING, offlineMode)(INGREDIENT_STRING);
    if (!allDishes) return;
    const dishesWithIngredients = buildDishesWithIngredients(allDishes, allIngredients);
    const newMenu = buildMenu(dishesWithIngredients, defaultOptions);
    if (!newMenu) return;
    setWeekPlan(newMenu);
  };

  const handleChangeView = (newView) => {
    setView(newView);
  };

  const [menu, ingredienSections] = weekPlan;

  return (
    <div className="week-view" style={{ display: isHidden ? 'none' : 'flex' }}>
      <div className="week-view-header">
        <WeekViewButtons
          view={view}
          handleBuildMenu={handleBuildMenu}
          handleChangeView={handleChangeView}
        />
      </div>
      <div className="week-view-content">
        {!menu && (
        <div className="no-week-container">
          <Button onClick={handleBuildMenu} buttonText="Gime FOOD!" />
        </div>
        )}
        <Week menu={menu} hidden={view !== 0} />
        <ShopingList hidden={view !== 1} ingredienSections={ingredienSections} />
      </div>
    </div>
  );
}

export default WeekView;
