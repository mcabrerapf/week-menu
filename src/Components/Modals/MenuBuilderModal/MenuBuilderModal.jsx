/* eslint-disable max-len */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './MenuBuilderModal.css';
import Button from '../../Button';
import { buildMenu, deepCopy } from '../../helpers';
import { initMenuOptions } from './helpers';
import { MainContext } from '../../../Contexts/MainContext';
import Icon from '../../Icon';
import GeneralView from './GeneralView';
import FilterView from './FilterView';

function MenuBuilderModal({
  modalData, closeModal,
}) {
  const { menuOptions } = modalData;
  const { currentMenu, dishes, ingredients } = useContext(MainContext);
  const [view, setView] = useState(0);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    const copiedData = deepCopy(menuOptions);
    const copiedDishes = deepCopy(dishes);
    const initedData = initMenuOptions(
      copiedData,
      copiedDishes,
      0,
    );
    setCurrentData(initedData);
  }, []);

  const handleBuildMenu = () => {
    const menuWeeks = buildMenu(dishes, currentData);
    const updatedMenu = { menu: { ...currentMenu, weeks: menuWeeks }, options: currentData };
    closeModal(updatedMenu);
  };

  if (!currentData) return null;

  return (
    <div className="col gap-5">
      <div className="header row">
        <Button
          modifier="icon top-l-radius-5"
          fakeDisabled={view !== 0}
          onClick={() => setView(0)}
        >
          <Icon iconName="settings" />
        </Button>
        <Button
          modifier="icon top-r-radius-5"
          fakeDisabled={view !== 1}
          onClick={() => setView(1)}
        >
          <Icon iconName="filter" />
        </Button>
      </div>
      {view === 0 && (
      <GeneralView
        modalData={modalData}
        currentData={currentData}
        setCurrentData={setCurrentData}
        dishes={dishes}
      />
      )}
      {view === 1 && (
      <FilterView
        modalData={modalData}
        currentData={currentData}
        setCurrentData={setCurrentData}
        dishes={dishes}
        ingredients={ingredients}
      />
      )}
      <div className="row pad-5">
        <Button
          modifier="icon"
          onClick={handleBuildMenu}
        >
          <Icon iconName="check" />
        </Button>
      </div>

    </div>
  );
}

MenuBuilderModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape(),
};

MenuBuilderModal.defaultProps = {
  modalData: {},
};

export default MenuBuilderModal;
