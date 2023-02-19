import { DISH_TYPES, DAYS } from '../constants';

const generateRandom = (min = 0, max = 100) => {
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand += min;
  return rand;
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
      const newDish = allDishes[randomIndex];
      chosenIndexes.push(randomIndex);
      dishes.push(newDish);
      lunchCount += 1;
    }
  }
  return dishes;
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const buildWeekPlan = (dishes) => {
  const dishesCopy = [...dishes];
  const chosenIndexes = [];
  const weekDishes = [];
  const finalLunches = buildDishes(DISH_TYPES.dinner, dishesCopy, chosenIndexes);
  const finalDinners = buildDishes(DISH_TYPES.lunch, dishesCopy, chosenIndexes);

  finalDinners.forEach((d, i) => {
    weekDishes[i] = [finalLunches[i], finalDinners[i]];
  });

  const finalWeekPlan = [
    { label: DAYS[0], meals: [finalLunches[0], finalDinners[0]] },
    { label: DAYS[1], meals: [finalLunches[1], finalDinners[1]] },
    { label: DAYS[2], meals: [finalLunches[2], finalDinners[2]] },
    { label: DAYS[3], meals: [finalLunches[0], finalDinners[0]] },
    { label: DAYS[4], meals: [finalLunches[1], finalDinners[1]] },
    { label: DAYS[5], meals: [finalLunches[2], finalDinners[2]] },
  ];
  return finalWeekPlan;
};
export { capitalizeFirstLetter, buildWeekPlan };
