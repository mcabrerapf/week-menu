import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import Button from '../Button';
import { MainContext, useMainContext } from '../../Context';
import { buildSelectOptions } from '../helpers';
import { SELECT_OPTIONS } from '../constants';
import {
  DISH_STRING, INGREDIENT_STRING,
} from '../../constants';
import { checkIsButtonDisabled } from './helpers';
import IngredientsField from './IngredientsField';

function Form({ formData, handleSubmit, ingredientsData }) {
  const { view } = useMainContext(MainContext);
  const [currentData, setCurrentData] = useState(formData);

  const handleSubmitButtonClick = () => {
    if (checkIsButtonDisabled(view, currentData)) return;
    handleSubmit(currentData);
  };

  const handleOnChange = ({ target: { value, name: eName } }) => {
    setCurrentData({ ...currentData, [eName]: value });
  };

  const handleAddIngredient = ({ target: { value: eValue } }) => {
    if (!eValue) return;
    const { ingredients } = currentData;
    if (ingredients.find(({ id: ingId }) => ingId === eValue)) return;
    const { unit, name } = ingredientsData.find(({ id: ingId }) => ingId === eValue) || {};
    const updatedIngredients = [...ingredients, {
      id: eValue, name, quantity: 1, unit,
    }];
    setCurrentData({ ...currentData, ingredients: updatedIngredients });
  };

  const handleRemoveIngredient = (ingredientId) => {
    const { ingredients } = currentData;
    const updatedIngredients = ingredients
      .filter(({ id: currentId }) => ingredientId !== currentId);
    setCurrentData({ ...currentData, ingredients: updatedIngredients });
  };

  const handleIngredientChange = (propId, propKey, propValue) => {
    const { ingredients } = currentData;
    const updatedIngredients = ingredients.map((ing) => {
      const { id: ingId } = ing;
      if (ingId === propId) {
        return {
          ...ing,
          [propKey]: propKey === 'quantity' ? Number(propValue) : propValue,
        };
      }
      return ing;
    });
    setCurrentData({ ...currentData, ingredients: updatedIngredients });
  };

  const {
    name, type, unit, ingredients,
  } = currentData;
  const buttonClassName = `submit${checkIsButtonDisabled(view, currentData) ? ' disabled' : ''}`;
  const isDish = view === DISH_STRING;

  return (
    <form className="form">
      <div className="form-inputs">
        <input
          className="form-input"
          autoComplete="off"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleOnChange}
          placeholder="Name"
        />
        <select
          className="form-select"
          name="type"
          id="type"
          value={type}
          onChange={handleOnChange}
        >
          <option value="" className="form-select-option" disabled>
            Choose a type...
          </option>
          {buildSelectOptions(SELECT_OPTIONS[view].type)}
        </select>
        {view === INGREDIENT_STRING && (
        <select
          className="form-select"
          id="unit"
          name="unit"
          value={unit}
          onChange={handleOnChange}
        >
          <option value="" className="form-select-option" disabled>
            Choose a unit...
          </option>
          {buildSelectOptions(SELECT_OPTIONS[view].unit)}
        </select>
        )}
        {isDish && (
        <select
          className="form-select"
          value=""
          name="ingredients"
          id="ingredients"
          onChange={handleAddIngredient}
        >
          <option value="" className="form-select-option" disabled>Add ingredient</option>
          {buildSelectOptions(ingredientsData)}
        </select>
        )}
        {isDish && (
        <div className="form-ingredients">
          <IngredientsField
            ingredients={ingredients}
            handleIngredientChange={handleIngredientChange}
            handleRemoveIngredient={handleRemoveIngredient}
          />
        </div>
        )}
        {isDish && (
        <textarea
          className="form-textarea"
          autoComplete="off"
          id="description"
          name="description"
          value={currentData.description}
          onChange={handleOnChange}
          placeholder="Dish description..."
        />
        )}
        {isDish && (
        <textarea
          className="form-textarea"
          autoComplete="off"
          id="instructions"
          name="instructions"
          value={currentData.instructions}
          onChange={handleOnChange}
          placeholder="Dish instructions..."
        />
        )}
      </div>

      <Button
        modifier={buttonClassName}
        onClick={handleSubmitButtonClick}
        disabled={checkIsButtonDisabled(view, currentData)}
        buttonText="Save"
      />
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  ingredientsData: PropTypes.arrayOf(PropTypes.shape),
  formData: PropTypes.shape(),

};

Form.defaultProps = {
  ingredientsData: [],
  formData: '',
};

export default Form;
