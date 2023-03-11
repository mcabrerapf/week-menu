import React from 'react';
import PropTypes from 'prop-types';
import './Day.css';
import Meal from './Meal';

function Day({ day }) {
  const { lunch, dinner, name } = day;
  const hasNoFood = !lunch.length && !dinner.length;

  return (
    <div className={`day ${hasNoFood ? 'no-food' : ''}`}>
      <span className="day-label">
        {name}
      </span>
      <div className="meals">
        {lunch && lunch[0] && <Meal meal={lunch[0]} />}
        {dinner && dinner[0] && <Meal meal={dinner[0]} />}
      </div>
    </div>
  );
}

Day.propTypes = {
  day: PropTypes.shape({
    lunch: PropTypes.arrayOf(PropTypes.shape),
    dinner: PropTypes.arrayOf(PropTypes.shape),
    name: PropTypes.string,
  }).isRequired,
};

export default Day;
