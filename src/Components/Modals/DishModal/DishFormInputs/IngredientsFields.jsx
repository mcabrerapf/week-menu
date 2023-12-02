/* eslint-disable no-restricted-globals */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './DishFormInputs.css';
import { MainContext } from '../../../../Contexts/MainContext';
import IngredientsField from './IngredientsField';
import Input from '../../../Input';
import { sortBy } from '../../../helpers';
import { INGREDIENT_TYPES } from '../../../constants';
import Button from '../../../Button';
import NewIngredientForm from './NewIngredientForm';

const getIngredientsByType = (availableIngredients, selectedType) => {
  const filteredIngredientOptions = availableIngredients
    .filter(({ type }) => type === selectedType);

  return sortBy(filteredIngredientOptions, 'name', 'alphabetical');
};

function IngredientsFields({ ingredients, updateIngredients }) {
  const { ingredients: contextIngredients } = useContext(MainContext);
  const [ingredientsView, setIngredientsView] = useState(true);

  const handleAddIngredient = ({ target: { value: eValue } }) => {
    if (!eValue) return;
    if (ingredients.find(({ id: ingId }) => ingId === eValue)) return;
    const { unit, name, type } = contextIngredients
      .find(({ id: ingId }) => ingId === eValue) || {};
    const updatedIngredients = [...ingredients, {
      id: eValue, name, unit, type, quantity: 1,
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

  const toggleNewIngredientView = (newIngredient) => {
    setIngredientsView(!ingredientsView);

    if (newIngredient.id) {
      const updatedIngredients = [...ingredients, {
        ...newIngredient, quantity: 1,
      }];
      updateIngredients(updatedIngredients);
    }
  };

  const selectedIngredientids = ingredients.map(({ id: iId }) => iId);
  const availableIngredients = contextIngredients
    .filter(({ id: iId }) => !selectedIngredientids
      .includes(iId));

  return (
    <>
      <div className="ingredients-types-container">
        {ingredientsView && (
        <Button
          modifier="add-ingredient"
          buttonText="New Ingredient"
          onClick={toggleNewIngredientView}
        />
        )}
        {ingredientsView && (
        <Input
          value=""
          name="ingredients"
          id="ingredients"
          onChange={handleAddIngredient}
          placeholder="ALL"
          selectOptions={sortBy(availableIngredients, 'name', 'alphabetical')}
          type="select"
        />
        )}
        {ingredientsView && INGREDIENT_TYPES
          .map(({ value, name: uName }) => (
            <Input
              key={value}
              value=""
              name="ingredients"
              id="ingredients"
              onChange={handleAddIngredient}
              placeholder={uName}
              selectOptions={getIngredientsByType(availableIngredients, value)}
              type="select"
            />
          ))}

      </div>
      {ingredientsView && (
      <IngredientsField
        ingredients={ingredients}
        handleIngredientChange={handleIngredientChange}
        handleRemoveIngredient={handleRemoveIngredient}
      />
      )}
      {!ingredientsView && <NewIngredientForm toggleNewIngredientView={toggleNewIngredientView} />}

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
