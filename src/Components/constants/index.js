import { DISH_TAGS, DISH_TYPES } from './DISHES';
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
const SELECT_OPTIONS = {
  ingredient: {
    type: INGREDIENT_TYPES,
    unit: INGREDIENT_UNITS,
  },
  dish: {
    type: DISH_TYPES,

  },
};

const minSwipeDistance = 50;

export {
  DAYS, DISH_TAGS, DISH_TYPES, INGREDIENT_UNITS, INGREDIENT_TYPES, SELECT_OPTIONS, minSwipeDistance,
};
