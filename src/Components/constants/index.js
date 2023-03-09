import { DISHES, DISH_TAGS, DISH_TYPES } from './DISHES';
import { INGREDIENT_UNITS, INGREDIENT_TYPES } from './INGREDIENTS';

const DAYS = [
  ['Monday', 'Mon'],
  ['Tuesday', 'Tue'],
  ['Wednesday', 'Wed'],
  ['Thursday', 'Thu'],
  ['Friday', 'Fri'],
  ['Saturday', 'Sat'],
  ['Sunday', 'Sun'],
];
export const SELECT_OPTIONS = {
  ingredient: {
    type: INGREDIENT_TYPES,
    unit: INGREDIENT_UNITS,
  },
  dish: {
    type: DISH_TYPES,

  },
};

export {
  DAYS, DISHES, DISH_TAGS, DISH_TYPES, INGREDIENT_UNITS, INGREDIENT_TYPES,
};
