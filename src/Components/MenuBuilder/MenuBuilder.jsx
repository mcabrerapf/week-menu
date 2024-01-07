import './MenuBuilder.css';
import React, { useState, useContext } from 'react';
import { MENU_BUILDER_STRING } from '../../constants/STRINGS';
import { buildMenu, deepCopy } from '../helpers';
import { MainContext } from '../../Contexts';
import Button from '../Button';
import Icon from '../Icon';
import Week from './Week';
import ShopingList from './ShopingList';
import MenuBuilderHeader from './MenuBuilderHeader';
import Modal from '../Modal';

function MenuBuilder() {
  const {
    dishes: dishesFromContext,
    menuOptions,
    currentMenu,
    updateCurrentMenu,
    handleSave,
  } = useContext(MainContext);
  const [view, setView] = useState(0);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const { weeks } = currentMenu;

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

  const openModal = () => {
    setModalData({
      type: MENU_BUILDER_STRING,
      menuOptions,
      modifier: 'f',
      hideHeader: true,
    });
    setShowModal(true);
  };

  const closeModal = (closeEvent) => {
    if (closeEvent) {
      updateCurrentMenu(closeEvent.menu, closeEvent.options);
      setView(0);
      setSelectedWeekIndex(0);
    }
    setModalData(null);
    setShowModal(false);
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
        currentMenu={currentMenu}
        openMenuBuilderModal={openModal}
        handleChangeView={handleChangeView}
        handleBuildMenu={handleBuildMenu}
        handleSave={handleSave}
      />
      <div
        className="menu-builder-content m-5"
      >
        {!hasLoadedMenu && (
          <div className="col w-f h-f centered">
            <Button onClick={openModal} modifier="l icon shadow">
              <Icon iconName="brain" />
            </Button>
          </div>

        )}
        {showWeekButtons === 'show thisss' && (
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
          currentMenu={currentMenu}
          dishes={dishesFromContext}
        />
        )}
        {view === 1 && (
        <ShopingList
          week={selectedWeek}
        />
        )}
      </div>
      {showModal && <Modal modalData={modalData} closeModal={closeModal} />}
    </>
  );
}

export default MenuBuilder;
