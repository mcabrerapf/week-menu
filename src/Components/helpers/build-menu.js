import generateRandomNumber from './generate-random-number';

const iterateOver = (max, list, offset, type) => {
  const idsToCheck = [];
  let currentIndex = offset;
  let iterations = 0;
  for (currentIndex; currentIndex > 0; currentIndex -= 1) {
    const currentDay = list[currentIndex - 1];
    iterations += 1;
    if (iterations === max) return idsToCheck;
    const { lunch, dinner } = currentDay;
    const dishesToCheck = type === 'LUNCH' ? lunch : dinner;
    dishesToCheck.forEach(({ id }) => idsToCheck.push(id));
  }
  return idsToCheck;
};
const buildDayMeal = (dishes, type) => {
  const dishesToUse = dishes.filter(({ type: typeToCheck }) => type === typeToCheck);
  const dishIndex = generateRandomNumber(0, dishesToUse.length);
  return [dishesToUse[dishIndex]];
};

const getUniqueDishes = (dayIndex, days, dishes, options) => {
  const { maxLunches, maxDinners } = options;
  const lunchIds = iterateOver(maxLunches, days, dayIndex, 'LUNCH');
  const dinnerIds = iterateOver(maxDinners, days, dayIndex, 'DINNER');
  const allIds = [...lunchIds, ...dinnerIds];
  const uniqueDishes = dishes.filter(({ id }) => !allIds.includes(id));
  return uniqueDishes;
};

const buildDay = (day, currentIndex, finalDays, dishes, options) => {
  const {
    name, checked, hasLunch, hasDinner,
  } = day;

  const newDay = {
    name, breakfast: [], lunch: [], dinner: [], dessert: [],
  };
  if (!checked) return newDay;
  if (currentIndex === 0) {
    if (hasLunch)newDay.lunch = buildDayMeal(dishes, 'LUNCH');
    if (hasDinner)newDay.dinner = buildDayMeal(dishes, 'DINNER');
    return newDay;
  }
  const uniqueDishes = getUniqueDishes(currentIndex, finalDays, dishes, options);
  if (hasLunch)newDay.lunch = buildDayMeal(uniqueDishes, 'LUNCH');
  if (hasDinner)newDay.dinner = buildDayMeal(uniqueDishes, 'DINNER');
  return newDay;
};

const buildDays = (dishes, options) => {
  const {
    days,
  } = options;

  const finalDays = [];

  days.forEach((day, index) => {
    const newDay = buildDay(day, index, finalDays, dishes, options);
    finalDays.push(newDay);
  });

  return finalDays;
};

const buildIngredientSections = (dishes) => {
  const ingredientSections = {};

  dishes.forEach((dish) => {
    const { ingredients } = dish;
    ingredients.forEach((ingredient) => {
      const {
        id, type, quantity,
      } = ingredient;
      const ingredientWithDish = { ...ingredient, dishes: [dish] };

      if (!ingredientSections[type]) {
        ingredientSections[type] = [ingredientWithDish];
      } else {
        const hasCurrentIngredient = !!ingredientSections[type]
          .find(({ id: idToCheck }, i) => {
            if (idToCheck === id) {
              const ingMatch = ingredientSections[type][i];
              const updatedQuantity = ingMatch.quantity + quantity;
              const updatedDishes = [...ingMatch.dishes, dish];
              const updatedIngredient = {
                ...ingMatch,
                quantity: updatedQuantity,
                dishes: updatedDishes,
              };
              ingredientSections[type][i] = updatedIngredient;
              return true;
            }
            return false;
          });

        if (!hasCurrentIngredient) ingredientSections[type].push(ingredientWithDish);
      }
    });
  });
  return ingredientSections;
};

const getMaxDishes = (dishes, type, filters) => {
  const { limit } = filters;
  const finalDishes = [];

  for (finalDishes.length; finalDishes.length < limit;) {
    const rIndex = generateRandomNumber(0, dishes.length);
    const randomDish = dishes[rIndex];

    if (randomDish.type === type) {
      const [dishMatch] = dishes.splice(rIndex, 1);
      finalDishes.push(dishMatch);
    }
  }
  return finalDishes;
};

const buildMenu = (dishes, options) => {
  const {
    maxLunches, maxDinners,
  } = options;
  const lunches = getMaxDishes(dishes, 'LUNCH', { limit: maxLunches });
  const dinners = getMaxDishes(dishes, 'DINNER', { limit: maxDinners });
  const finalDishes = [...lunches, ...dinners];
  const ingredientSections = buildIngredientSections(finalDishes);
  const finalDays = buildDays(finalDishes, options);

  return [finalDays, ingredientSections];
};

export default buildMenu;
