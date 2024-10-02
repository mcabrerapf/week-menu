import { INGREDIENT_TYPES } from '../../constants/INGREDIENT';
import filterByKey from './filter-by-key';
import sortBy from './sort-by';

const orderIngredientsBySection = (ingredients) => {
  if (!ingredients || !ingredients.length) return [];
  return INGREDIENT_TYPES
    .map(({ value, name }) => {
      const sectionIngredients = filterByKey(ingredients, 'type', value);
      if (!sectionIngredients.length) return null;
      return { value, name, ingredients: sortBy(sectionIngredients) };
    })
    .filter(Boolean);
};

export default orderIngredientsBySection;
