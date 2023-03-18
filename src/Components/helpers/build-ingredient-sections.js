const buildIngredientSections = (dishes, people) => {
  const ingredientSections = {};
  const parsedIngredients = [];
  dishes.forEach((dish) => {
    const { ingredients, name: dishName, servings = 1 } = dish;
    ingredients.forEach((ingredient) => {
      const {
        id, unit, quantity,
      } = ingredient;
      const parsedQuantity = (people * quantity) / servings;
      const parsedDishes = [dishName];
      const ingredientMatch = !!parsedIngredients.find((pIngredient, i) => {
        const { id: pId, unit: pUnit, dishes: pDishes } = pIngredient || {};
        if (pId === id && pUnit === unit) {
          parsedIngredients[i].quantity += parsedQuantity;
          const hasDish = !!pDishes.find((pDish) => pDish === dishName);
          if (!hasDish) parsedIngredients[i].dishes.push(dishName);
          return true;
        }
        return false;
      });
      if (!ingredientMatch) {
        parsedIngredients
          .push({ ...ingredient, dishes: parsedDishes, quantity: quantity + parsedQuantity });
      }
    });
  });

  parsedIngredients.forEach((pIngredient) => {
    const { type: pType } = pIngredient;
    if (ingredientSections[pType]) {
      ingredientSections[pType].push(pIngredient);
    } else {
      ingredientSections[pType] = [pIngredient];
    }
  });

  return ingredientSections;
};

export default buildIngredientSections;
