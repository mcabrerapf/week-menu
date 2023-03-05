import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Meal.css';
import Modal from '../../../../Modal';
import MealModalContent from './MealModalContent';

function Meal({ meal }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { label } = meal;

  const handleToggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="meal">
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
  meal: PropTypes.shape({
    label: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default Meal;
