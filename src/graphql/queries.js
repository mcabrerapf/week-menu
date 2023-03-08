/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getIngredient = /* GraphQL */ `
  query GetIngredient($id: ID!) {
    getIngredient(id: $id) {
      id
      name
      type
      unit
      Menus {
        items {
          id
          ingredientId
          dishId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
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
        Menus {
          nextToken
        }
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
      type
      tags
      size
      time
      description
      instructions
      Ingredients {
        items {
          id
          ingredientId
          dishId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      Menus {
        items {
          id
          dishId
          menuId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
        type
        tags
        size
        time
        ingredients
        description
        instructions
        Ingredients {
          nextToken
        }
        Menus {
          nextToken
        }
        createdAt
        updatedAt
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
      Dishes {
        items {
          id
          dishId
          menuId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
        Dishes {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDishIngredient = /* GraphQL */ `
  query GetDishIngredient($id: ID!) {
    getDishIngredient(id: $id) {
      id
      ingredientId
      dishId
      ingredient {
        id
        name
        type
        unit
        Menus {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      dish {
        id
        name
        type
        tags
        size
        time
        description
        instructions
        Ingredients {
          nextToken
        }
        Menus {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listDishIngredients = /* GraphQL */ `
  query ListDishIngredients(
    $filter: ModelDishIngredientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDishIngredients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ingredientId
        dishId
        ingredient {
          id
          name
          type
          unit
          createdAt
          updatedAt
          owner
        }
        dish {
          id
          name
          type
          tags
          size
          time
          description
          instructions
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const dishIngredientsByIngredientId = /* GraphQL */ `
  query DishIngredientsByIngredientId(
    $ingredientId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDishIngredientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    dishIngredientsByIngredientId(
      ingredientId: $ingredientId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ingredientId
        dishId
        ingredient {
          id
          name
          type
          unit
          createdAt
          updatedAt
          owner
        }
        dish {
          id
          name
          type
          tags
          size
          time
          description
          instructions
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const dishIngredientsByDishId = /* GraphQL */ `
  query DishIngredientsByDishId(
    $dishId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDishIngredientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    dishIngredientsByDishId(
      dishId: $dishId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ingredientId
        dishId
        ingredient {
          id
          name
          type
          unit
          createdAt
          updatedAt
          owner
        }
        dish {
          id
          name
          type
          tags
          size
          time
          description
          instructions
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getDishMenu = /* GraphQL */ `
  query GetDishMenu($id: ID!) {
    getDishMenu(id: $id) {
      id
      dishId
      menuId
      dish {
        id
        name
        type
        tags
        size
        time
        description
        instructions
        Ingredients {
          nextToken
        }
        Menus {
          nextToken
        }
        createdAt
        updatedAt
      }
      menu {
        id
        name
        favourite
        Dishes {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listDishMenus = /* GraphQL */ `
  query ListDishMenus(
    $filter: ModelDishMenuFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDishMenus(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dishId
        menuId
        dish {
          id
          name
          type
          tags
          size
          time
          description
          instructions
          createdAt
          updatedAt
        }
        menu {
          id
          name
          favourite
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const dishMenusByDishId = /* GraphQL */ `
  query DishMenusByDishId(
    $dishId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDishMenuFilterInput
    $limit: Int
    $nextToken: String
  ) {
    dishMenusByDishId(
      dishId: $dishId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        dishId
        menuId
        dish {
          id
          name
          type
          tags
          size
          time
          description
          instructions
          createdAt
          updatedAt
        }
        menu {
          id
          name
          favourite
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const dishMenusByMenuId = /* GraphQL */ `
  query DishMenusByMenuId(
    $menuId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDishMenuFilterInput
    $limit: Int
    $nextToken: String
  ) {
    dishMenusByMenuId(
      menuId: $menuId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        dishId
        menuId
        dish {
          id
          name
          type
          tags
          size
          time
          description
          instructions
          createdAt
          updatedAt
        }
        menu {
          id
          name
          favourite
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
