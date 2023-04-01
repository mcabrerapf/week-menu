import React, { useState, useContext } from 'react';
import './WeekView.css';
import { buildMenuDishes, deepCopy } from '../helpers';
import Week from './Week';
import ShopingList from './ShopingList';
import WeekViewButtons from './WeekViewButtons';
import { MainContext } from '../../Contexts/MainContext';
import { ModalContext } from '../../Contexts/ModalContext';
import Button from '../Button';

const minSwipeDistance = 80;

function WeekView() {
  const {
    view: generalView,
    dishes: dishesFromContext,
    currentMenu: { menuOptions, menuDishes },
    setContextState,
  } = useContext(MainContext);
  const { addModal } = useContext(ModalContext);
  const [view, setView] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleBuildMenu = () => {
    const newDishes = buildMenuDishes(dishesFromContext, menuOptions);
    if (!newDishes) return;
    if (view !== 0) setView(0);
    setContextState('currentMenu', { menuOptions, menuDishes: newDishes });
  };

  const handleChangeView = (newView) => {
    setView(newView);
  };

  const onTouchStart = (e) => {
    e.stopPropagation();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    e.stopPropagation();
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e) => {
    e.stopPropagation();
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    if (isLeftSwipe) setContextState('view', 'menu');
  };

  const updateMenuAndOptions = () => {
    if (view !== 0) setView(0);
  };

  const openBuildMenuModal = () => {
    addModal({
      type: 'buildMenu',
      modalData: menuOptions,
      onClose: updateMenuAndOptions,
    });
  };

  const handleUpdateDish = (updateData) => {
    // TODO: fix this shit
    const {
      changeAll, dayIndex, oldDishId, newDish, type,
    } = updateData;

    const oldDishes = deepCopy(menuDishes);
    const newDishes = oldDishes.map((currentDish) => {
      const { id, days, useAs } = currentDish;
      if (id === oldDishId && useAs === type) {
        if (changeAll) newDish.days = days.map((day) => day);
        const updatedDays = changeAll ? [] : days.filter((day) => day !== dayIndex);
        return { ...currentDish, days: updatedDays };
      }

      return currentDish;
    }).filter(({ days }) => !!days.length);
    newDishes.push({ ...newDish });

    setContextState('currentMenu', { menuOptions, menuDishes: newDishes });
  };

  const isHidden = generalView !== 'buildMenu';
  const className = isHidden ? 'week-view no-show' : 'week-view';

  return (
    <div className={className}>
      <WeekViewButtons
        view={view}
        showBuildMenuModal={openBuildMenuModal}
        handleChangeView={handleChangeView}
        handleBuildMenu={handleBuildMenu}
      />
      <div
        className="week-view-content"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {!menuDishes.length && (
        <div className="no-week-container">
          <Button onClick={openBuildMenuModal} buttonText="Gime FOOD!" />
        </div>
        )}
        <Week
          menu={menuDishes}
          options={menuOptions}
          hidden={view !== 0}
          handleUpdateDish={handleUpdateDish}
        />
        <ShopingList
          menuDishes={menuDishes}
          menuPeople={menuOptions.people}
          hidden={view !== 1}
        />
      </div>
    </div>
  );
}

export default WeekView;
