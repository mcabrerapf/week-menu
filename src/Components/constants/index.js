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

const DEFAULT_DAY_MEALS = [
  [false, true, true],
  [false, true, true],
  [false, true, true],
  [false, true, true],
  [false, true, true],
  [false, true, true],
  [false, false, false],
];

const DEFAULT_WEEK_SETTINGS = {
  days: DEFAULT_DAY_MEALS,
  people: 2,
  mealLimits: [
    0, // Breakfasts
    3, // Lunches
    3, // Diners
  ],
};

const DEFAULT_MENU_OPTIONS = {
  weeks: [DEFAULT_WEEK_SETTINGS],
  weekLimit: 1,
  // days: DEFAULT_DAY_MEALS,
  // people: 2,
  // mealLimits: [
  //   0, // Breakfasts
  //   3, // Lunches
  //   3, // Diners
  // ],
};

export {
  DAYS,
  DISH_TYPES,
  INGREDIENT_UNITS,
  INGREDIENT_TYPES,
  SELECT_OPTIONS,
  MIN_SWIPE_DISTANCE,
  DEFAULT_MENU_OPTIONS,
  DEFAULT_WEEK_SETTINGS,
};
