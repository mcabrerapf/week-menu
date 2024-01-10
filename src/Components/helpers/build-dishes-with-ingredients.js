import findByKey from './find-by-key';

const buildDishesWithIngredients = (dishes, allIngredients) => {
  if (!Array.isArray(dishes) || !Array.isArray(allIngredients)) return [];

  return dishes
    .map((dish) => {
      const { ingredients, name: dName } = dish;
      const parsedIngredients = ingredients.map((currentIngredient) => {
        const {
          id: iId, name: iName, type, unit, quantity = 1,
        } = currentIngredient;
        const ingredientMatch = findByKey(allIngredients, iId);
        if (!ingredientMatch) console.log(`${dName} failed to match: \n ${iName} => ${iId}`);
        const { name: nameMatch, unit: unitMatch, type: typeMatch } = ingredientMatch || {};
        return {
          id: iId,
          name: iName || nameMatch,
          unit: unit || unitMatch,
          type: type || typeMatch,
          quantity,
        };
      }).filter(Boolean);
      return { ...dish, ingredients: parsedIngredients || [] };
    });
};

export default buildDishesWithIngredients;
