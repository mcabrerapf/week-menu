/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import Button from '../Button';
import { MainContext, useMainContext } from '../../Context';
import { SELECT_OPTIONS } from '../constants';
import {
  DISH_STRING,
} from '../../constants';
import { checkIsButtonDisabled } from './helpers';
import IngredientsField from './IngredientsField';
import Input from '../Input';

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

  const handleIngredientChange = (e = {}) => {
    const { target: { value: eValue, id: eId, name: eName } } = e;
    const { ingredients } = currentData;
    const updatedIngredients = ingredients.map((ing) => {
      const { id: ingId } = ing;
      if (ingId === eId) {
        return {
          ...ing,
          [eName]: eValue,
        };
      }
      return ing;
    });
    setCurrentData({ ...currentData, ingredients: updatedIngredients });
  };

  const handleTimeChange = (e) => {
    const { target: { value: eValue, name: eName } } = e;
    const {
      time,
    } = currentData;

    setCurrentData({ ...currentData, time: { ...time, [eName]: eValue } });
  };

  const {
    name, type, unit, ingredients, servings, time: { hours, minutes } = {},
  } = currentData;

  const buttonClassName = `submit${checkIsButtonDisabled(view, currentData) ? ' disabled' : ''}`;
  const isDish = view === DISH_STRING;

  return (
    <form className="form">
      <div className="form-inputs">
        <Input
          autoComplete="off"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleOnChange}
          placeholder="Name"
          label="Name"
        />
        <Input
          name="type"
          id="type"
          value={type}
          onChange={handleOnChange}
          placeholder="Choose a type..."
          selectOptions={SELECT_OPTIONS[view].type}
          type="select"
          label="Type"
        />

        {!isDish && (
        <Input
          id="unit"
          name="unit"
          value={unit}
          onChange={handleOnChange}
          placeholder="Choose a unit..."
          selectOptions={SELECT_OPTIONS[view].unit}
          type="select"
          label="Unit"
        />
        )}
        {isDish
        && (
        <div className="form-input-group">
          <Input
            modifier="servings-input"
            type="number"
            id="servings"
            name="servings"
            label="Servings"
            value={servings}
            resetValueOnClick
            min={1}
            onFocus={handleOnChange}
            onBlur={handleOnChange}
            onChange={handleOnChange}
          />
          <div className="time-inputs">
            <span className="time-inputs-label">Time</span>
            <Input
              type="number"
              id="hours"
              name="hours"
              label="h"
              value={hours}
              resetValueOnClick
              min={0}
              onFocus={handleTimeChange}
              onBlur={handleTimeChange}
              onChange={handleTimeChange}
            />
            <Input
              type="number"
              id="minutes"
              name="minutes"
              label="m"
              value={minutes}
              resetValueOnClick
              min={0}
              max={59}
              onFocus={handleTimeChange}
              onBlur={handleTimeChange}
              onChange={handleTimeChange}
            />
          </div>

        </div>
        )}

        {isDish && (
          <Input
            value=""
            name="ingredients"
            id="ingredients"
            onChange={handleAddIngredient}
            placeholder="Add ingredient"
            selectOptions={ingredientsData}
            type="select"
          />
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
          <Input
            id="description"
            name="description"
            label="Description"
            value={currentData.description}
            onChange={handleOnChange}
            placeholder="Dish description..."
            type="textarea"
          />

        )}
        {isDish && (
        <Input
          id="instructions"
          name="instructions"
          label="Instructions"
          value={currentData.instructions}
          onChange={handleOnChange}
          placeholder="Dish instructions..."
          type="textarea"
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
