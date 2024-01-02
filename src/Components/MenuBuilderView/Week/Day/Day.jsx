import React from 'react';
import PropTypes from 'prop-types';
import './Day.css';
import Meal from './Meal';
import { BREAKFAST_STRING, DINNER_STRING, LUNCH_STRING } from '../../../../constants';

function Day({
  name, dayIndex, dishes, handleUpdateDish,
}) {
  const breakfasts = dishes.filter(({ useAs }) => useAs === BREAKFAST_STRING);
  const lunches = dishes.filter(({ useAs }) => useAs === LUNCH_STRING);
  const dinners = dishes.filter(({ useAs }) => useAs === DINNER_STRING);
  const hasMeals = !!breakfasts.length || !!lunches.length || !!dinners.length;

  return (
    <div className={`day row w-f border-rad-5${hasMeals ? ' bgc-b' : ' bgc-gr'}`}>
      <div className="day-label upright-text label">
        {name}
      </div>
      <div className="row w-f">
        <Meal
          meals={breakfasts}
          type={BREAKFAST_STRING}
          dayIndex={dayIndex}
          handleUpdateDish={handleUpdateDish}
        />
        <Meal
          meals={lunches}
          type={LUNCH_STRING}
          dayIndex={dayIndex}
          handleUpdateDish={handleUpdateDish}
        />
        <Meal
          meals={dinners}
          type={DINNER_STRING}
          dayIndex={dayIndex}
          handleUpdateDish={handleUpdateDish}
        />
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
