import React from 'react';
import PropTypes from 'prop-types';
import './Meal.css';

function Meal({ addDash, meal }) {
  const { label } = meal;
  const mealClassName = `meal-${addDash ? 'lunch' : 'dinner'}`;

  return (
    <div className={mealClassName}>
      <p className="meal-content">
        {label}
      </p>
    </div>
  );
}

Meal.propTypes = {
  addDash: PropTypes.bool,
  meal: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

Meal.defaultProps = {
  addDash: false,
};

export default Meal;
