/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Meal.css';
import Button from '../../../../Button';
import Input from '../../../../Input';
import { MainContext, useMainContext } from '../../../../../Context';
import { sortBy } from '../../../../helpers';

// TODO: refactor
function MealModalContent({ meal, handleToggleTooltip }) {
  const { dishes: dishesFromContext } = useMainContext(MainContext);
  const {
    id, description, instructions, time, ingredients,
  } = meal;

  const [modalData, setModalData] = useState({ mode: 0, changeAll: false });
  const {
    mode, dishes, selectedDish, changeAll,
  } = modalData;

  const parsedIngredients = ingredients.map(({ name }, i) => {
    if (i + 1 < ingredients.length) return `${name}, `;
    return name;
  });

  const handleButtonClick = async () => {
    if (mode === 0) {
      const sortedDishes = sortBy(dishesFromContext, 'name', 'alphabetical');
      setModalData({
        mode: 1, dishes: sortedDishes, selectedDish: id, changeAll: false,
      });
    } else {
      const newDish = dishes.find(({ id: newDishId }) => newDishId === selectedDish);
      handleToggleTooltip({ newDish, oldDishId: id, changeAll });
    }
  };

  const handleOnChange = ({ target: { value, checked, type: eType } }) => {
    const key = eType === 'checkbox' ? 'changeAll' : 'selectedDish';
    const valueToUse = eType === 'checkbox' ? checked : value;
    setModalData({ ...modalData, [key]: valueToUse });
  };

  const buttonText = mode === 0 ? 'Change dish' : 'Save';

  return (
    <div className="meal-modal-content">
      {mode === 0 && (
      <ul className="meal-modal-content-list">
        {time && (
        <li className="meal-modal-content-list-item">
          <span>Time:</span>
          {' '}
          {time}
        </li>
        )}
        <li className="meal-modal-content-list-item">
          <span>Ingredients:</span>
          {' '}
          {parsedIngredients}
        </li>
        {description && (
        <li className="meal-modal-content-list-item">
          <span>Description:</span>
          {' '}
          {description}
        </li>
        )}
        {instructions && (
        <li className="meal-modal-content-list-item">
          <span>Instuctions:</span>
          {' '}
          {instructions}
        </li>
        )}
      </ul>
      )}
      {mode === 1 && (
      <div>
        <Input
          name="dish"
          id="dish"
          value={selectedDish}
          onChange={handleOnChange}
          placeholder="Choose a dishs"
          selectOptions={dishes}
          type="select"
        />
        <Input
          id="change-all"
          modifier="change-all-checkbox"
          type="checkbox"
          value={changeAll}
          onChange={handleOnChange}
          label="Change all"
        />
      </div>
      )}
      <Button buttonText={buttonText} onClick={handleButtonClick} />
    </div>
  );
}

MealModalContent.propTypes = {
  handleToggleTooltip: PropTypes.func.isRequired,
  meal: PropTypes.shape().isRequired,
};

export default MealModalContent;
