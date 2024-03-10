/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getIngredient = /* GraphQL */ `
  query GetIngredient($id: ID!) {
    getIngredient(id: $id) {
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
export const listIngredients = /* GraphQL */ `
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getDish = /* GraphQL */ `
  query GetDish($id: ID!) {
    getDish(id: $id) {
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
export const listDishes = /* GraphQL */ `
  query ListDishes(
    $filter: ModelDishFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDishes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getMenu = /* GraphQL */ `
  query GetMenu($id: ID!) {
    getMenu(id: $id) {
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
export const listMenus = /* GraphQL */ `
  query ListMenus(
    $filter: ModelMenuFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMenus(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
