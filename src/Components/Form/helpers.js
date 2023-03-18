import { DISH_STRING } from '../../constants';
import { deepCopy } from '../helpers';

export const initDish = (dishData) => {
  const copiedDish = deepCopy(dishData);
  const {
    name, ingredients = [], type, instructions, description, time, servings,
  } = copiedDish;
  const { hours, minutes } = time || {};

  return {
    name: name || '',
    type: type || '',
    time: {
      hours: hours || 0,
      minutes: minutes || 0,
    },
    ingredients: ingredients || [],
    servings: servings || 1,
    // size: size || '',
    instructions: instructions || '',
    description: description || '',
  };
};

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
  if (view === DISH_STRING) return !name || !type || !ingredients || !ingredients.length;
  return !name || !type || !unit;
};
