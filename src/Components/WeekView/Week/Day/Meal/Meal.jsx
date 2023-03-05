import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Meal.css';
import Modal from '../../../../Modal';
import MealModalContent from './MealModalContent';

function Meal({ addDash, meal }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { label } = meal;
  const mealClassName = `meal-${addDash ? 'lunch' : 'dinner'}`;
  const handleToggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };
  return (
    <div className={mealClassName}>
      <div
        tabIndex={0}
        role="button"
        className="meal-content"
        onKeyDown={handleToggleTooltip}
        onClick={handleToggleTooltip}
      >
        {label}
      </div>

      {showTooltip
      && (
      <Modal hideModal={handleToggleTooltip} headerText={label}>
        <MealModalContent meal={meal} />
      </Modal>
      )}
    </div>
  );
}

Meal.propTypes = {
  addDash: PropTypes.bool,
  meal: PropTypes.shape({
    label: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

Meal.defaultProps = {
  addDash: false,
};

export default Meal;
