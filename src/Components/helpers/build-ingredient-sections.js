const buildIngredientSections = (dishes) => {
  const ingredientSections = {};

  dishes.forEach((dish) => {
    const { ingredients } = dish;
    ingredients.forEach((ingredient) => {
      const {
        id, type, quantity,
      } = ingredient;
      const ingredientWithDish = { ...ingredient, dishes: [dish] };

      if (!ingredientSections[type]) {
        ingredientSections[type] = [ingredientWithDish];
      } else {
        const hasCurrentIngredient = !!ingredientSections[type]
          .find(({ id: idToCheck }, i) => {
            if (idToCheck === id) {
              const ingMatch = ingredientSections[type][i];
              const updatedQuantity = ingMatch.quantity + quantity;
              const updatedDishes = [...ingMatch.dishes, dish];
              const updatedIngredient = {
                ...ingMatch,
                quantity: updatedQuantity,
                dishes: updatedDishes,
              };
              ingredientSections[type][i] = updatedIngredient;
              return true;
            }
            return false;
          });

        if (!hasCurrentIngredient) ingredientSections[type].push(ingredientWithDish);
      }
    });
  });
  return ingredientSections;
};

export default buildIngredientSections;
