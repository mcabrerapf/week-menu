import { DISH_STRING, MENU_STRING } from '../../constants';
import { deepCopy } from '../helpers';
import DishFormInputs from './DishFormInputs';
import IngredientFormInputs from './IngredientFormInputs';
import MenuFormInputs from './MenuFormInputs';

const checkIngredients = (ingredients) => {
  if (!ingredients || !ingredients.length) return [];
  return ingredients.filter(({
    name, unit, type,
  }) => name && unit && type);
};

export const initDish = (dishData) => {
  const {
    id, name, ingredients, types, sideDishes, sideDishTo, instructions, description, time, servings,
  } = dishData;
  const { hours, minutes } = time || {};

  const dish = {
    name: name || '',
    // type: type || '',
    types: types || [],
    sideDishes: sideDishes || [],
    sideDishTo: sideDishTo || [],
    time: {
      hours: hours || 0,
      minutes: minutes || 0,
    },
    ingredients: checkIngredients(ingredients),
    servings: servings || 1,
    // size: size || '',
    instructions: instructions || '',
    description: description || '',
  };

  return id ? { ...dish, id } : dish;
};

export const initIngredient = ({
  id, name, unit, type,
}) => {
  const ingredient = {
    name: name || '',
    type: type || '',
    unit: unit || '',
  };
  return id ? { ...ingredient, id } : ingredient;
};

export const initMenu = ({
  id, name, dishes, favourite,
}) => {
  const menu = {
    name: name || '',
    dishes: dishes || [],
    favourite: favourite || false,
  };

  return id ? { ...menu, id } : menu;
};

export const initFormData = (view, data) => {
  const copiedData = deepCopy(data);

  switch (view) {
    case DISH_STRING:
      return initDish(copiedData);
    case MENU_STRING:
      return initMenu(copiedData);
    default:
      return initIngredient(copiedData);
  }
};

export const checkIsButtonDisabled = (view, data) => {
  const {
    name, type, types, unit, ingredients,
  } = data;
  if (view === MENU_STRING) return !name;
  if (view === DISH_STRING) return !name || !types.length || !ingredients || !ingredients.length;
  return !name || !type || !unit;
};

export const getFormInputs = (type) => {
  switch (type) {
    case MENU_STRING:
      return MenuFormInputs;
    case DISH_STRING:
      return DishFormInputs;
    default:
      return IngredientFormInputs;
  }
};
