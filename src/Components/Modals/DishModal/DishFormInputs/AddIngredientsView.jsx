/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DishFormInputs.css';
import { INGREDIENT_TYPES } from '../../../constants';
import Button from '../../../Button';
import Icon from '../../../Icon';
import Input from '../../../Input';
import { filterIngredinents } from './helpers';

function AddIngredientsView({
  ingredients, selectedIngredients, setIngredientsView, updateIngredients,
}) {
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchValue, setSearchValue] = useState('');

  const handleTypeSelect = (e) => {
    setSelectedType(e.target.value);
  };

  const handleIngredientSelect = (ingredientId, isSelected) => {
    const ingMatch = ingredients.find((ingredient) => ingredientId === ingredient.id);
    const updatedIngredients = isSelected
      ? selectedIngredients.filter(({ id }) => id !== ingredientId)
      : [
        ...selectedIngredients,
        { ...ingMatch, quantity: 1 }];
    updateIngredients(updatedIngredients);
  };

  const handleUpdateIngredients = () => {
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
            modifier="m icon"
            onClick={() => setIngredientsView(2)}
          >
            <Icon iconName="plus" />
          </Button>
        </div>
        <div className="ingredients-types-container ingredient-types border-b">
          <Button
            value="ALL"
            modifier={selectedType === 'ALL' ? '' : 'bgc-gr'}
            buttonText="All"
            onClick={handleTypeSelect}
          />
          {INGREDIENT_TYPES
            .map(({ value, name: uName }) => (
              <Button
                key={value}
                value={value}
                modifier={selectedType !== value && 'bgc-gr'}
                buttonText={uName}
                onClick={handleTypeSelect}
              />
            ))}

        </div>
        <div className="ingredients-types-container">
          {ingredientOptions.map((ingredientOption) => {
            const isSelected = !!selectedIngredients.find(({ id }) => id === ingredientOption.id);
            return (
              <Button
                key={ingredientOption.id}
                value={ingredientOption.id}
                modifier={isSelected ? '' : 'bgc-gr'}
                buttonText={ingredientOption.name}
                onClick={() => handleIngredientSelect(ingredientOption.id, isSelected)}
              />
            );
          })}
        </div>
      </div>

      <Button modifier="icon" onClick={handleUpdateIngredients}>
        <Icon iconName="save" />
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
