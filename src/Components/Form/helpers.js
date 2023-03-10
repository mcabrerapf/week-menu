import { DISH_STRING } from '../../constants';

export const initDish = ({
  name, ingredients, type, instructions, description,
}) => ({
  name: name || '',
  type: type || '',
  // time: time || '',
  ingredients: ingredients || [],
  // size: size || '',
  instructions: instructions || '',
  description: description || '',
});

export const initIngredient = ({
  name, unit, type,
}) => ({
  name: name || '',
  type: type || '',
  unit: unit || '',
});

export const checkIsButtonDisabled = (view, data) => {
  const {
    name, type, unit, ingredients,
  } = data;
  if (view === DISH_STRING) return !name || !type || !ingredients;
  return !name || !type || !unit;
};
