const buildDishesWithIngredients = (dishes, allIngredients) => {
  if (!Array.isArray(dishes) || !Array.isArray(allIngredients)) return [];

  return dishes
    .map((dish) => {
      const { ingredients, name: dishName } = dish;
      const parsedIngredients = ingredients.map((currentIngredient) => {
        const {
          id: ingredientId, unit, quantity,
        } = currentIngredient;

        const ingredientMatch = allIngredients
          .find(({ id: idToCheck }) => idToCheck === ingredientId);

        if (!ingredientMatch) {
          console.log(`${dishName} failed to match ${ingredientId} with quantity ${quantity} and unit ${unit}`);
          return null;
        }
        const { name, unit: unitMatch, type } = ingredientMatch;
        return {
          id: ingredientId,
          name,
          unit: unit || unitMatch,
          type,
          quantity,
        };
      }).filter(Boolean);
      return { ...dish, ingredients: parsedIngredients || [] };
    });
};

export default buildDishesWithIngredients;
