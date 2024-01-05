/* eslint-disable max-len */
import { DAY_DISH_TYPES } from '../constants';
import deepCopy from './deep-copy';
import generateRandomNumber from './generate-random-number';

const populateSideDishes = (dish, dishes) => {
  const { id } = dish;
  const sideDishes = dishes
    .filter(({ sideDishTo }) => !!sideDishTo && !!sideDishTo
      .filter((sideId) => sideId === id).length);

  if (!sideDishes || !sideDishes.length) return { ...dish, sideDishesToUse: [], days: [] };
  const rIndex = generateRandomNumber(0, sideDishes.length);
  const randomSideDish = sideDishes[rIndex];

  return { ...dish, days: [], sideDishesToUse: [randomSideDish] };
};

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
  const meals = getMealsByType(dishesCopy, mealLimits);
  const mealCounters = [0, 0, 0];

  const builtDays = days.map((day) => {
    const builtDay = day
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

    return builtDay;
  });
  return ({ days: builtDays, people, mealLimits });
};

const buildMenu = (dishes, options) => {
  const {
    weeks,
  } = options;

  const builtWeeks = weeks
    .map((week) => buildWeek(week, dishes));

  return builtWeeks;
};

export default buildMenu;
