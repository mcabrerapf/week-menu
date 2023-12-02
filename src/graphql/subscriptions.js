/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateIngredient = /* GraphQL */ `
  subscription OnCreateIngredient(
    $filter: ModelSubscriptionIngredientFilterInput
    $owner: String
  ) {
    onCreateIngredient(filter: $filter, owner: $owner) {
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
export const onUpdateIngredient = /* GraphQL */ `
  subscription OnUpdateIngredient(
    $filter: ModelSubscriptionIngredientFilterInput
    $owner: String
  ) {
    onUpdateIngredient(filter: $filter, owner: $owner) {
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
export const onDeleteIngredient = /* GraphQL */ `
  subscription OnDeleteIngredient(
    $filter: ModelSubscriptionIngredientFilterInput
    $owner: String
  ) {
    onDeleteIngredient(filter: $filter, owner: $owner) {
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
export const onCreateDish = /* GraphQL */ `
  subscription OnCreateDish(
    $filter: ModelSubscriptionDishFilterInput
    $owner: String
  ) {
    onCreateDish(filter: $filter, owner: $owner) {
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
export const onUpdateDish = /* GraphQL */ `
  subscription OnUpdateDish(
    $filter: ModelSubscriptionDishFilterInput
    $owner: String
  ) {
    onUpdateDish(filter: $filter, owner: $owner) {
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
export const onDeleteDish = /* GraphQL */ `
  subscription OnDeleteDish(
    $filter: ModelSubscriptionDishFilterInput
    $owner: String
  ) {
    onDeleteDish(filter: $filter, owner: $owner) {
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
export const onCreateMenu = /* GraphQL */ `
  subscription OnCreateMenu(
    $filter: ModelSubscriptionMenuFilterInput
    $owner: String
  ) {
    onCreateMenu(filter: $filter, owner: $owner) {
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
export const onUpdateMenu = /* GraphQL */ `
  subscription OnUpdateMenu(
    $filter: ModelSubscriptionMenuFilterInput
    $owner: String
  ) {
    onUpdateMenu(filter: $filter, owner: $owner) {
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
export const onDeleteMenu = /* GraphQL */ `
  subscription OnDeleteMenu(
    $filter: ModelSubscriptionMenuFilterInput
    $owner: String
  ) {
    onDeleteMenu(filter: $filter, owner: $owner) {
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
