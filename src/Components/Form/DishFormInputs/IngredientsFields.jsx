/* eslint-disable no-restricted-globals */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './DishFormInputs.css';
import { MainContext } from '../../../Contexts/MainContext';
import IngredientsField from './IngredientsField';
import Input from '../../Input';
import Button from '../../Button';
import { sortBy } from '../../helpers';
import { INGREDIENT_TYPES } from '../../constants';

function IngredientsFields({ ingredients, updateIngredients }) {
  const { ingredients: contextIngredients } = useContext(MainContext);
  const [selectedIngredientType, setSelectedIngredientType] = useState('OTHER');

  const handleAddIngredient = ({ target: { value: eValue } }) => {
    if (!eValue) return;
    if (ingredients.find(({ id: ingId }) => ingId === eValue)) return;
    const { unit, name: iName } = contextIngredients
      .find(({ id: ingId }) => ingId === eValue) || {};
    const updatedIngredients = [...ingredients, {
      id: eValue, name: iName, quantity: 1, unit,
    }];
    updateIngredients(updatedIngredients);
  };

  const handleRemoveIngredient = (ingredientId) => {
    const updatedIngredients = ingredients
      .filter(({ id: currentId }) => ingredientId !== currentId);
    updateIngredients(updatedIngredients);
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
    updateIngredients(updatedIngredients);
  };

  const selectedIngredientids = ingredients.map(({ id: iId }) => iId);
  const filteredIngredientOptions = contextIngredients
    .filter(({ id: iId, type }) => !selectedIngredientids
      .includes(iId) && type === selectedIngredientType);

  const sortedIngredients = sortBy(filteredIngredientOptions, 'name', 'alphabetical');

  return (
    <>
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
      </div>
      <IngredientsField
        ingredients={ingredients}
        handleIngredientChange={handleIngredientChange}
        handleRemoveIngredient={handleRemoveIngredient}
      />
    </>
  );
}

IngredientsFields.propTypes = {
  updateIngredients: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape()),

};

IngredientsFields.defaultProps = {
  ingredients: [],
};

export default IngredientsFields;
