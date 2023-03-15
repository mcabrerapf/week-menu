import React from 'react';
import PropTypes from 'prop-types';
import './WeekView.css';
import Button from '../Button';

import { useLongPress } from '../../Hooks';

function WeekViewButtons({ handleBuildMenu, handleChangeView, view }) {
  const checkView = () => {
    const newView = view === 0 ? 1 : 0;
    handleChangeView(newView);
  };

  const longPressProps = useLongPress({
    onClick: handleBuildMenu,
    onLongPress: () => {
      const currentMode = window.localStorage.getItem('week-menu-offline-mode');
      const newMode = currentMode === '0' ? 1 : 0;
      window.localStorage.setItem('week-menu-offline-mode', newMode);
    },
  });

  const buttonText = `Show ${view === 1 ? 'Menu' : 'Sopping List'}`;

  return (
    <div className="week-view-header-buttons">
      <Button
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...longPressProps}
        buttonText="Build Plan"
      />
      <Button
        onClick={checkView}
        buttonText={buttonText}
      />
    </div>
  );
}

WeekViewButtons.propTypes = {
  view: PropTypes.number.isRequired,
  handleBuildMenu: PropTypes.func.isRequired,
  handleChangeView: PropTypes.func.isRequired,
};

export default WeekViewButtons;
