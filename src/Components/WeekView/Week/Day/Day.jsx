import React from 'react';
import PropTypes from 'prop-types';
import './Day.css';
import Meal from './Meal';

function Day({ plan }) {
  const { lunch, dinner, name } = plan;

  return (
    <div className="day">
      <span className="day-label">
        {name}
      </span>
      <div className="meals">
        <Meal meal={lunch} />
        <Meal meal={dinner} />
      </div>
    </div>
  );
}

Day.propTypes = {
  plan: PropTypes.shape({
    lunch: PropTypes.shape(),
    dinner: PropTypes.shape(),
    name: PropTypes.string,
  }).isRequired,
};

export default Day;
