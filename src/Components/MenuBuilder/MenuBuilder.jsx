import './MenuBuilder.css';
import React, { useState, useContext } from 'react';
import { MENU_BUILDER_STRING } from '../../constants/STRINGS';
import { buildMenu, deepCopy } from '../helpers';
import { MainContext, ModalContext } from '../../Contexts';
import Button from '../Button';
import Icon from '../Icon';
import Week from './Week';
import ShopingList from './ShopingList';
import MenuBuilderHeader from './MenuBuilderHeader';

function MenuBuilder() {
  const {
    dishes: dishesFromContext,
    menuOptions,
    currentMenu: { weeks },
    currentMenu,
    updateCurrentMenu,
  } = useContext(MainContext);
  const { addModal } = useContext(ModalContext);
  const [view, setView] = useState(0);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

  const handleBuildMenu = () => {
    const newWeeks = buildMenu(dishesFromContext, menuOptions);
    if (!newWeeks.length) return;
    updateCurrentMenu({ ...currentMenu, weeks: newWeeks });
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
      onClose: (updatedMenu, updatedOptions) => {
        updateCurrentMenu(updatedMenu, updatedOptions);
        setView(0);
        setSelectedWeekIndex(0);
      },
      modifier: 'full',
      hideHeader: true,
    });
  };

  const handleUpdateWeek = (updateData) => {
    if (!updateData) return;
    const updatedWeeks = deepCopy(weeks);
    updatedWeeks[selectedWeekIndex] = updateData;
    updateCurrentMenu({ ...currentMenu, weeks: updatedWeeks });
  };

  const handleWeekChange = (increase) => {
    if (increase && weeks[selectedWeekIndex + 1]) setSelectedWeekIndex(selectedWeekIndex + 1);
    if (!increase && selectedWeekIndex !== 0) setSelectedWeekIndex(selectedWeekIndex - 1);
  };

  const hasLoadedMenu = !!weeks && !!weeks.length;
  const showWeekButtons = hasLoadedMenu && weeks.length > 1;
  const selectedWeek = hasLoadedMenu ? weeks[selectedWeekIndex] : {};

  return (
    <>
      <MenuBuilderHeader
        view={view}
        hasLoadedMenu={hasLoadedMenu}
        openBuildMenuModal={openBuildMenuModal}
        handleChangeView={handleChangeView}
        handleBuildMenu={handleBuildMenu}
      />
      <div
        className="menu-builder-content col pad-v-5 pad-h-15"
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
          week={selectedWeek}
          selectedWeekIndex={selectedWeekIndex}
          handleUpdateWeek={handleUpdateWeek}
        />
        )}
        {view === 1 && (
        <ShopingList
          week={selectedWeek}
        />
        )}
      </div>
    </>
  );
}

export default MenuBuilder;
