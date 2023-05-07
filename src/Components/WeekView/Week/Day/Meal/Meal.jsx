/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Meal.css';
import Button from '../../../../Button';
import { ModalContext } from '../../../../../Contexts/ModalContext';

const getParsedMealName = (name, sideDishes) => {
  if (!sideDishes || !sideDishes.length) return name;
  const sideDishesNames = sideDishes.map(({ name: sideDishName }) => sideDishName);
  return `${name} + ${sideDishesNames.join(' + ')}`;
};

function Meal({
  meals, dayIndex, type, handleUpdateDish,
}) {
  const { addModal } = useContext(ModalContext);

  const firstMeal = meals[0] || {};
  const { name, sideDishesToUse } = firstMeal;
  const updateDishes = (updateData) => {
    const newDishData = { ...updateData.newDish, useAs: type, days: [dayIndex] };

    handleUpdateDish({
      ...updateData, newDish: newDishData, dayIndex, type,
    });
  };

  const openMealModal = () => {
    addModal({
      type: 'meal',
      modalData: firstMeal,
      onClose: updateDishes,
    });
  };

  const className = `meal${name ? '' : ' no-dish'}`;
  const parsedMealName = getParsedMealName(name, sideDishesToUse);

  return (
    <div
      className={className}
    >
      <Button modifier="meal-content" onClick={openMealModal} buttonText={parsedMealName} />
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
