/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './WeekView.css';
import Button from '../Button';
import { useLongPress } from '../../Hooks';
import {
  MainContext,
} from '../../Contexts/MainContext';
import {
  ToastContext,
} from '../../Contexts/ToastContext';

function WeekViewButtons({
  showBuildMenuModal, handleChangeView, handleBuildMenu, view,
}) {
  const { setContextState } = useContext(MainContext);
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

  const buttonText = `${view === 1 ? 'M' : 'L'}`;

  return (
    <div className="week-view-header-buttons">
      <Button
        onClick={showBuildMenuModal}
        buttonText="B"
      />
      <Button
        onClick={handleBuildMenu}
        buttonIcon="dice"
      />
      <Button
        {...longPressProps}
        onClick={checkView}
        buttonText={buttonText}
      />
    </div>
  );
}

WeekViewButtons.propTypes = {
  view: PropTypes.number.isRequired,
  showBuildMenuModal: PropTypes.func.isRequired,
  handleChangeView: PropTypes.func.isRequired,
  handleBuildMenu: PropTypes.func.isRequired,
};

export default WeekViewButtons;
