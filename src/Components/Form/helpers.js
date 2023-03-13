import { DISH_STRING } from '../../constants';

export const initDish = (dishData, ingredientsData) => {
  const {
    name, ingredients = [], type, instructions, description,
  } = dishData;
  const ingredientsWithData = ingredients.map(({ id, quantity, unit }) => {
    const ingredientMatch = ingredientsData.find(({ id: idToCheck }) => idToCheck === id);
    const { name: ingredientName, unit: defaultUnit, type: ingredientType } = ingredientMatch || {};

    return {
      id, name: ingredientName, unit: unit || defaultUnit, type: ingredientType, quantity,
    };
  });

  return {
    name: name || '',
    type: type || '',
    // time: time || '',
    ingredients: ingredientsWithData || [],
    // size: size || '',
    instructions: instructions || '',
    description: description || '',
  };
};

export const initIngredient = ({
  name, unit, type,
}) => ({
  name: name || '',
  type: type || '',
  unit: unit || '',
});

export const checkIsButtonDisabled = (view, data) => {
  const {
    name, type, unit, ingredients,
  } = data;
  if (view === DISH_STRING) return !name || !type || !ingredients;
  return !name || !type || !unit;
};
