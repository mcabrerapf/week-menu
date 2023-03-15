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
  console.log({ type, limit, daysForDishes });
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
    if (dishCount === limit) dishCount = 0;
    finalDishes[dishCount].days.push(day);
    dishCount += 1;
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
