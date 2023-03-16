import React from 'react';
import PropTypes from 'prop-types';
import './WeekView.css';
import Button from '../Button';
// import { useLongPress } from '../../Hooks';

function WeekViewButtons({ showBuildMenuModal, handleChangeView, view }) {
  const checkView = () => {
    const newView = view === 0 ? 1 : 0;
    handleChangeView(newView);
  };

  // const longPressProps = useLongPress({
  //   onClick: showBuildMenuModal,
  //   onLongPress: () => {
  //     const currentMode = window.localStorage.getItem('week-menu-offline-mode');
  //     const newMode = currentMode === '0' ? 1 : 0;
  //     window.localStorage.setItem('week-menu-offline-mode', newMode);
  //   },
  // });

  const buttonText = `Show ${view === 1 ? 'Menu' : 'Sopping List'}`;

  return (
    <div className="week-view-header-buttons">
      <Button
        onClick={showBuildMenuModal}
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
  showBuildMenuModal: PropTypes.func.isRequired,
  handleChangeView: PropTypes.func.isRequired,
};

export default WeekViewButtons;
