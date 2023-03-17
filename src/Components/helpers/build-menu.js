import generateRandomNumber from './generate-random-number';
import buildIngredientSections from './build-ingredient-sections';

const getMaxDishes = (dishes, type, filters) => {
  const { limit, days } = filters;
  if (limit === 0) return [];
  const daysForDishes = [];
  days.forEach(({
    checked, hasBreakfast, hasLunch, hasDinner,
  }, index) => {
    if (checked) {
      switch (type) {
        case 'BREAKFAST':
          if (hasBreakfast) daysForDishes.push(index);
          break;
        case 'LUNCH':
          if (hasLunch) daysForDishes.push(index);
          break;
        case 'DINNER':
          if (hasDinner) daysForDishes.push(index);
          break;
        default:
          break;
      }
    }
    return null;
  });

  const finalDishes = [];
  for (finalDishes.length; finalDishes.length < limit;) {
    const rIndex = generateRandomNumber(0, dishes.length);
    const randomDish = dishes[rIndex];
    if (randomDish.type === type) {
      const [dishMatch] = dishes.splice(rIndex, 1);
      finalDishes.push({ ...dishMatch, useAs: type, days: [] });
    }
  }

  let dishCount = 0;
  daysForDishes.forEach((day) => {
    if (dishCount >= limit) dishCount = 0;
    finalDishes[dishCount].days.push(day);
    dishCount += 1;
  });

  return finalDishes;
};

const buildMenu = (dishes, options) => {
  const {
    maxLunches, maxDinners, maxBreakfasts, days,
  } = options;
  const dishesCopy = [...dishes];
  const breakfasts = getMaxDishes(dishesCopy, 'BREAKFAST', { limit: maxBreakfasts, days });
  const lunches = getMaxDishes(dishesCopy, 'LUNCH', { limit: maxLunches, days });
  const dinners = getMaxDishes(dishesCopy, 'DINNER', { limit: maxDinners, days });
  const finalDishes = [...breakfasts, ...lunches, ...dinners];
  const ingredientSections = buildIngredientSections(finalDishes);

  return [finalDishes, ingredientSections];
};

export default buildMenu;
