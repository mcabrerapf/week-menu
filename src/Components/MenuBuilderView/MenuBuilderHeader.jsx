/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './MenuBuilderView.css';
import Button from '../Button';
import { useLongPress } from '../../Hooks';
import {
  MainContext,
} from '../../Contexts/MainContext';
import {
  ToastContext,
} from '../../Contexts/ToastContext';
import { ModalContext } from '../../Contexts/ModalContext';
import Icon from '../Icon';
import { MENU_STRING } from '../../constants';

function MenuBuilderHeader({
  showBuildMenuModal, handleChangeView, handleBuildMenu, view, hasLoadedMenu,
}) {
  const { setContextState, currentMenu: { weeks } } = useContext(MainContext);
  const { addModal } = useContext(ModalContext);
  const { addToast } = useContext(ToastContext);
  const checkView = () => {
    const newView = view === 0 ? 1 : 0;
    handleChangeView(newView);
  };

  const longPressProps = useLongPress({
    onLongPress: () => {
      const currentMode = window.localStorage.getItem('week-menu-offline-mode');
      const newMode = currentMode === '0' ? 1 : 0;
      window.localStorage.setItem('week-menu-offline-mode', newMode);
      setContextState('offlineMode', newMode);
      addToast(`Offline mode is ${newMode === 1 ? 'ON' : 'OFF'}`, 'info');
    },
  });

  const handleSaveClick = () => {
    addModal({
      type: MENU_STRING,
      modalData: { weeks },
      modifier: 'full',
    });
  };

  return (
    <div className="header top row">
      <Button
        modifier="icon"
        onClick={showBuildMenuModal}
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
        {...longPressProps}
        onClick={checkView}
      >
        <Icon iconName={view === 1 ? 'calendar' : 'cart'} />

      </Button>
      <Button
        modifier="icon"
        disabled={!hasLoadedMenu}
        {...longPressProps}
        onClick={handleSaveClick}
      >
        <Icon iconName="save" />
      </Button>
    </div>
  );
}

MenuBuilderHeader.propTypes = {
  view: PropTypes.number.isRequired,
  showBuildMenuModal: PropTypes.func.isRequired,
  handleChangeView: PropTypes.func.isRequired,
  handleBuildMenu: PropTypes.func.isRequired,
  hasLoadedMenu: PropTypes.bool.isRequired,
};

export default MenuBuilderHeader;
