import React, { useState, useEffect } from 'react';
import './WeekView.css';
import { buildIngredientSections, buildMenu, deepCopy } from '../helpers';
import Week from './Week';
import ShopingList from './ShopingList';
import WeekViewButtons from './WeekViewButtons';
import { useMainContext, MainContext } from '../../Context';
import Button from '../Button';
import { defaultMenuOptions } from './Week/constants';
import MenuModal from './MenuModal';

function WeekView() {
  const { view: generalView, dishes: dishesFromContext } = useMainContext(MainContext);
  const [weekPlan, setWeekPlan] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [menuOptions, setMenuOptions] = useState(null);
  const [view, setView] = useState(0);

  useEffect(() => {
    const copiedOptions = deepCopy(defaultMenuOptions);
    setMenuOptions(copiedOptions);
  }, []);

  const handleBuildMenu = () => {
    const newMenu = buildMenu(dishesFromContext, menuOptions);
    if (!newMenu) return;
    if (view !== 0) setView(0);
    setWeekPlan(newMenu);
  };

  const getDataForModal = () => {
    setShowModal(true);
  };

  const handleChangeView = (newView) => {
    setView(newView);
  };

  const updateMenuAndOptions = (newMenu, newOptions) => {
    setShowModal(false);
    setMenuOptions(newOptions);
    setWeekPlan(newMenu);
    if (view !== 0) setView(0);
  };

  const handleUpdateDish = (updateData) => {
    const {
      changeAll, dayIndex, oldDishId, newDish,
    } = updateData;
    const oldDishes = deepCopy(weekPlan[0]);
    const newDishes = oldDishes.map((currentDish) => {
      const { id, days } = currentDish;
      if (id === oldDishId) {
        if (changeAll) newDish.days = days;
        const updatedDays = changeAll ? [] : days.filter((day) => day !== dayIndex);
        return { ...currentDish, days: updatedDays };
      }

      return currentDish;
    }).filter(({ days }) => !!days.length);
    newDishes.push({ ...newDish });
    const newIngredientSections = buildIngredientSections(newDishes, menuOptions.people);
    setWeekPlan([newDishes, newIngredientSections]);
  };

  const isHidden = generalView !== 'menu';
  const className = isHidden ? 'week-view no-show' : 'week-view';

  return (
    <div className={className}>
      <WeekViewButtons
        view={view}
        showBuildMenuModal={getDataForModal}
        handleChangeView={handleChangeView}
        handleBuildMenu={handleBuildMenu}
      />
      <div className="week-view-content">
        {!weekPlan[0] && (
        <div className="no-week-container">
          <Button onClick={getDataForModal} buttonText="Gime FOOD!" />
        </div>
        )}
        <Week
          menu={weekPlan[0]}
          options={menuOptions}
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
        setShowModal={setShowModal}
        dishes={dishesFromContext}
      />
      )}
    </div>
  );
}

export default WeekView;
