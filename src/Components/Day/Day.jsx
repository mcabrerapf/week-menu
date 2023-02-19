import React from 'react';
import './Day.css';
import Meal from '../Meal';

function Day({ plan }) {
  // console.log(day)

  return (
    <div className="day">
      <span className="day-label">
        {' '}
        {plan.label}
        {' '}
      </span>
      <Meal addDash meal={plan.meals[0]} />
      <Meal meal={plan.meals[1]} />
    </div>
  );
}

export default Day;
