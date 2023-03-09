/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { DAYS } from '../constants';
import sortBy from './sort-by';

const generateRandom = (min = 0, max = 100) => {
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand += min;
  return rand;
};

const buildIngredientSections = (ingredients) => {
  const ingredientSections = {};

  ingredients.forEach((ingredient) => {
    const {
      id, name, unit, type, quantity, dishName,
    } = ingredient;
    const currentSection = ingredientSections[type];
    if (!currentSection) {
      ingredientSections[type] = [{
        id, name, unit, quantity, dishNames: [dishName],
      }];
      return;
    }
    let found = false;
    ingredientSections[type] = ingredientSections[type]
      .map((ingredientToCheck) => {
        const { id: idToCheck, quantity: qToAdd, dishNames } = ingredientToCheck;
        const hasBeenAdded = !!dishNames.includes(dishName);
        const updatedDishNames = hasBeenAdded ? dishNames : [...dishNames, dishName];
        const updatedQuantity = quantity + qToAdd;
        if (idToCheck === id) {
          found = true;
          return { ...ingredientToCheck, quantity: updatedQuantity, dishNames: updatedDishNames };
        }
        return ingredientToCheck;
      });
    if (!found) {
      ingredientSections[type].push({
        id, name, unit, quantity, dishNames: [dishName],
      });
    }
  });
  return ingredientSections;
};

const checkIfShouldAddDish = (index, typeToCheck, dishes, indexes) => {
  const dish = dishes[index];
  if (!dish) return [false];
  const { type } = dish;
  const isChosen = !!indexes.find((chosenIndex) => chosenIndex === index);
  return [type === typeToCheck && !isChosen, dish];
};

const buildDishes = (type, allDishes, chosenIndexes) => {
  const dishes = [];
  const dishIngredients = [];
  for (let dishCount = 0; dishCount < 3;) {
    const randomIndex = generateRandom(0, allDishes.length);
    const [
      shouldAddDish,
      newDish,
    ] = checkIfShouldAddDish(randomIndex, type, allDishes, chosenIndexes);
    if (shouldAddDish) {
      const { ingredients, name } = newDish;
      chosenIndexes.push(randomIndex);
      dishes.push(newDish);
      ingredients.forEach((ingredient) => dishIngredients.push({ ...ingredient, dishName: name }));
      dishCount += 1;
    }
  }
  return [dishes, dishIngredients];
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
const buildDishesWithIngredients = (dishes, allIngredients) => dishes
  .map((dish) => {
    const { ingredients } = dish;
    const parsedIngredients = ingredients.map((ingredient) => {
      const {
        id: ingredientId, unit, quantity, type,
      } = ingredient;
      const { name, unit: unitMatch, type: typeMatch } = allIngredients
        .find(({ id: idToCheck }) => idToCheck === ingredientId) || {};
      return {
        id: ingredientId,
        name,
        unit: unit || unitMatch,
        type: type || typeMatch,
        quantity,
      };
    });
    return { ...dish, ingredients: parsedIngredients };
  });

const buildWeekPlan = (dishes, ingredients) => {
  const dishesWithIngredients = buildDishesWithIngredients(dishes, ingredients);
  const chosenIndexes = [];
  const weekDishes = [];
  const [finalLunches, lunchIngredients] = buildDishes('LUNCH', dishesWithIngredients, chosenIndexes);
  const [finalDinners, dinnerIngredients] = buildDishes('DINNER', dishesWithIngredients, chosenIndexes);

  finalDinners.forEach((d, i) => {
    weekDishes[i] = [finalLunches[i], finalDinners[i]];
  });

  const ingredientSections = buildIngredientSections(
    [...lunchIngredients, ...dinnerIngredients],
  );

  const days = [
    { name: DAYS[0][1], lunch: finalLunches[0], dinner: finalDinners[0] },
    { name: DAYS[1][1], lunch: finalLunches[1], dinner: finalDinners[1] },
    { name: DAYS[2][1], lunch: finalLunches[2], dinner: finalDinners[2] },
    { name: DAYS[3][1], lunch: finalLunches[0], dinner: finalDinners[0] },
    { name: DAYS[4][1], lunch: finalLunches[1], dinner: finalDinners[1] },
    { name: DAYS[5][1], lunch: finalLunches[2], dinner: finalDinners[2] },
  ];

  return [days, ingredientSections];
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

const buildSelectOptions = (options, key) => options
  .map(({
    value, id, name, [key]: optionalLabel,
  }) => <option key={id || value} value={id || value}>{optionalLabel || name}</option>);

export {
  capitalizeFirstLetter,
  buildWeekPlan,
  getIngredientsList,
  getSectionIngredients,
  parseIngredientLabel,
  buildSelectOptions,
  sortBy,
};
