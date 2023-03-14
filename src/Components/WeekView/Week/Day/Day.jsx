import React from 'react';
import PropTypes from 'prop-types';
import './Day.css';
import Meal from './Meal';

function Day({
  name, dayIndex, checked, dishes, handleUpdateDish,
}) {
  const breakfasts = dishes.filter(({ useAs }) => useAs === 'BREAKFAST');
  const lunches = dishes.filter(({ useAs }) => useAs === 'LUNCH');
  const dinners = dishes.filter(({ useAs }) => useAs === 'DINNER');

  return (
    <div className={`day ${checked ? '' : 'no-food'}`}>
      <span className="day-label">
        {name}
      </span>
      <div className="meals">
        {!!breakfasts.length
        && <Meal meals={breakfasts} type="BREAKFAST" dayIndex={dayIndex} handleUpdateDish={handleUpdateDish} />}
        {!!lunches.length
        && <Meal meals={lunches} type="LUNCH" dayIndex={dayIndex} handleUpdateDish={handleUpdateDish} />}
        {!!dinners.length
        && <Meal meals={dinners} type="DINNER" dayIndex={dayIndex} handleUpdateDish={handleUpdateDish} />}
      </div>
    </div>
  );
}

Day.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleUpdateDish: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dayIndex: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default Day;
