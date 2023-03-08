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
export const createDish = /* GraphQL */ `
  mutation CreateDish(
    $input: CreateDishInput!
    $condition: ModelDishConditionInput
  ) {
    createDish(input: $input, condition: $condition) {
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
export const updateDish = /* GraphQL */ `
  mutation UpdateDish(
    $input: UpdateDishInput!
    $condition: ModelDishConditionInput
  ) {
    updateDish(input: $input, condition: $condition) {
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
export const deleteDish = /* GraphQL */ `
  mutation DeleteDish(
    $input: DeleteDishInput!
    $condition: ModelDishConditionInput
  ) {
    deleteDish(input: $input, condition: $condition) {
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
export const createMenu = /* GraphQL */ `
  mutation CreateMenu(
    $input: CreateMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    createMenu(input: $input, condition: $condition) {
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
export const updateMenu = /* GraphQL */ `
  mutation UpdateMenu(
    $input: UpdateMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    updateMenu(input: $input, condition: $condition) {
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
export const deleteMenu = /* GraphQL */ `
  mutation DeleteMenu(
    $input: DeleteMenuInput!
    $condition: ModelMenuConditionInput
  ) {
    deleteMenu(input: $input, condition: $condition) {
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
export const createDishIngredient = /* GraphQL */ `
  mutation CreateDishIngredient(
    $input: CreateDishIngredientInput!
    $condition: ModelDishIngredientConditionInput
  ) {
    createDishIngredient(input: $input, condition: $condition) {
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
export const updateDishIngredient = /* GraphQL */ `
  mutation UpdateDishIngredient(
    $input: UpdateDishIngredientInput!
    $condition: ModelDishIngredientConditionInput
  ) {
    updateDishIngredient(input: $input, condition: $condition) {
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
export const deleteDishIngredient = /* GraphQL */ `
  mutation DeleteDishIngredient(
    $input: DeleteDishIngredientInput!
    $condition: ModelDishIngredientConditionInput
  ) {
    deleteDishIngredient(input: $input, condition: $condition) {
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
export const createDishMenu = /* GraphQL */ `
  mutation CreateDishMenu(
    $input: CreateDishMenuInput!
    $condition: ModelDishMenuConditionInput
  ) {
    createDishMenu(input: $input, condition: $condition) {
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
export const updateDishMenu = /* GraphQL */ `
  mutation UpdateDishMenu(
    $input: UpdateDishMenuInput!
    $condition: ModelDishMenuConditionInput
  ) {
    updateDishMenu(input: $input, condition: $condition) {
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
export const deleteDishMenu = /* GraphQL */ `
  mutation DeleteDishMenu(
    $input: DeleteDishMenuInput!
    $condition: ModelDishMenuConditionInput
  ) {
    deleteDishMenu(input: $input, condition: $condition) {
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
