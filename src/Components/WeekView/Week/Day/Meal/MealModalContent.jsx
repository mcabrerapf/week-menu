/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Meal.css';
import Button from '../../../../Button';
import { GET_ALL_STRING, DISH_STRING, INGREDIENT_STRING } from '../../../../../constants';
import { serviceHandler } from '../../../../../Services';
import { buildSelectOptions, buildDishesWithIngredients } from '../../../../helpers';
import { useMainContext, MainContext } from '../../../../../Context';

// TODO: refactor
function MealModalContent({ meal, handleToggleTooltip }) {
  const {
    id, description, instructions, time, ingredients,
  } = meal;
  const { offlineMode } = useMainContext(MainContext);
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
      const allDishes = await serviceHandler(GET_ALL_STRING, offlineMode)(DISH_STRING);
      const allIngredients = await serviceHandler(GET_ALL_STRING, offlineMode)(INGREDIENT_STRING);
      const dishesWithIngredients = buildDishesWithIngredients(allDishes, allIngredients);
      setModalData({
        mode: 1, dishes: dishesWithIngredients, selectedDish: id, changeAll: false,
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
      <ul>
        {time && (
        <li>
          <span>Time:</span>
          {' '}
          {time}
        </li>
        )}
        <li>
          <span>Ingredients:</span>
          {' '}
          {parsedIngredients}
        </li>
        {description && (
        <li>
          <span>Description:</span>
          {' '}
          {description}
        </li>
        )}
        {instructions && (
        <li>
          <span>Instuctions:</span>
          {' '}
          {instructions}
        </li>
        )}
      </ul>
      )}
      {mode === 1 && (
      <div>
        <select
          className="form-select"
          name="dish"
          id="dish"
          value={selectedDish}
          onChange={handleOnChange}
        >
          <option value="" className="form-select-option" disabled>
            Choose a dish
          </option>
          {buildSelectOptions(dishes)}
        </select>
        <div>
          <label htmlFor="change-all">Change All</label>
          <input
            id="change-all"
            type="checkbox"
            value={changeAll}
            onChange={handleOnChange}
          />
        </div>

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
