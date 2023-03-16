import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Meal.css';
import Modal from '../../../../Modal';
import MealModalContent from './MealModalContent';

function Meal({
  meals, dayIndex, type, handleUpdateDish,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const firstMeal = meals[0];
  const { name } = firstMeal || {};

  const handleToggleTooltip = (updateData) => {
    if (!firstMeal) return;
    if (!!updateData && updateData.newDish) {
      const newDishData = { ...updateData.newDish, useAs: type, days: [dayIndex] };
      handleUpdateDish({
        ...updateData, newDish: newDishData, dayIndex, type,
      });
    }
    setShowTooltip(!showTooltip);
  };
  const className = `meal${firstMeal ? '' : ' no-dish'}`;
  return (
    <div className={className}>
      <div
        tabIndex={0}
        role="button"
        className="meal-content"
        onKeyDown={handleToggleTooltip}
        onClick={handleToggleTooltip}
      >
        {name}
      </div>

      {showTooltip
      && (
      <Modal hideModal={handleToggleTooltip} headerText={name}>
        <MealModalContent meal={meals[0]} handleToggleTooltip={handleToggleTooltip} />
      </Modal>
      )}
    </div>
  );
}

Meal.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleUpdateDish: PropTypes.func.isRequired,
  dayIndex: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Meal;
