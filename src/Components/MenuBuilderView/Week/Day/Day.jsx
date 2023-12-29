import React from 'react';
import PropTypes from 'prop-types';
import './Day.css';
import Meal from './Meal';

function Day({
  name, dayIndex, dishes, handleUpdateDish,
}) {
  const breakfasts = dishes.filter(({ useAs }) => useAs === 'breakfast');
  const lunches = dishes.filter(({ useAs }) => useAs === 'lunch');
  const dinners = dishes.filter(({ useAs }) => useAs === 'dinner');
  const hasMeals = !!breakfasts.length || !!lunches.length || !!dinners.length;

  return (
    <div className={`day row${hasMeals ? ' bgc-b' : ' bgc-gr'}`}>
      <div className="day-label upright-text label">
        {name}
      </div>
      <div className="row">
        <Meal meals={breakfasts} type="breakfast" dayIndex={dayIndex} handleUpdateDish={handleUpdateDish} />
        <Meal meals={lunches} type="lunch" dayIndex={dayIndex} handleUpdateDish={handleUpdateDish} />
        <Meal meals={dinners} type="dinner" dayIndex={dayIndex} handleUpdateDish={handleUpdateDish} />
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
