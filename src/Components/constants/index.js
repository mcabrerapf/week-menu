import { DISH_TYPES } from './DISHES';
import { INGREDIENT_UNITS, INGREDIENT_TYPES } from './INGREDIENTS';

const DAYS = [
  ['Monday', 'Mon', 'MON'],
  ['Tuesday', 'Tue', 'TUE'],
  ['Wednesday', 'Wed', 'WED'],
  ['Thursday', 'Thu', 'THU'],
  ['Friday', 'Fri', 'FRI'],
  ['Saturday', 'Sat', 'SAT'],
  ['Sunday', 'Sun', 'SUN'],
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

const MIN_SWIPE_DISTANCE = 50;

export {
  DAYS, DISH_TYPES, INGREDIENT_UNITS, INGREDIENT_TYPES, SELECT_OPTIONS, MIN_SWIPE_DISTANCE,
};
