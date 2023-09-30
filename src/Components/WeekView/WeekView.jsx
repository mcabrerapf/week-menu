import './WeekView.css';
import React, { useState, useContext } from 'react';
import { buildMenuDishes } from '../helpers';
import { MENU_BUILDER_STRING } from '../../constants';
import { updateDishes } from './helpers';
import Week from './Week';
import ShopingList from './ShopingList';
import WeekViewButtons from './WeekViewButtons';
import { MainContext } from '../../Contexts/MainContext';
import { ModalContext } from '../../Contexts/ModalContext';
import Button from '../Button';

function WeekView() {
  const {
    dishes: dishesFromContext,
    currentMenu: { menuOptions, menuDishes },
    setContextState,
  } = useContext(MainContext);
  const { addModal } = useContext(ModalContext);
  const [view, setView] = useState(0);

  const handleBuildMenu = () => {
    if (view !== 0) {
      setView(0);
      return;
    }
    const newDishes = buildMenuDishes(dishesFromContext, menuOptions);
    if (!newDishes) return;
    setContextState('currentMenu', { menuOptions, menuDishes: newDishes });
  };

  const handleChangeView = (newView) => {
    setView(newView);
  };

  const updateMenuAndOptions = () => {
    if (view !== 0) setView(0);
  };

  const openBuildMenuModal = () => {
    addModal({
      type: MENU_BUILDER_STRING,
      modalData: menuOptions,
      onClose: updateMenuAndOptions,
    });
  };

  const handleUpdateDish = (updateData) => {
    if (!updateData) return;
    const newDishes = updateDishes(updateData, menuDishes);
    setContextState('currentMenu', { menuOptions, menuDishes: newDishes });
  };

  const hasLoadedMenu = !!menuDishes && !!menuDishes.length;
  const { people } = menuOptions;

  return (
    <>
      <WeekViewButtons
        view={view}
        hasLoadedMenu={hasLoadedMenu}
        showBuildMenuModal={openBuildMenuModal}
        handleChangeView={handleChangeView}
        handleBuildMenu={handleBuildMenu}
      />
      <div
        className="week-view-content"
      >
        {!hasLoadedMenu && (
        <div className="no-week-container">
          <Button onClick={openBuildMenuModal} buttonText="🍽️" />
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
          menuPeople={people}
          hidden={view !== 1}
        />
      </div>
    </>
  );
}

export default WeekView;
