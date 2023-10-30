export const GET_INGREDIENT_QUERY = `
  query GetIngredient($id: ID!) {
    getIngredient(id: $id) {
      id
      name
      type
      unit
    }
  }
`;

export const GET_ALL_INGREDIENTS_QUERY = `
  query ListIngredients(
    $filter: ModelIngredientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIngredients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        unit
      }
      nextToken
    }
  }
`;

export const GET_DISH_QUERY = `
  query GetDish($id: ID!) {
    getDish(id: $id) {
      id
      name
      sideDishes
      sideDishTo
      ingredients {
        id
        quantity
        unit
      }
      types
      size
      servings
      time {
        hours
        minutes
      }
      description
      instructions
    }
  }
`;

export const GET_ALL_DISHES_QUERY = `
  query ListDishes(
    $filter: ModelDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDishes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        sideDishes
        sideDishTo
        ingredients {
          id
          quantity
          unit
        }
        types
        size
        servings
        time {
          hours
          minutes
        }
        description
        instructions
      }
      nextToken
    }
  }
`;

export const GET_MENU_QUERY = `
  query GetMenu($id: ID!) {
    getMenu(id: $id) {
      id
      name
      favourite
      description
      tags
      snacks 
      dessert 
      dishes {
        id
        days
        useAs
        sideDishesToUse
      }
    }
  }
`;

export const GET_ALL_MENUS_QUERY = `
query ListMenu($filter: ModelMenuFilterInput, $limit: Int, $nextToken: String) {
  listMenus(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      favourite
      description
      tags
      snacks 
      dessert 
      dishes {
        id
        days
        useAs
        sideDishesToUse
      }
    }
    nextToken
  }
}
`;
