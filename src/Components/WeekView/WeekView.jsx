import React, { useState } from 'react';
import './WeekView.css';
import { buildDishesWithIngredients, buildIngredientSections, buildMenu } from '../helpers';
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

  const handleUpdateDish = async (updateData) => {
    const {
      changeAll, dayIndex, oldDishId, newDish, type,
    } = updateData;
    const [menu] = weekPlan;
    const allDays = [];
    const newDishes = menu.map((currentDish) => {
      const { id, useAs, days } = currentDish;
      if (id === oldDishId && type === useAs) {
        if (changeAll) {
          days.forEach((day) => allDays.push(day));
          return null;
        }
        const updatedDays = currentDish.days.filter((day) => day !== dayIndex);
        return { ...currentDish, days: updatedDays };
      }

      return currentDish;
    }).filter(Boolean);
    newDishes.push({ ...newDish, days: changeAll ? allDays : [dayIndex] });
    const newIngredientSections = buildIngredientSections(newDishes);
    setWeekPlan([newDishes, newIngredientSections]);
  };

  const isHidden = generalView !== 'menu';
  const className = isHidden ? 'week-view no-show' : 'week-view';

  return (
    <div className={className}>
      <div className="week-view-header">
        <WeekViewButtons
          view={view}
          handleBuildMenu={handleBuildMenu}
          handleChangeView={handleChangeView}
        />
      </div>
      <div className="week-view-content">
        {!weekPlan[0] && (
        <div className="no-week-container">
          <Button onClick={handleBuildMenu} buttonText="Gime FOOD!" />
        </div>
        )}
        <Week
          menu={weekPlan[0]}
          options={defaultOptions}
          hidden={view !== 0}
          handleUpdateDish={handleUpdateDish}
        />
        <ShopingList
          ingredienSections={weekPlan[1]}
          hidden={view !== 1}
        />
      </div>
    </div>
  );
}

export default WeekView;
