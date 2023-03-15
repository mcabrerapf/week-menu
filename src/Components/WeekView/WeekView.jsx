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
import { defaultMenuOptions } from './Week/constants';
import MenuModal from './MenuModal';

function WeekView() {
  const { view: generalView } = useMainContext(MainContext);
  const [weekPlan, setWeekPlan] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dishesWithData, setDishesWithData] = useState([]);
  const [menuOptions, setMenuOptions] = useState(defaultMenuOptions);
  const [view, setView] = useState(0);

  const handleBuildMenu = async () => {
    const allDishes = await serviceHandler(GET_ALL_STRING)(DISH_STRING);
    const allIngredients = await serviceHandler(GET_ALL_STRING)(INGREDIENT_STRING);
    if (!allDishes) return;
    const dishesWithIngredients = buildDishesWithIngredients(allDishes, allIngredients);
    const newMenu = buildMenu(dishesWithIngredients, defaultMenuOptions);
    if (!newMenu) return;
    if (view !== 0)setView(0);
    setWeekPlan(newMenu);
  };

  const getDataForModal = async () => {
    const allDishes = await serviceHandler(GET_ALL_STRING)(DISH_STRING);
    const allIngredients = await serviceHandler(GET_ALL_STRING)(INGREDIENT_STRING);
    if (!allDishes) return;
    const dishesWithIngredients = buildDishesWithIngredients(allDishes, allIngredients);
    setDishesWithData(dishesWithIngredients);
    setShowModal(true);
  };

  const handleChangeView = (newView) => {
    setView(newView);
  };

  const updateMenuAndOptions = (newMenu, newOptions) => {
    setShowModal(false);
    setMenuOptions(newOptions);
    setWeekPlan(newMenu);
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
          handleBuildMenu={getDataForModal}
          handleChangeView={handleChangeView}
        />
      </div>
      <div className="week-view-content">
        {!weekPlan[0] && (
        <div className="no-week-container">
          <Button onClick={getDataForModal} buttonText="Gime FOOD!" />
        </div>
        )}
        <Week
          menu={weekPlan[0]}
          options={defaultMenuOptions}
          hidden={view !== 0}
          handleUpdateDish={handleUpdateDish}
        />
        <ShopingList
          ingredienSections={weekPlan[1]}
          hidden={view !== 1}
        />
      </div>
      {showModal && (
      <MenuModal
        modalData={menuOptions}
        aaa={handleBuildMenu}
        handleBuildMenu={updateMenuAndOptions}
        toggleModal={setShowModal}
        dishes={dishesWithData}
      />
      )}
    </div>
  );
}

export default WeekView;
