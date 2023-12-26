/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DishFormInputs.css';
import { INGREDIENT_TYPES } from '../../../constants';
import Button from '../../../Button';
import { PlusIcon, SaveIcon } from '../../../Icons';
import Input from '../../../Input';
import { filterIngredinents } from './helpers';

function AddIngredientsView({
  ingredients, selectedIngredients, setIngredientsView, updateIngredients,
}) {
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchValue, setSearchValue] = useState('');
  const [currentIngredients, setCurrentIngredients] = useState(selectedIngredients);

  const handleTypeSelect = (e) => {
    setSelectedType(e.target.value);
  };

  const handleIngredientSelect = (ingredientId, isSelected) => {
    const ingMatch = ingredients.find((ingredient) => ingredientId === ingredient.id);
    const updatedIngredients = isSelected
      ? currentIngredients.filter(({ id }) => id !== ingredientId)
      : [
        ...currentIngredients,
        { ...ingMatch, quantity: 1 }];
    setCurrentIngredients(updatedIngredients);
  };

  const handleUpdateIngredients = () => {
    const updatedIngredients = currentIngredients
      .map((ingredient) => {
        const { id: ingredientId } = ingredient;
        const ingMatch = selectedIngredients.find(({ id }) => id === ingredientId);
        if (ingMatch) return ingMatch;
        return {
          ...ingredient,
          quantity: 1,
        };
      });

    updateIngredients(updatedIngredients);
    setIngredientsView(0);
  };

  const ingredientOptions = filterIngredinents(ingredients, selectedType, searchValue);
  return (
    <>
      <div className="add-ingredients-content">
        <div className="add-ingredients-actions">
          <Input
            type="search"
            modifier="list-search-filter"
            value={searchValue}
            id="search-value"
            name="search-value"
            placeholder="🔍"
            onChange={({ target: { value } }) => setSearchValue(value)}
          />
          <Button
            value="ALL"
            modifier="square icon-only"
            onClick={() => setIngredientsView(2)}
          >
            <PlusIcon />
          </Button>
        </div>
        <div className="ingredients-types-container ingredient-types border-bottom">
          <Button
            value="ALL"
            modifier={selectedType !== 'ALL' && 'disabled'}
            buttonText="All"
            onClick={handleTypeSelect}
          />
          {INGREDIENT_TYPES
            .map(({ value, name: uName }) => (
              <Button
                key={value}
                value={value}
                modifier={selectedType !== value && 'disabled'}
                buttonText={uName}
                onClick={handleTypeSelect}
              />
            ))}

        </div>
        <div className="ingredients-types-container">
          {ingredientOptions.map((ingredientOption) => {
            const isSelected = !!currentIngredients.find(({ id }) => id === ingredientOption.id);
            return (
              <Button
                key={ingredientOption.id}
                value={ingredientOption.id}
                modifier={!isSelected && 'disabled'}
                buttonText={ingredientOption.name}
                onClick={() => handleIngredientSelect(ingredientOption.id, isSelected)}
              />
            );
          })}
        </div>
      </div>

      <Button modifier="icon-only" onClick={handleUpdateIngredients}>
        <SaveIcon />
      </Button>
    </>
  );
}

AddIngredientsView.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedIngredients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setIngredientsView: PropTypes.func.isRequired,
  updateIngredients: PropTypes.func.isRequired,

};

export default AddIngredientsView;
