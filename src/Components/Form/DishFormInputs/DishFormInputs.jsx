/* eslint-disable no-restricted-globals */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './DishFormInputs.css';
import { DISH_TYPES } from '../../constants/DISHES';
import { MainContext } from '../../../Contexts/MainContext';
import IngredientsField from './IngredientsField';
import Input from '../../Input';
import Button from '../../Button';
import QuantityInput from '../../QuantityInput';
import { sortBy } from '../../helpers';

function DishFormInputs({ currentData, setCurrentData }) {
  const { ingredients: contextIngredients } = useContext(MainContext);
  const {
    name, types, ingredients, servings, time: { hours, minutes } = {},
  } = currentData;

  const handleOnChange = ({ target: { value, name: eName } }) => {
    setCurrentData({ ...currentData, [eName]: value });
  };

  const handleAddIngredient = ({ target: { value: eValue } }) => {
    if (!eValue) return;
    if (ingredients.find(({ id: ingId }) => ingId === eValue)) return;
    const { unit, name: iName } = contextIngredients
      .find(({ id: ingId }) => ingId === eValue) || {};
    const updatedIngredients = [...ingredients, {
      id: eValue, name: iName, quantity: 1, unit,
    }];
    setCurrentData({ ...currentData, ingredients: updatedIngredients });
  };

  const handleRemoveIngredient = (ingredientId) => {
    const updatedIngredients = ingredients
      .filter(({ id: currentId }) => ingredientId !== currentId);
    setCurrentData({ ...currentData, ingredients: updatedIngredients });
  };

  const handleIngredientChange = (e = {}) => {
    const { target: { value: eValue, id: eId, name: eName } } = e;

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

  const toggleType = ({ target: { value: eValue } }) => {
    const newTypes = types.includes(eValue)
      ? types.filter((type) => type !== eValue) : [...types, eValue];
    setCurrentData({ ...currentData, types: newTypes });
  };

  const handleIncrease = () => {
    setCurrentData({ ...currentData, servings: servings + 1 });
  };
  const handleDecrease = () => {
    setCurrentData({ ...currentData, servings: servings - 1 });
  };

  const sortedIngredients = sortBy(contextIngredients, 'name', 'alphabetical');

  return (
    <div className="form-inputs">
      <Input
        autoComplete="off"
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleOnChange}
        onBlur={handleOnChange}
        placeholder="Name"
        label="Name"
      />
      <div className="form-input-group">
        <div className="group-input">
          <span className="group-input-label">Type</span>
          <div className="group-input-inputs">
            {DISH_TYPES
              .map(({ id: typeId, shortLabel }) => (
                <Button
                  key={typeId}
                  modifier={types.includes(typeId) ? '' : 'not-selected'}
                  buttonText={shortLabel}
                  value={typeId}
                  onClick={toggleType}
                />
              ))}

          </div>
        </div>
        <div className="group-input">
          <span className="group-input-label">Servings</span>
          <QuantityInput
            value={servings}
            min={1}
            max={99}
            valueKey="servings"
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
          />
        </div>

        <div className="group-input">
          <span className="group-input-label">Time</span>
          <div className="group-input-inputs">
            <Input
              type="number"
              id="hours"
              name="hours"
              value={hours}
              resetValueOnClick
              min={0}
              max={99}
              onFocus={handleTimeChange}
              onBlur={handleTimeChange}
              onChange={handleTimeChange}
            />
            :
            <Input
              type="number"
              id="minutes"
              name="minutes"
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

      </div>
      <Input
        value=""
        name="ingredients"
        id="ingredients"
        onChange={handleAddIngredient}
        placeholder="Add ingredient"
        selectOptions={sortedIngredients}
        type="select"
      />
      <div className="form-ingredients">
        <IngredientsField
          ingredients={ingredients}
          handleIngredientChange={handleIngredientChange}
          handleRemoveIngredient={handleRemoveIngredient}
        />
      </div>
      <Input
        id="description"
        name="description"
        label="Description"
        value={currentData.description}
        onChange={handleOnChange}
        placeholder="Dish description..."
        type="textarea"
      />
      <Input
        id="instructions"
        name="instructions"
        label="Instructions"
        value={currentData.instructions}
        onChange={handleOnChange}
        placeholder="Dish instructions..."
        type="textarea"
      />
    </div>
  );
}

DishFormInputs.propTypes = {
  setCurrentData: PropTypes.func.isRequired,
  currentData: PropTypes.shape(),

};

DishFormInputs.defaultProps = {
  currentData: {},
};

export default DishFormInputs;
