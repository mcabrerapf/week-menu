import React from 'react';
import PropTypes from 'prop-types';
import './Day.css';
import Meal from './Meal';

function Day({
  name, dayIndex, dishes, handleUpdateDish,
}) {
  const breakfasts = dishes.filter(({ useAs }) => useAs === 'BREAKFAST');
  const lunches = dishes.filter(({ useAs }) => useAs === 'LUNCH');
  const dinners = dishes.filter(({ useAs }) => useAs === 'DINNER');
  const hasMeals = !!breakfasts.length || !!lunches.length || !!dinners.length;

  return (
    <div className={`day ${hasMeals ? '' : 'disabled'}`}>
      <div className="day-label">
        {name}
      </div>
      <div className="meals">
        <Meal meals={breakfasts} type="BREAKFAST" dayIndex={dayIndex} handleUpdateDish={handleUpdateDish} />
        <Meal meals={lunches} type="LUNCH" dayIndex={dayIndex} handleUpdateDish={handleUpdateDish} />
        <Meal meals={dinners} type="DINNER" dayIndex={dayIndex} handleUpdateDish={handleUpdateDish} />
      </div>
    </div>
  );
}

Day.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleUpdateDish: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dayIndex: PropTypes.number.isRequired,
};

export default Day;
