const buildDishesWithIngredients = (dishes, allIngredients) => {
  if (!Array.isArray(dishes) || !Array.isArray(allIngredients)) return [];

  return dishes
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
};

export default buildDishesWithIngredients;
