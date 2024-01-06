import findByKey from './find-by-key';

const buildDishesWithIngredients = (dishes, allIngredients) => {
  if (!Array.isArray(dishes) || !Array.isArray(allIngredients)) return [];

  return dishes
    .map((dish) => {
      const { ingredients, name: dishName } = dish;
      const parsedIngredients = ingredients.map((currentIngredient) => {
        const {
          id: ingredientId, unit, quantity = 1, name, type,
        } = currentIngredient;
        const ingredientMatch = findByKey(allIngredients, ingredientId);
        if (!ingredientMatch) console.log(`${dishName} failed to match: \n ${name} ${ingredientId}`);
        const { name: nameMatch, unit: unitMatch, type: typeMatch } = ingredientMatch || {};
        return {
          id: ingredientId,
          name: name || nameMatch,
          unit: unit || unitMatch,
          type: type || typeMatch,
          quantity,
        };
      }).filter(Boolean);
      return { ...dish, ingredients: parsedIngredients || [] };
    });
};

export default buildDishesWithIngredients;
