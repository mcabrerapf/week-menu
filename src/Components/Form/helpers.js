import { DISH_STRING } from '../../constants';
import { deepCopy } from '../helpers';

export const initDish = (dishData) => {
  const {
    name, ingredients, types, instructions, description, time, servings,
  } = dishData;
  const { hours, minutes } = time || {};

  return {
    name: name || '',
    // type: type || '',
    types: types || [],
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

export const initFormData = (view, data) => {
  const copiedData = deepCopy(data);

  switch (view) {
    case DISH_STRING:
      return initDish(copiedData);

    default:
      return initIngredient(copiedData);
  }
};

export const checkIsButtonDisabled = (view, data) => {
  const {
    name, type, types, unit, ingredients,
  } = data;
  if (view === DISH_STRING) return !name || !types.length || !ingredients || !ingredients.length;
  return !name || !type || !unit;
};
