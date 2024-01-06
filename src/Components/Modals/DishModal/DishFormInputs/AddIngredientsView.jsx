/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DishFormInputs.css';
import { INGREDIENT_TYPES } from '../../../../constants/INGREDIENT';
import Button from '../../../Button';
import Icon from '../../../Icon';
import Input from '../../../Input';
import { filterIngredinents } from './helpers';

function AddIngredientsView({
  ingredients, selectedIngredients, setIngredientsView, updateIngredients,
}) {
  const [selectedType, setSelectedType] = useState('');
  const [searchValue, setSearchValue] = useState('');

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
      <div className="col gap-10">
        <div className="row gap-5">
          <Input
            type="search"
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
        <div className="row centered wrap gap-5">
          <Button
            modifier="l"
            fakeDisabled={selectedType !== ''}
            buttonText="All"
            onClick={() => setSelectedType('')}
          />
          {INGREDIENT_TYPES
            .map(({ value }) => (
              <Button
                key={value}
                value={value}
                modifier="l"
                fakeDisabled={selectedType !== value}
                onClick={() => setSelectedType(value)}
              >
                <Icon iconName={value} />
              </Button>
            ))}

        </div>
        <div className="ingredient-options row centered wrap overflow-y gap-5">
          {ingredientOptions.map((ingredientOption) => {
            const isSelected = !!selectedIngredients.find(({ id }) => id === ingredientOption.id);
            return (
              <Button
                key={ingredientOption.id}
                value={ingredientOption.id}
                modifier="w-a"
                fakeDisabled={!isSelected}
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
