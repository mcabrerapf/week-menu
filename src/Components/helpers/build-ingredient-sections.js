import { INGREDIENT_TYPES } from '../constants';

const getSectionIngredients = (sectionName, dishes, people) => {
  const sectionIngredients = [];
  dishes.forEach((dish) => {
    const { servings, days } = dish;

    dish?.ingredients.forEach((ingredient) => {
      const {
        id, type, unit, quantity,
      } = ingredient;
      if (type !== sectionName) return;
      const dishRepeats = days.length;
      const weekServings = dishRepeats * people;
      const multi = weekServings / servings;
      const parsedQuantity = quantity * multi;
      let ingredientIndex = -1;
      sectionIngredients
        .forEach((sectionIngredient, index) => {
          if (sectionIngredient
            && sectionIngredient.id === id
            && sectionIngredient.unit === unit)ingredientIndex = index;
        });
      const ingredientDish = { name: dish.name, quantity: parsedQuantity, unit };
      if (ingredientIndex === -1) {
        sectionIngredients
          .push({
            ...ingredient, quantity: parsedQuantity, checked: false, dishes: [ingredientDish],
          });
      } else {
        sectionIngredients[ingredientIndex] = {
          ...sectionIngredients[ingredientIndex],
          checked: false,
          quantity: sectionIngredients[ingredientIndex].quantity + parsedQuantity,
          dishes: [...sectionIngredients[ingredientIndex].dishes, ingredientDish],
        };
      }
    });
  });
  return sectionIngredients;
};

const buildIngredientSections = (dishes, people = 1) => {
  const sections = INGREDIENT_TYPES.map(({ value }) => {
    const sectionIngredients = getSectionIngredients(value, dishes, people);
    return { name: value, ingredients: sectionIngredients };
  });

  return sections;
};

export default buildIngredientSections;
