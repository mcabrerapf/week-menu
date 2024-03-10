import { BREAKFAST_STRING, DINNER_STRING, LUNCH_STRING } from './STRINGS';

const DAYS = [
  ['Monday', 'Mon', 'MON'],
  ['Tuesday', 'Tue', 'TUE'],
  ['Wednesday', 'Wed', 'WED'],
  ['Thursday', 'Thu', 'THU'],
  ['Friday', 'Fri', 'FRI'],
  ['Saturday', 'Sat', 'SAT'],
  ['Sunday', 'Sun', 'SUN'],
];

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
  filters: {
    ingredientTypes: [],
    ingredients: [],
    dishes: [],
  },
};
const DAY_DISH_TYPES = [BREAKFAST_STRING, LUNCH_STRING, DINNER_STRING];

export {
  DAYS, DEFAULT_DAY_MEALS, DEFAULT_WEEK_SETTINGS, DEFAULT_MENU_OPTIONS, DAY_DISH_TYPES,
};
