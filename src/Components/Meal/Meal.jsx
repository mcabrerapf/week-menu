import React from 'react';
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

export default Meal;
