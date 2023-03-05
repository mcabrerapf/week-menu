import React from 'react';
import PropTypes from 'prop-types';
import './Day.css';
import Meal from './Meal';

function Day({ plan }) {
  const { meals, label } = plan;

  return (
    <div className="day">
      <span className="day-label">
        {label}
      </span>
      <div className="meals">
        <Meal meal={meals[0]} />
        <Meal meal={meals[1]} />
      </div>
    </div>
  );
}

Day.propTypes = {
  plan: PropTypes.shape({
    meals: PropTypes.arrayOf(PropTypes.shape),
    label: PropTypes.string,
  }).isRequired,
};

export default Day;
