import React from 'react';
import PropTypes from 'prop-types';
import './WeekView.css';
import Button from '../Button';

function WeekViewButtons({ handleBuildPlanClick, handleChangeView, view }) {
  const checkView = (newView) => {
    if (newView !== view) handleChangeView(newView);
  };

  return (
    <div className="week-view-header-buttons">
      <Button
        handleOnClick={handleBuildPlanClick}
        buttonText="Build Plan"
      />
      <Button
        modifier={view === 0 ? ' selected' : ''}
        handleOnClick={() => checkView(0)}
        buttonText="Week"
      />
      <Button
        modifier={view === 1 ? ' selected' : ''}
        handleOnClick={() => checkView(1)}
        buttonText="Shopping List"
      />
    </div>
  );
}

WeekViewButtons.propTypes = {
  view: PropTypes.number.isRequired,
  handleBuildPlanClick: PropTypes.func.isRequired,
  handleChangeView: PropTypes.func.isRequired,
};

export default WeekViewButtons;
