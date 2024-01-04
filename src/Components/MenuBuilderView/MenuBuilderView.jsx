import './MenuBuilderView.css';
import React, { useState, useContext } from 'react';
import { buildMenuWeeks } from '../helpers';
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
    currentMenu: { menuOptions, weeks },
    setContextState,
  } = useContext(MainContext);
  const { addModal } = useContext(ModalContext);
  const [view, setView] = useState(0);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const hasLoadedMenu = !!weeks && !!weeks.length;
  const selectedWeek = weeks[selectedWeekIndex] || {};
  const showWeekButtons = hasLoadedMenu && weeks.length > 1;

  const handleBuildMenu = () => {
    const newWeeks = buildMenuWeeks(dishesFromContext, menuOptions);
    if (!newWeeks.length) return;
    setContextState('currentMenu', { menuOptions, weeks: newWeeks });
    setView(0);
    setSelectedWeekIndex(0);
  };

  const handleChangeView = (newView) => {
    setView(newView);
  };

  const openBuildMenuModal = () => {
    addModal({
      type: MENU_BUILDER_STRING,
      modalData: menuOptions,
      onClose: () => {
        setView(0);
        setSelectedWeekIndex(0);
      },
      modifier: 'full',
      hideHeader: true,
    });
  };

  const handleUpdateDish = (updateData) => {
    if (!updateData) return;
    const newDishes = updateDishes(updateData, selectedWeek.dishes);
    const newWeeks = [...weeks];
    newWeeks[selectedWeekIndex] = { ...newWeeks[selectedWeekIndex], dishes: newDishes };
    setContextState('currentMenu', { menuOptions, weeks: newWeeks });
  };

  const handleWeekChange = (increase) => {
    if (increase && weeks[selectedWeekIndex + 1]) setSelectedWeekIndex(selectedWeekIndex + 1);
    if (!increase && selectedWeekIndex !== 0) setSelectedWeekIndex(selectedWeekIndex - 1);
  };

  return (
    <>
      <MenuBuilderHeader
        view={view}
        hasLoadedMenu={hasLoadedMenu}
        showBuildMenuModal={openBuildMenuModal}
        handleChangeView={handleChangeView}
        handleBuildMenu={handleBuildMenu}
      />
      <div
        className="menu-builder-content col"
      >
        {!hasLoadedMenu && (
          <div className="col w-f h-f centered">
            <Button onClick={openBuildMenuModal} modifier="l icon shadow">
              <Icon iconName="brain" />
            </Button>
          </div>

        )}
        {showWeekButtons && (
          <>
            <Button modifier="week-number icon m shadow circle">
              {selectedWeekIndex + 1}
            </Button>
            <Button
              modifier="week-prev-button icon m shadow"
              disabled={selectedWeekIndex === 0}
              onClick={() => handleWeekChange()}
            >
              <Icon iconName="arrow-l" />
            </Button>
            <Button
              modifier="week-next-button icon m shadow"
              disabled={selectedWeekIndex >= weeks.length - 1}
              onClick={() => handleWeekChange(true)}
            >
              <Icon iconName="arrow-r" />
            </Button>
          </>
        )}
        {view === 0 && (
        <Week
          menu={selectedWeek.dishes}
          options={menuOptions}
          handleUpdateDish={handleUpdateDish}
        />
        )}
        {view === 1 && (
        <ShopingList
          menuDishes={selectedWeek.dishes}
          menuPeople={selectedWeek.people}
        />
        )}
      </div>
    </>
  );
}

export default MenuBuilderView;
