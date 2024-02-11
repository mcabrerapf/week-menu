/* eslint-disable max-len */
import { DAY_DISH_TYPES } from '../../constants/MENU';
import { BREAKFAST_STRING, DINNER_STRING, LUNCH_STRING } from '../../constants/STRINGS';
import deepCopy from './deep-copy';
import generateRandomNumber from './generate-random-number';

// TODO finish sidedishes bit
const populateSideDishes = (dish) => ({ ...dish, sideDishesToUse: [] });

const getRandomDishByType = (type, dishes) => {
  let foundDish;
  while (!foundDish) {
    const rIndex = generateRandomNumber(0, dishes.length);
    const randomDish = dishes[rIndex];
    if (randomDish.types.includes(type)) {
      [foundDish] = dishes.splice(rIndex, 1);
    }
  }

  const finalDish = populateSideDishes(foundDish, dishes);
  return finalDish;
};

const getMealsByType = (dishes, mealLimits) => DAY_DISH_TYPES
  .map((type, typeIndex) => {
    const typeDishes = [];
    for (let index = 0; index < mealLimits[typeIndex]; index += 1) {
      const randomDish = getRandomDishByType(type, dishes);
      typeDishes.push(randomDish);
    }
    return typeDishes;
  });

const buildWeek = (week, dishes) => {
  const {
    mealLimits, days, people,
  } = week;
  const dishesCopy = deepCopy(dishes);
  const allBreakfasts = dishesCopy.filter(({ types }) => types.includes(BREAKFAST_STRING));
  const allLunches = dishesCopy.filter(({ types }) => types.includes(LUNCH_STRING));
  const allDinners = dishesCopy.filter(({ types }) => types.includes(DINNER_STRING));
  const validatedMealLimits = [
    mealLimits[0] > allBreakfasts.length ? allBreakfasts.length : mealLimits[0],
    mealLimits[1] > allLunches.length ? allLunches.length : mealLimits[1],
    mealLimits[2] > allDinners.length ? allDinners.length : mealLimits[2],
  ];

  const meals = getMealsByType(dishesCopy, validatedMealLimits);
  const mealCounters = [0, 0, 0];

  const builtDays = days.map((day) => {
    const dayDishes = day
      .map((needsDish, mealIndex) => {
        if (!needsDish) return null;
        const mealOptions = meals[mealIndex];
        // eslint-disable-next-line no-unused-expressions
        let mealToUse = mealOptions[mealCounters[mealIndex]];
        if (mealToUse) mealCounters[mealIndex] += 1;
        else {
          mealCounters[mealIndex] = 1;
          [mealToUse] = mealOptions;
        }
        return mealToUse;
      });

    return { dishes: dayDishes };
  });
  return ({ days: builtDays, people, validatedMealLimits });
};

const filterDishes = (dishes, filters) => {
  const {
    ingredientTypes,
    ingredients: ingredientIds,
    dishes: dishIds,
  } = filters;
  return dishes.filter(({
    ingredients, id,
  }) => {
    if (!ingredients.length) return false;
    const ingredientMatch = !!ingredients
      .find(({ id: iId, type }) => !!ingredientTypes.includes(type) || !!ingredientIds.includes(iId));
    if (ingredientMatch) return false;
    const dishMatch = !!dishIds.includes(id);
    return !dishMatch;
  });
};

const buildMenu = (dishes, options) => {
  const {
    weeks,
    filters,
  } = options;
  const filteredDishes = filterDishes(dishes, filters);

  const builtWeeks = weeks
    .map((week) => buildWeek(week, filteredDishes));

  return builtWeeks;
};

export default buildMenu;
