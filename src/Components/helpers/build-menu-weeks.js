/* eslint-disable max-len */
import { BREAKFAST_STRING, DINNER_STRING, LUNCH_STRING } from '../../constants';
import deepCopy from './deep-copy';
import generateRandomNumber from './generate-random-number';

const DISH_TYPES = [BREAKFAST_STRING, LUNCH_STRING, DINNER_STRING];

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
  return { ...finalDish, useAs: type };
};

const buildDishesByType = (dishes, type, filters) => {
  const { limit, days } = filters;
  const dayIndexes = [];
  const finalDishes = [];
  if (limit === 0) return dayIndexes;

  days.forEach((day, index) => {
    switch (type) {
      case DISH_TYPES[0]:
        if (day[0]) dayIndexes.push(index);
        break;
      case DISH_TYPES[1]:
        if (day[1]) dayIndexes.push(index);
        break;
      case DISH_TYPES[2]:
        if (day[2]) dayIndexes.push(index);
        break;
      default:
        break;
    }
  });
  if (!dayIndexes.length) return [];

  for (let index = 0; index < limit; index += 1) {
    const randomDish = getRandomDishByType(type, dishes);
    let currentLimit = limit;
    const dishDays = [dayIndexes[index]];
    while (currentLimit < dayIndexes.length) {
      const extraDay = dayIndexes[index + currentLimit];
      if (extraDay)dishDays.push(extraDay);
      currentLimit += limit;
    }
    randomDish.days = dishDays;
    finalDishes.push(randomDish);
  }

  return finalDishes;
};

const buildMenuWeeks = (dishes, options) => {
  const {
    weeks,
  } = options;

  const builtWeeks = [];
  weeks.forEach((week) => {
    const {
      mealLimits, days,
    } = week;
    const maxDishes = {
      [DISH_TYPES[0]]: mealLimits[0],
      [DISH_TYPES[1]]: mealLimits[1],
      [DISH_TYPES[2]]: mealLimits[2],
    };
    const dishesCopy = deepCopy(dishes);
    const weekDishes = DISH_TYPES
      .map((dishType) => buildDishesByType(
        dishesCopy,
        dishType,
        { limit: maxDishes[dishType], days },
      ))
      .flat();
    builtWeeks.push({ dishes: weekDishes });
  });

  return builtWeeks;
};

export default buildMenuWeeks;
