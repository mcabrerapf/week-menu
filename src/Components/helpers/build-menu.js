import generateRandomNumber from './generate-random-number';
import buildIngredientSections from './build-ingredient-sections';

const getMaxDishes = (dishes, type, filters) => {
  const { limit, days } = filters;
  const daysForDishes = days.map(({
    checked, hasBreakfast, hasLunch, hasDinner,
  }, index) => {
    if (checked) {
      switch (type) {
        case 'BREAKFAST':
          return hasBreakfast && index;
        case 'LUNCH':
          return hasLunch && index;
        case 'DINNER':
          return hasDinner && index;
        default:
          return null;
      }
    }
    return null;
  }).filter((day) => day !== null);

  const finalDishes = [];

  for (finalDishes.length; finalDishes.length < limit;) {
    const rIndex = generateRandomNumber(0, dishes.length);
    const randomDish = dishes[rIndex];
    if (randomDish.type === type) {
      const [dishMatch] = dishes.splice(rIndex, 1);
      finalDishes.push({ ...dishMatch, useAs: type, days: [] });
    }
  }
  daysForDishes.forEach((day) => {
    const dishIndex = day >= limit ? day - limit : day;
    finalDishes[dishIndex].days.push(day);
  });

  return finalDishes;
};

const buildMenu = (dishes, options) => {
  const {
    maxLunches, maxDinners, days,
  } = options;

  const lunches = getMaxDishes(dishes, 'LUNCH', { limit: maxLunches, days });
  const dinners = getMaxDishes(dishes, 'DINNER', { limit: maxDinners, days });
  const finalDishes = [...lunches, ...dinners];
  const ingredientSections = buildIngredientSections(finalDishes);

  return [finalDishes, ingredientSections];
};

export default buildMenu;
