/* eslint-disable no-restricted-globals */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './DishFormInputs.css';
import { DISH_TYPES } from '../../constants/DISHES';
import { MainContext } from '../../../Contexts/MainContext';
import IngredientsField from './IngredientsField';
import Input from '../../Input';
import Button from '../../Button';
import QuantityInput from '../../QuantityInput';
import { capitalizeFirstLetter, sortBy } from '../../helpers';
import { INGREDIENT_TYPES } from '../../constants';

const getMainDishes = (dishes, currentMainDishes, currentId) => {
  const sideDishes = dishes
    .filter(({ id, types: sideType }) => !sideType.includes('SIDE') && !currentMainDishes.includes(id) && id !== currentId);
  return sortBy(sideDishes, 'name', 'alphabetical');
};

function DishFormInputs({ currentData, setCurrentData, showIngredients }) {
  const { ingredients: contextIngredients, dishes } = useContext(MainContext);
  const [selectedIngredientType, setSelectedIngredientType] = useState('OTHER');
  const {
    id, name, types, sideDishTo, ingredients, servings, time: { hours, minutes } = {},
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
  const handleAddMainDish = ({ target: { value: eValue } }) => {
    setCurrentData({ ...currentData, sideDishTo: [...sideDishTo, eValue] });
  };

  const handleRemoveMainDish = (idToCheck) => {
    setCurrentData({
      ...currentData,
      sideDishTo: sideDishTo.filter((sideDishId) => sideDishId !== idToCheck),
    });
  };

  const handleTimeChange = (e) => {
    const { target: { value: eValue, name: eName } } = e;
    const {
      time,
    } = currentData;

    setCurrentData({ ...currentData, time: { ...time, [eName]: eValue } });
  };

  const toggleType = ({ target: { value: eValue } }) => {
    if (eValue === 'SIDE') return setCurrentData({ ...currentData, types: [eValue] });
    const newTypes = types.includes(eValue)
      ? types.filter((type) => type !== eValue) : [...types, eValue].filter((type) => type !== 'SIDE');
    return setCurrentData({ ...currentData, types: newTypes });
  };

  const handleIncrease = () => {
    setCurrentData({ ...currentData, servings: servings + 1 });
  };
  const handleDecrease = () => {
    setCurrentData({ ...currentData, servings: servings - 1 });
  };

  const selectedIngredientids = ingredients.map(({ id: iId }) => iId);
  const filteredIngredientOptions = contextIngredients
    .filter(({ id: iId, type }) => !selectedIngredientids
      .includes(iId) && type === selectedIngredientType);

  const sortedIngredients = sortBy(filteredIngredientOptions, 'name', 'alphabetical');
  const sortedMainDishes = getMainDishes(dishes, sideDishTo, id);

  if (showIngredients) {
    return (
      <div className="form-inputs dish-inputs">
        <div className="ingredients-group-container">
          <div className="ingredients-options-container">
            {INGREDIENT_TYPES
              .map(({ value, name: uName }) => (
                <Button
                  key={value}
                  modifier={value === selectedIngredientType ? '' : 'not-selected'}
                  name="ingredient-type"
                  value={value}
                  buttonText={uName}
                  onClick={(e) => setSelectedIngredientType(e.target.value)}
                />
              ))}
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
          {/* <div className="ingredients-options-container">
          {sortedIngredients
            .map(({ id: ingredientId, name: uName }) => (
              <Button
                key={uName}
                name="ingredient"
                value={ingredientId}
                buttonText={capitalizeFirstLetter(uName)}
                onClick={handleAddIngredient}
              />
            ))}
          {!sortedIngredients.length && <div>So empty...</div>}
        </div> */}
        </div>
        <IngredientsField
          ingredients={ingredients}
          handleIngredientChange={handleIngredientChange}
          handleRemoveIngredient={handleRemoveIngredient}
        />
      </div>
    );
  }
  return (
    <div className="form-inputs dish-inputs">
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
      {/* <Input
        value=""
        name="ingredients"
        id="ingredients"
        onChange={handleAddIngredient}
        placeholder="Add ingredient"
        selectOptions={sortedIngredients}
        type="select"
      /> */}

      {types.includes('SIDE') && (
      <div className="side-dishes-container">
        <Input
          value=""
          name="side-dishes"
          id="side-dishes"
          onChange={handleAddMainDish}
          placeholder="Add main dish"
          selectOptions={sortedMainDishes}
          label="Side dish to"
          type="select"
        />
        {!!sideDishTo.length && (
        <div className="ingredients-options-container">
          {sideDishTo.map((sideDishId) => {
            const { name: sideDishName } = dishes
              .find(({ id: sideId }) => sideDishId === sideId) || {};
            return (
              <div className="form-side-dish" key={sideDishId}>
                <Button
                  modifier="form-side-dish-remove"
                  aria-label={`remove-${sideDishId}`}
                  type="button"
                  value={sideDishId}
                  buttonText={capitalizeFirstLetter(sideDishName)}
                >
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => handleRemoveMainDish(sideDishId)}
                  />
                </Button>
              </div>
            );
          })}
        </div>
        )}
      </div>
      )}
      {/* <Input
        id="description"
        name="description"
        label="Description"
        value={currentData.description}
        onChange={handleOnChange}
        placeholder="Dish description..."
        type="textarea"
      /> */}
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
  showIngredients: PropTypes.bool.isRequired,
  currentData: PropTypes.shape(),

};

DishFormInputs.defaultProps = {
  currentData: {},
};

export default DishFormInputs;
