import { DISH_TYPES } from './DISH';
import { INGREDIENT_TYPES, INGREDIENT_UNITS } from './INGREDIENT';

const MIN_SWIPE_DISTANCE = 50;

const SELECT_OPTIONS = {
  ingredient: {
    type: INGREDIENT_TYPES,
    unit: INGREDIENT_UNITS,
  },
  dish: {
    type: DISH_TYPES,
  },
};

export { MIN_SWIPE_DISTANCE, SELECT_OPTIONS };
