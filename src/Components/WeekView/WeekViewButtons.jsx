/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './WeekView.css';
import Button from '../Button';
import { useLongPress } from '../../Hooks';
import {
  MainContext, ToastContext, useMainContext, useToastContext,
} from '../../Context';

function WeekViewButtons({ showBuildMenuModal, handleChangeView, view }) {
  const { setContextState } = useMainContext(MainContext);
  const { addToast } = useToastContext(ToastContext);
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

  const buttonText = `Show ${view === 1 ? 'Menu' : 'Sopping List'}`;

  return (
    <div className="week-view-header-buttons">
      <Button
        onClick={showBuildMenuModal}
        buttonText="Build Menu"
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
};

export default WeekViewButtons;
