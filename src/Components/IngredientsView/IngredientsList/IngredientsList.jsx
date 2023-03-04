import React from 'react';
import { INGREDIENTS } from '../../constants/INGREDIENTS';
import Ingredient from './Ingredient';
import './IngredientsList.css';

function IngredientsList() {
  const ingredients = Object.keys(INGREDIENTS).map((key) => INGREDIENTS[key]);

  return (
    <div className="ingredients-list">
      {ingredients.map(({ label, type }) => <Ingredient key={`${label}-${type}`} label={label} type={type} />)}
    </div>
  );
}

export default IngredientsList;
