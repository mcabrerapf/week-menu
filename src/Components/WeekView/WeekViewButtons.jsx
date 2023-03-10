import React from 'react';
import PropTypes from 'prop-types';
import './WeekView.css';
import Button from '../Button';
import { useMainContext, MainContext } from '../../Context';
import { useLongPress } from '../../Hooks';

function WeekViewButtons({ handleBuildPlanClick, handleChangeView, view }) {
  const { offlineMode, setContextState } = useMainContext(MainContext);
  const checkView = (newView) => {
    if (newView !== view) handleChangeView(newView);
  };

  const longPressProps = useLongPress({
    onClick: handleBuildPlanClick,
    onLongPress: () => {
      setContextState('offlineMode', !offlineMode);
    },
  });

  return (
    <div className="week-view-header-buttons">
      <Button
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...longPressProps}
        buttonText="Build Plan"
      />
      <Button
        modifier={view === 0 ? ' selected' : ''}
        onClick={() => checkView(0)}
        buttonText="Week"
      />
      <Button
        modifier={view === 1 ? ' selected' : ''}
        onClick={() => checkView(1)}
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
