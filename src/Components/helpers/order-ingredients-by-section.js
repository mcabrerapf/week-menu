import { INGREDIENT_TYPES } from '../../constants/INGREDIENT';
import sortBy from './sort-by';

const orderIngredientsBySection = (ingredients) => {
  if (!ingredients || !ingredients.length) return [];

  return INGREDIENT_TYPES
    .map(({ value, name }) => {
      const sectionIngredients = [];
      ingredients.forEach((ingredient) => {
        if (ingredient.type === value)sectionIngredients.push(ingredient);
      });
      if (!sectionIngredients.length) return null;
      return { value, name, ingredients: sortBy(sectionIngredients) };
    })
    .filter(Boolean);
};

export default orderIngredientsBySection;
