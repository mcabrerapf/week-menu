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
