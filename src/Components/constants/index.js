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

const DEFAULT_MENU_OPTIONS = {
  days: [
    {
      name: DAYS[0][2], hasBreakfast: false, hasLunch: true, hasDinner: true,
    },
    {
      name: DAYS[1][2], hasBreakfast: false, hasLunch: true, hasDinner: true,
    },
    {
      name: DAYS[2][2], hasBreakfast: false, hasLunch: true, hasDinner: true,
    },
    {
      name: DAYS[3][2], hasBreakfast: false, hasLunch: true, hasDinner: true,
    },
    {
      name: DAYS[4][2], hasBreakfast: false, hasLunch: true, hasDinner: true,
    },
    {
      name: DAYS[5][2], hasBreakfast: false, hasLunch: true, hasDinner: true,
    },
    {
      name: DAYS[6][2], hasBreakfast: false, hasLunch: true, hasDinner: true,
    },
  ],
  people: 2,
  weeks: 1,
  maxBreakfasts: 0,
  maxLunches: 3,
  maxDinners: 3,
};

export {
  DAYS,
  DISH_TYPES,
  INGREDIENT_UNITS,
  INGREDIENT_TYPES,
  SELECT_OPTIONS,
  MIN_SWIPE_DISTANCE,
  DEFAULT_MENU_OPTIONS,
};
