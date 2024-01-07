/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MENU_STRING, SAVE_STRING } from '../../constants/STRINGS';
// import { useLongPress } from '../../Hooks';
import Button from '../Button';
import Icon from '../Icon';
import Modal from '../Modal';

function MenuBuilderHeader({
  hasLoadedMenu,
  openMenuBuilderModal,
  handleChangeView,
  handleBuildMenu,
  handleSave,
  view,
  currentMenu,
}) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const checkView = () => {
    const newView = view === 0 ? 1 : 0;
    handleChangeView(newView);
  };

  // const longPressProps = useLongPress({
  //   onLongPress: () => {
  //     const currentMode = window.localStorage.getItem('week-menu-offline-mode');
  //     const newMode = currentMode === '0' ? 1 : 0;
  //     window.localStorage.setItem('week-menu-offline-mode', newMode);
  //     setContextState('offlineMode', newMode);
  //   },
  // });

  const handleSaveClick = () => {
    setModalData({
      type: MENU_STRING,
      itemData: currentMenu,
      modifier: 'f',
    });
    setShowModal(true);
  };

  const handleCloseEvent = async (event) => {
    const { type, data } = event;
    if (type === SAVE_STRING) await handleSave(data, MENU_STRING);
  };

  const closeModal = async (closeEvent) => {
    if (closeEvent) {
      await handleCloseEvent(closeEvent);
      if (closeEvent.dontClose) return;
    }
    setShowModal(false);
    setModalData(null);
  };

  return (
    <>
      <div className="menu-builder header row">
        <Button
          modifier="icon"
          onClick={openMenuBuilderModal}
        >
          <Icon iconName="settings" />
        </Button>
        <Button
          modifier="icon"
          onClick={handleBuildMenu}
        >
          <Icon iconName="shuffle" />
        </Button>
        <Button
          modifier="icon"
          disabled={!hasLoadedMenu}
        // {...longPressProps}
          onClick={checkView}
        >
          <Icon iconName={view === 1 ? 'calendar' : 'cart'} />

        </Button>
        <Button
          modifier="icon"
          disabled={!hasLoadedMenu}
        // {...longPressProps}
          onClick={handleSaveClick}
        >
          <Icon iconName="save" />
        </Button>
      </div>
      {showModal && <Modal modalData={modalData} closeModal={closeModal} />}
    </>

  );
}

MenuBuilderHeader.propTypes = {
  view: PropTypes.number.isRequired,
  openMenuBuilderModal: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleChangeView: PropTypes.func.isRequired,
  handleBuildMenu: PropTypes.func.isRequired,
  hasLoadedMenu: PropTypes.bool.isRequired,
  currentMenu: PropTypes.shape().isRequired,
};

export default MenuBuilderHeader;
