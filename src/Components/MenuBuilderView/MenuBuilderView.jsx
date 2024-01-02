import './MenuBuilderView.css';
import React, { useState, useContext } from 'react';
import { buildMenuDishes } from '../helpers';
import { MENU_BUILDER_STRING } from '../../constants';
import { updateDishes } from './helpers';
import Week from './Week';
import ShopingList from './ShopingList';
import MenuBuilderHeader from './MenuBuilderHeader';
import { MainContext } from '../../Contexts/MainContext';
import { ModalContext } from '../../Contexts/ModalContext';
import Button from '../Button';
import Icon from '../Icon';

function MenuBuilderView() {
  const {
    dishes: dishesFromContext,
    currentMenu: { menuOptions, menuDishes },
    setContextState,
  } = useContext(MainContext);
  const { addModal } = useContext(ModalContext);
  const [view, setView] = useState(0);

  const handleBuildMenu = () => {
    const newDishes = buildMenuDishes(dishesFromContext, menuOptions);
    if (!newDishes) return;
    setContextState('currentMenu', { menuOptions, menuDishes: newDishes });
    if (view !== 0) setView(0);
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
      modifier: 'full',
      hideHeader: true,
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
      <MenuBuilderHeader
        view={view}
        hasLoadedMenu={hasLoadedMenu}
        showBuildMenuModal={openBuildMenuModal}
        handleChangeView={handleChangeView}
        handleBuildMenu={handleBuildMenu}
        menu={menuDishes}
      />
      <div
        className="menu-builder-content row pad-5 centered"
      >
        {!hasLoadedMenu && (
          <Button onClick={openBuildMenuModal} modifier="l icon shadow">
            <Icon iconName="brain" />
          </Button>
        )}
        {view === 0 && (
        <Week
          menu={menuDishes}
          options={menuOptions}
          handleUpdateDish={handleUpdateDish}
        />
        )}
        {view === 1 && (
        <ShopingList
          menuDishes={menuDishes}
          menuPeople={people}
        />
        )}
      </div>
    </>
  );
}

export default MenuBuilderView;
