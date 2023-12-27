import './MenuBuilderView.css';
import React, { useState, useContext } from 'react';
import { buildMenuDishes } from '../helpers';
import { MENU_BUILDER_STRING } from '../../constants';
import { updateDishes } from './helpers';
import Week from './Week';
import ShopingList from './ShopingList';
import MenuBuilderViewButtons from './MenuBuilderViewButtons';
import { MainContext } from '../../Contexts/MainContext';
import { ModalContext } from '../../Contexts/ModalContext';
import Button from '../Button';
import { BrainIcon } from '../Icons';

function MenuBuilderView() {
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
      <MenuBuilderViewButtons
        view={view}
        hasLoadedMenu={hasLoadedMenu}
        showBuildMenuModal={openBuildMenuModal}
        handleChangeView={handleChangeView}
        handleBuildMenu={handleBuildMenu}
        menu={menuDishes}
      />
      <div
        className="week-view-content"
      >
        {!hasLoadedMenu && (
          <Button onClick={openBuildMenuModal} modifier="l icon-only build-menu-button">
            <BrainIcon />
          </Button>
        )}
        {view === 0 && (
        <Week
          menu={menuDishes}
          options={menuOptions}
          handleUpdateDish={handleUpdateDish}
        />
        )}
        { view === 1 && (
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
