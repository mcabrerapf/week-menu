import { DISH_TYPES, DAYS } from '../constants';
import { INGREDIENT_TYPES } from '../constants/INGREDIENTS';

const generateRandom = (min = 0, max = 100) => {
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand += min;
  return rand;
};

const buildIngredientSections = (dishes) => {
  const ingredientSections = {};
  Object.keys(INGREDIENT_TYPES).forEach((key) => {
    const label = INGREDIENT_TYPES[key];
    ingredientSections[label] = [];
  });
  dishes.forEach(({ ingredients, label: dishLabel }) => {
    ingredients.forEach(({ label: currentIngredientLabel, type }) => {
      const currentSection = ingredientSections[type];
      let foundIndex = null;
      const ing = currentSection.find(({ label }, i) => {
        if (label === currentIngredientLabel) {
          foundIndex = i;
          return true;
        }
        return false;
      });
      if (!ing) {
        currentSection
          .push({ label: currentIngredientLabel, dishes: [dishLabel], quantity: 1 });
      } else {
        currentSection[foundIndex].quantity += 1;
        currentSection[foundIndex].dishes = [...currentSection[foundIndex].dishes, dishLabel];
      }
    });
  });
  return ingredientSections;
};

const checkIfShouldAddDish = (index, typeToCheck, dishes, indexes) => {
  const dish = dishes[index];
  if (!dish) return false;
  const { type } = dish;
  const isChosen = !!indexes.find((chosenIndex) => chosenIndex === index);
  return type !== typeToCheck && !isChosen;
};

const buildDishes = (type, allDishes, chosenIndexes) => {
  const dishes = [];
  for (let lunchCount = 0; lunchCount < 3;) {
    const randomIndex = generateRandom(0, allDishes.length);
    const shouldAddDish = checkIfShouldAddDish(randomIndex, type, allDishes, chosenIndexes);
    if (shouldAddDish) {
      const newDish = { ...allDishes[randomIndex] };
      chosenIndexes.push(randomIndex);
      dishes.push(newDish);
      lunchCount += 1;
    }
  }
  return dishes;
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const getIngredientsList = (plan) => {
  const ingredientsList = [];
  if (!plan) return ingredientsList;
  plan.forEach(({ meals }) => {
    meals
      .forEach(({ ingredients }) => ingredients
        .forEach((ingredient) => ingredientsList
          .push(ingredient)));
  });
  return ingredientsList;
};

const buildWeekPlan = (dishes) => {
  const dishesCopy = [...dishes];
  const chosenIndexes = [];
  const weekDishes = [];
  const finalLunches = buildDishes(DISH_TYPES.dinner, dishesCopy, chosenIndexes);
  const finalDinners = buildDishes(DISH_TYPES.lunch, dishesCopy, chosenIndexes);

  finalDinners.forEach((d, i) => {
    weekDishes[i] = [finalLunches[i], finalDinners[i]];
  });
  const ingredientSections = buildIngredientSections([...finalLunches, ...finalDinners]);

  const finalWeekPlan = [
    { label: DAYS[0][1], meals: [finalLunches[0], finalDinners[0]] },
    { label: DAYS[1][1], meals: [finalLunches[1], finalDinners[1]] },
    { label: DAYS[2][1], meals: [finalLunches[2], finalDinners[2]] },
    { label: DAYS[3][1], meals: [finalLunches[0], finalDinners[0]] },
    { label: DAYS[4][1], meals: [finalLunches[1], finalDinners[1]] },
    { label: DAYS[5][1], meals: [finalLunches[2], finalDinners[2]] },
  ];
  return [finalWeekPlan, ingredientSections];
};

const getSectionIngredients = (sectionIngredients, sectionLabel, ingredients) => {
  ingredients.forEach((ingredient) => {
    const { label: currentLabel, type: currentType } = ingredient;
    if (currentType !== sectionLabel) return;
    const isIn = !!sectionIngredients.find((item) => item === currentLabel);
    if (isIn) return;
    sectionIngredients.push(currentLabel);
  });
};

const parseIngredientLabel = (label, i, length, quantity) => {
  const isLast = (i + 1) === length;
  const isFirst = i === 0;
  const parsedQuantity = `(${quantity})`;
  if (isFirst) return `- ${capitalizeFirstLetter(label)}${length > 1 ? ` ${parsedQuantity}, ` : ` ${parsedQuantity}`}`;
  return `${label} ${parsedQuantity}${isLast ? ' ' : ', '}`;
};

export {
  capitalizeFirstLetter,
  buildWeekPlan,
  getIngredientsList,
  getSectionIngredients,
  parseIngredientLabel,
};
