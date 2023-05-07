const checkAndAddIngredient = (dish, parsedIngredients, people) => {
  const { ingredients, name: dishName } = dish;
  const servings = dish.servings || 1;
  ingredients.forEach((ingredient) => {
    const {
      id, unit, quantity,
    } = ingredient;
    const parsedQuantity = (people * quantity) / servings;
    const parsedDishes = [dishName];
    const ingredientMatch = !!parsedIngredients.find((pIngredient, i) => {
      const { id: matchId, unit: matchUnit, dishes: pDishes } = pIngredient || {};
      if (matchId === id && matchUnit === unit) {
        // eslint-disable-next-line no-param-reassign
        parsedIngredients[i].quantity += parsedQuantity;
        const hasDish = !!pDishes.find((pDish) => pDish === dishName);
        if (!hasDish) parsedIngredients[i].dishes.push(dishName);
        return true;
      }
      return false;
    });
    if (!ingredientMatch) {
      parsedIngredients
        .push({ ...ingredient, dishes: parsedDishes, quantity: parsedQuantity });
    }
  });
};

const buildIngredientSections = (dishes, people = 1) => {
  const ingredientSections = {};
  const parsedIngredients = [];
  dishes.forEach((dish) => {
    checkAndAddIngredient(dish, parsedIngredients, people);
    const { sideDishesToUse } = dish;
    if (!!sideDishesToUse && !!sideDishesToUse.length) {
      sideDishesToUse
        .forEach((sideDish) => checkAndAddIngredient(sideDish, parsedIngredients, people));
    }
  });

  parsedIngredients.forEach((pIngredient) => {
    const { type: pType, quantity: pQuantity } = pIngredient;

    const roundedQuantity = pQuantity.toFixed(1);
    const splitQuantity = roundedQuantity.split('.');
    const finalQuantity = splitQuantity[1] === '0' ? splitQuantity[0] : splitQuantity.join('.');
    const finalIngredient = { ...pIngredient, quantity: finalQuantity, checked: false };
    if (ingredientSections[pType]) {
      ingredientSections[pType].push(finalIngredient);
    } else {
      ingredientSections[pType] = [finalIngredient];
    }
  });

  return ingredientSections;
};

export default buildIngredientSections;
