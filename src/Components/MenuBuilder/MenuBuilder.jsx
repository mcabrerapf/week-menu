import './MenuBuilder.css';
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { MENU_BUILDER_STRING, WEEK_STRING } from '../../constants/STRINGS';
import { buildMenu, deepCopy } from '../helpers';
import { MainContext } from '../../Contexts';
import Button from '../Button';
import Icon from '../Icon';
import Week from './Week';
import ShopingList from './ShopingList';
import MenuBuilderHeader from './MenuBuilderHeader';
import Modal from '../Modal';

function MenuBuilder({ show }) {
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
  const [showWeekModal, setShowWeekModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const { weeks = [] } = currentMenu || {};

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

  const hasLoadedMenu = !!weeks && !!weeks.length;
  const selectedWeek = hasLoadedMenu ? weeks[selectedWeekIndex] : {};
  const className = `menu-builder col w-f h-f${show ? '' : ' hidden'}`;

  return (
    <div className={className}>
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
        className="menu-builder-content col w-a m-5"
      >
        {!hasLoadedMenu && (
          <div className="col w-f h-f centered">
            <Button onClick={openModal} modifier="xl icon-l shadow">
              <Icon iconName="brain" />
            </Button>
          </div>
        )}
        {hasLoadedMenu && (
        <Button modifier="week-number fixed icon-xl xl shadow circle" onClick={() => setShowWeekModal(true)}>
          {selectedWeekIndex + 1}
        </Button>
        )}
        <Week
          week={selectedWeek}
          selectedWeekIndex={selectedWeekIndex}
          handleUpdateWeek={handleUpdateWeek}
          currentMenu={currentMenu}
          dishes={dishesFromContext}
          show={view === 0}
        />
        <ShopingList
          weeks={weeks}
          selectedWeekIndex={selectedWeekIndex}
          show={view === 1}
        />
      </div>
      {showModal && <Modal modalData={modalData} closeModal={closeModal} />}
      {showWeekModal
      && (
      <Modal
        modalData={{
          type: WEEK_STRING, currentMenu, hideHeader: true, selectedWeekIndex, modifier: 's',
        }}
        closeModal={(newWeekIndex) => {
          if (newWeekIndex !== undefined) setSelectedWeekIndex(newWeekIndex);
          setShowWeekModal(false);
        }}
      />
      )}
    </div>
  );
}
MenuBuilder.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default MenuBuilder;
