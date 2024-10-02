import { INGREDIENT_TYPES } from '../../constants/INGREDIENT';
import sortBy from './sort-by';
// TODO optimize
const getSectionIngredients = (sectionName, days, people) => {
  const sectionIngredients = [];
  days.forEach(({ dishes }) => {
    dishes.forEach((dish) => {
      if (!dish) return;
      const {
        ingredients, servings, name: dishName, id: dishId,
      } = dish;
      if (!ingredients || !ingredients.length) return;
      ingredients.forEach((ingredient) => {
        if (!ingredient) return;
        const {
          id, type, unit, quantity,
        } = ingredient;

        if (type !== sectionName) return;

        const multi = people / servings;
        const parsedQuantity = parseFloat((quantity * multi).toFixed(1));

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
  if (!week) return [];
  const { days, people } = week;
  return INGREDIENT_TYPES
    .map(({ value, name }) => {
      if (!days || !days.length) return null;
      const sectionIngredients = getSectionIngredients(value, days, people);
      if (!sectionIngredients.length) return null;
      return { value, name, ingredients: sortBy(sectionIngredients) };
    })
    .filter(Boolean);
};

const buildCollectiveShopingList = (allShopingLists) => INGREDIENT_TYPES
  .map(({ value, name }) => {
    const collectiveIngredients = [];
    allShopingLists.forEach((shopingList) => {
      shopingList.forEach((section) => {
        if (section.value === value) {
          const { ingredients } = section;
          ingredients.forEach((ingredient) => {
            const {
              unit, id, quantity, dishes,
            } = ingredient;
            let ingMatch = false;
            collectiveIngredients.forEach((collectiveIngredient, index) => {
              if (collectiveIngredient.id === id && collectiveIngredient.unit === unit) {
                collectiveIngredients[index] = {
                  ...collectiveIngredient,
                  quantity: collectiveIngredient.quantity + quantity,
                  dishes: [...collectiveIngredient.dishes, ...dishes],
                };
                ingMatch = true;
              }
            });
            if (!ingMatch)collectiveIngredients.push(ingredient);
          });
        }
      });
    });
    if (!collectiveIngredients.length) return null;
    return { value, name, ingredients: sortBy(collectiveIngredients) };
  })
  .filter(Boolean);

const buildShopingLists = (weeks) => {
  if (!weeks || !weeks.length) return [];

  const allShopingLists = weeks.map(buildIngredientSections);
  const collectiveShopingList = buildCollectiveShopingList(allShopingLists);
  allShopingLists.push(collectiveShopingList);

  return allShopingLists;
};

export default buildShopingLists;
