/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MenuBuilderModal.scss';
import Button from '../../Button';
import { buildMenu, deepCopy } from '../../helpers';
import { initMenuOptions } from './helpers';
import { useMainContext } from '../../../Contexts/MainContext';
import Icon from '../../Icon';
import GeneralView from './GeneralView';
import FilterView from './FilterView';

function MenuBuilderModal({
  modalData, closeModal,
}) {
  const { menuOptions } = modalData;
  const { currentMenu, dishes, ingredients } = useMainContext();
  const [view, setView] = useState(0);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    const copiedData = deepCopy(menuOptions);
    const initedData = initMenuOptions(
      copiedData,
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
    <div className="menu-builder-modal col gap-5">
      <div className="menu-builder-modal__header header row">
        <Button
          modifier="icon top-l-radius-5 w-f"
          fakeDisabled={view !== 0}
          onClick={() => setView(0)}
        >
          <Icon iconName="settings" />
        </Button>
        <Button
          modifier="icon top-r-radius-5 w-f"
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
      <div className="menu-builder-modal__footer row pad-b-10 pad-h-10">
        <Button
          modifier="icon w-f"
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
