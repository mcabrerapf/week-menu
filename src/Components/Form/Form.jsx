import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import Button from '../Button';
import { MainContext, useMainContext } from '../../Context';
import { buildSelectOptions, sortBy } from '../helpers';
import { SELECT_OPTIONS } from '../constants';
import {
  DISH_STRING, GET_ALL_STRING, INGREDIENT_STRING,
} from '../../constants';
import { serviceHandler } from '../../Services';

const initDish = ({
  name, ingredients, type, instructions, description,
}) => ({
  name: name || '',
  type: type || '',
  // time: time || '',
  ingredients: ingredients || [],
  // size: size || '',
  instructions: instructions || '',
  description: description || '',
});
const initIngredient = ({
  name, unit, type,
}) => ({
  name: name || '',
  type: type || '',
  unit: unit || '',
});

const checkIsButtonDisabled = (view, data) => {
  const {
    name, type, unit, ingredients,
  } = data;
  if (view === DISH_STRING) return !name || !type || !ingredients;
  return !name || !type || !unit;
};

function Form({ formData, handleSubmit }) {
  const { view } = useMainContext(MainContext);
  const [currentData, setCurrentData] = useState();
  const [ingredientsData, setIngredientData] = useState();

  useEffect(() => {
    // TODO: check why double api call on init
    async function initForm() {
      const initHelper = view === DISH_STRING ? initDish : initIngredient;
      if (view === DISH_STRING) {
        const ingredients = await serviceHandler(GET_ALL_STRING)(INGREDIENT_STRING);
        const sortedIngredients = sortBy(ingredients, 'name', 'alphabetical');
        setIngredientData(sortedIngredients);
        setCurrentData(initHelper(formData));
      } else {
        setCurrentData(initHelper(formData));
      }
    }
    initForm();
  }, []);

  if (!currentData) return null;

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
    const { unit } = ingredientsData.find(({ id: ingId }) => ingId === eValue) || {};
    const updatedIngredients = [...ingredients, { id: eValue, quantity: 1, unit: unit || 'UN' }];
    setCurrentData({ ...currentData, ingredients: updatedIngredients });
  };

  const handleRemoveIngredient = (ingredientId) => {
    const { ingredients } = currentData;
    const updatedIngredients = ingredients
      .filter(({ id: currentId }) => ingredientId !== currentId);
    setCurrentData({ ...currentData, ingredients: updatedIngredients });
  };

  const handleIngredientPropChange = (propId, propKey, propValue) => {
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

  return (
    <form className="form">
      <div className="form-inputs">
        <input
          className="form-input"
          autoComplete="off"
          type="text"
          id="name"
          name="name"
          value={currentData.name}
          onChange={handleOnChange}
          placeholder="Name"
        />
        <select
          className="form-select"
          name="type"
          id="type"
          value={currentData.type}
          onChange={handleOnChange}
        >
          <option value="" className="form-select-option" disabled>
            Choose an
            {' '}
            {view}
            {' '}
            type...
          </option>
          {buildSelectOptions(SELECT_OPTIONS[view].type)}
        </select>
        {view === INGREDIENT_STRING && (
        <select
          className="form-select"
          id="unit"
          name="unit"
          value={currentData.unit}
          onChange={handleOnChange}
        >
          <option value="" className="form-select-option" disabled>
            Choose an
            {' '}
            {view}
            {' '}
            unit...
          </option>
          {buildSelectOptions(SELECT_OPTIONS[view].unit)}
        </select>
        )}
        {view === DISH_STRING && (
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
        {view === DISH_STRING && (
        <div className="form-ingredients">
          {currentData.ingredients.map((currentIngredient) => {
            const { id: currentIngId, quantity, unit } = currentIngredient;
            if (!currentIngId) return null;
            const ingMatch = ingredientsData
              .find(({ id: idToCheck }) => idToCheck === currentIngId);
            if (!ingMatch) return null;
            const { name: ingName, unit: defaultUnit } = ingMatch;
            const iUnit = unit || defaultUnit;

            return (
              <div className="form-ingredients-ingredient" key={currentIngId}>
                <div className="form-ingredients-ingredient-name">{ingName}</div>
                <div className="form-ingredients-ingredient-quantity-container">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="form-ingredients-ingredient-quantity"
                    aria-label={currentIngId}
                    key={currentIngId}
                    id={currentIngId}
                    name="quantity"
                    value={quantity}
                    onFocus={() => handleIngredientPropChange(currentIngId, 'quantity', null)}
                    onBlur={() => !quantity && handleIngredientPropChange(currentIngId, 'quantity', 1)}
                    onChange={({ target: { value } }) => !!value && handleIngredientPropChange(currentIngId, 'quantity', value)}
                  />
                  <select
                    className="form-ingredients-ingredient-unit"
                    id={currentIngId}
                    name="unit"
                    value={iUnit}
                    onChange={({ target: { value } }) => handleIngredientPropChange(currentIngId, 'unit', value)}
                  >
                    <option value="" className="form-select-option" disabled>
                      Choose an
                      {' '}
                      {view}
                      {' '}
                      unit...
                    </option>
                    {buildSelectOptions(SELECT_OPTIONS[INGREDIENT_STRING].unit, 'value')}
                  </select>
                  <button
                    className="form-ingredients-ingredient-remove"
                    aria-label={`remove-${currentIngId}`}
                    type="button"
                    value={currentIngId}
                    onClick={() => handleRemoveIngredient(currentIngId)}
                  >
                    <i className="fa fa-times" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        )}
        {view === DISH_STRING && (
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
        {view === DISH_STRING && (
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
        modifier={`submit${checkIsButtonDisabled(view, currentData) ? ' disabled' : ''}`}
        handleOnClick={handleSubmitButtonClick}
        disabled={checkIsButtonDisabled(view, currentData)}
        buttonText="Save"
      />
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  formData: PropTypes.shape(),

};

Form.defaultProps = {
  formData: '',
};

export default Form;
