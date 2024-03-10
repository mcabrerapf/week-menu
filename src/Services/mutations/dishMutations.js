export const CREATE_DISH_MUTATION = `
  mutation CreateDish(
    $input: CreateDishInput!
    $condition: ModelDishConditionInput
  ) {
    createDish(input: $input, condition: $condition) {
      id
      name
      types
      size
      servings
      sideDishes
      sideDishTo
      time {
        hours
        minutes
      }
      description
      instructions
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
      types
      size
      servings
      sideDishes
      sideDishTo
      time {
        hours
        minutes
      }
      description
      instructions
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
