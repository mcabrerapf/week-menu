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
        <Input
          autoComplete="off"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleOnChange}
          placeholder="Name"
        />
        <Input
          name="type"
          id="type"
          value={type}
          onChange={handleOnChange}
          placeholder="Choose a type..."
          selectOptions={SELECT_OPTIONS[view].type}
          type="select"
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
        />
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
