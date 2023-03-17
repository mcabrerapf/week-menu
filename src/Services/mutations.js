export const CREATE_INGREDIENT_MUTATION = `
  mutation CreateIngredient(
    $input: CreateIngredientInput!
    $condition: ModelIngredientConditionInput
  ) {
    createIngredient(input: $input, condition: $condition) {
      id
      name
      type
      unit
      createdAt
      updatedAt
    }
  }
`;
export const UPDATE_INGREDIENT_MUTATION = `
  mutation UpdateIngredient(
    $input: UpdateIngredientInput!
    $condition: ModelIngredientConditionInput
  ) {
    updateIngredient(input: $input, condition: $condition) {
      id
      name
      type
      unit
      createdAt
      updatedAt
    }
  }
`;
export const DELETE_INGREDIENT_MUTATION = `
  mutation DeleteIngredient(
    $input: DeleteIngredientInput!
    $condition: ModelIngredientConditionInput
  ) {
    deleteIngredient(input: $input, condition: $condition) {
      id
      name
      type
      unit
      createdAt
      updatedAt
    }
  }
`;
export const CREATE_DISH_MUTATION = `
  mutation CreateDish(
    $input: CreateDishInput!
    $condition: ModelDishConditionInput
  ) {
    createDish(input: $input, condition: $condition) {
      id
      name
      type
      size
      servings
      time {
        hours
        minutes
      }
      description
      instructions
      createdAt
      updatedAt
    }
  }
`;
export const UPDATE_DISH_MUTATION = `
  mutation UpdateDish(
    $input: UpdateDishInput!
    $condition: ModelDishConditionInput
  ) {
    updateDish(input: $input, condition: $condition) {
      id
      name
      type
      size
      servings
      time {
        hours
        minutes
      }
      description
      instructions
      createdAt
      updatedAt
    }
  }
`;
export const DELETE_DISH_MUTATION = `
  mutation DeleteDish(
    $input: DeleteDishInput!
    $condition: ModelDishConditionInput
  ) {
    deleteDish(input: $input, condition: $condition) {
      id
    }
  }
`;

export const CREATE_MENU_MUTATION = `
  mutation CreateMenu(
    $input: CreateMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    createMenu(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const UPDATE_MENU_MUTATION = `
  mutation UpdateMenu(
    $input: UpdateMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    updateMenu(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const DELETE_MENU_MUTATION = `
  mutation DeleteMenu(
    $input: DeleteMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    deleteMenu(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
