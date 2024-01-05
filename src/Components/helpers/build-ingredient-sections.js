import { INGREDIENT_TYPES } from '../constants';

const getSectionIngredients = (sectionName, days, people) => {
  const sectionIngredients = [];
  days.forEach((day) => {
    day.forEach((dish) => {
      if (!dish) return;
      const {
        ingredients, servings, name: dishName, id: dishId,
      } = dish;
      ingredients.forEach((ingredient) => {
        if (!ingredient) return;
        const {
          id, type, unit, quantity,
        } = ingredient;
        if (type !== sectionName) return;
        const multi = people / servings;
        const parsedQuantity = quantity * multi;
        let ingredientIndex = -1;
        sectionIngredients
          .forEach((sectionIngredient, index) => {
            if (sectionIngredient
        && sectionIngredient.id === id
        && sectionIngredient.unit === unit)ingredientIndex = index;
          });
        const ingredientDish = {
          id: dishId, name: dishName, quantity: parsedQuantity, unit,
        };

        if (ingredientIndex === -1) {
          sectionIngredients
            .push({
              ...ingredient, quantity: parsedQuantity, checked: false, dishes: [ingredientDish],
            });
        } else {
          const ingredientDishes = sectionIngredients[ingredientIndex].dishes;
          let updatedDish = false;
          ingredientDishes.forEach((iDish, index) => {
            if (iDish.id === ingredientDish.id) {
              updatedDish = true;
              ingredientDishes[index].quantity += parsedQuantity;
            }
          });
          if (!updatedDish) ingredientDishes.push(ingredientDish);
          sectionIngredients[ingredientIndex] = {
            ...sectionIngredients[ingredientIndex],
            checked: false,
            quantity: sectionIngredients[ingredientIndex].quantity + parsedQuantity,
            dishes: ingredientDishes,
          };
        }
      });
    });
  });
  return sectionIngredients;
};

const buildIngredientSections = (week) => {
  const { days, people } = week;
  return INGREDIENT_TYPES.map(({ value, name }) => {
    const sectionIngredients = getSectionIngredients(value, days, people);
    return { value, name, ingredients: sectionIngredients };
  });
};

export default buildIngredientSections;
