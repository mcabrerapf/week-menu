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
        name
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
    $nextToken: String
  ) {
    listDishes(filter: $filter, limit: 999, nextToken: $nextToken) {
      items {
        id
        name
        sideDishes
        sideDishTo
        ingredients {
          id
          quantity
          unit
          name
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
