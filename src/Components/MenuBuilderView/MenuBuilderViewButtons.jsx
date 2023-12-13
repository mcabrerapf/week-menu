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

function WeekViewButtons({
  showBuildMenuModal, handleChangeView, handleBuildMenu, view, hasLoadedMenu, menu,
}) {
  const { setContextState } = useContext(MainContext);
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
      type: 'menu',
      modalData: { dishes: menu },
      modifier: 'small',
    });
  };

  const buttonIcon = `${view === 1 ? 'fa fa-calendar-o' : 'fa fa-list'}`;

  return (
    <div className="week-view-header-buttons">
      <Button
        onClick={showBuildMenuModal}

      >
        <i className="fa fa-cog" aria-hidden="true" />
      </Button>
      <Button
        onClick={handleBuildMenu}
      >
        <i
          className="fa fa-random"
          aria-hidden="true"
        />
      </Button>
      <Button
        disabled={!hasLoadedMenu}
        {...longPressProps}
        onClick={checkView}
      >
        <i
          className={buttonIcon}
          aria-hidden="true"
        />
      </Button>
      <Button
        disabled={!hasLoadedMenu}
        {...longPressProps}
        onClick={handleSaveClick}
      >
        <i
          className="fa fa-floppy-o"
          aria-hidden="true"
        />
      </Button>
    </div>
  );
}

WeekViewButtons.propTypes = {
  view: PropTypes.number.isRequired,
  showBuildMenuModal: PropTypes.func.isRequired,
  handleChangeView: PropTypes.func.isRequired,
  handleBuildMenu: PropTypes.func.isRequired,
  hasLoadedMenu: PropTypes.bool.isRequired,
  menu: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default WeekViewButtons;