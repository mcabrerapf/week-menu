/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createIngredient = /* GraphQL */ `
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
      owner
    }
  }
`;
export const updateIngredient = /* GraphQL */ `
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
      owner
    }
  }
`;
export const deleteIngredient = /* GraphQL */ `
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
      owner
    }
  }
`;
export const createDish = /* GraphQL */ `
  mutation CreateDish(
    $input: CreateDishInput!
    $condition: ModelDishConditionInput
  ) {
    createDish(input: $input, condition: $condition) {
      id
      name
      types
      servings
      size
      time {
        hours
        minutes
      }
      description
      instructions
      ingredients {
        id
        quantity
        unit
        name
        type
      }
      tags
      sideDishes
      sideDishTo
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateDish = /* GraphQL */ `
  mutation UpdateDish(
    $input: UpdateDishInput!
    $condition: ModelDishConditionInput
  ) {
    updateDish(input: $input, condition: $condition) {
      id
      name
      types
      servings
      size
      time {
        hours
        minutes
      }
      description
      instructions
      ingredients {
        id
        quantity
        unit
        name
        type
      }
      tags
      sideDishes
      sideDishTo
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteDish = /* GraphQL */ `
  mutation DeleteDish(
    $input: DeleteDishInput!
    $condition: ModelDishConditionInput
  ) {
    deleteDish(input: $input, condition: $condition) {
      id
      name
      types
      servings
      size
      time {
        hours
        minutes
      }
      description
      instructions
      ingredients {
        id
        quantity
        unit
        name
        type
      }
      tags
      sideDishes
      sideDishTo
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createMenu = /* GraphQL */ `
  mutation CreateMenu(
    $input: CreateMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    createMenu(input: $input, condition: $condition) {
      id
      name
      favourite
      dishes {
        id
        days
        useAs
        sideDishesToUse
      }
      description
      tags
      dessert
      snacks
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateMenu = /* GraphQL */ `
  mutation UpdateMenu(
    $input: UpdateMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    updateMenu(input: $input, condition: $condition) {
      id
      name
      favourite
      dishes {
        id
        days
        useAs
        sideDishesToUse
      }
      description
      tags
      dessert
      snacks
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteMenu = /* GraphQL */ `
  mutation DeleteMenu(
    $input: DeleteMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    deleteMenu(input: $input, condition: $condition) {
      id
      name
      favourite
      dishes {
        id
        days
        useAs
        sideDishesToUse
      }
      description
      tags
      dessert
      snacks
      createdAt
      updatedAt
      owner
    }
  }
`;
