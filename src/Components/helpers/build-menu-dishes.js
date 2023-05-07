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

const getMaxDishes = (dishes, type, filters) => {
  const { limit, days } = filters;
  if (limit === 0) return [];
  const dayIndexes = [];
  days.forEach(({
    hasBreakfast, hasLunch, hasDinner,
  }, index) => {
    switch (type) {
      case 'BREAKFAST':
        if (hasBreakfast) dayIndexes.push(index);
        break;
      case 'LUNCH':
        if (hasLunch) dayIndexes.push(index);
        break;
      case 'DINNER':
        if (hasDinner) dayIndexes.push(index);
        break;
      default:
        break;
    }
  });

  const finalDishes = [];
  for (finalDishes.length; finalDishes.length < limit;) {
    if (!dishes.find(({ types }) => !!types && types.includes(type))) break;
    const rIndex = generateRandomNumber(0, dishes.length);
    const randomDish = dishes[rIndex];

    if (randomDish.types && !randomDish.types.includes('SIDE') && randomDish.types.includes(type)) {
      const [dishMatch] = dishes.splice(rIndex, 1);
      const finalDish = populateSideDishes(dishMatch, dishes);
      finalDishes.push({ ...finalDish, useAs: type });
    }
  }
  if (!finalDishes.length) return finalDishes;
  let dishCount = 0;
  dayIndexes.forEach((day) => {
    if (dishCount >= limit) dishCount = 0;
    finalDishes[dishCount].days.push(day);
    dishCount += 1;
  });

  return finalDishes;
};

const buildMenuDishes = (dishes, options) => {
  const {
    maxLunches, maxDinners, maxBreakfasts, days,
  } = options;

  const dishesCopy = deepCopy(dishes);
  const breakfasts = getMaxDishes(dishesCopy, 'BREAKFAST', { limit: maxBreakfasts, days });
  const lunches = getMaxDishes(dishesCopy, 'LUNCH', { limit: maxLunches, days });
  const dinners = getMaxDishes(dishesCopy, 'DINNER', { limit: maxDinners, days });
  const finalDishes = [...breakfasts, ...lunches, ...dinners];
  return finalDishes;
};

export default buildMenuDishes;
