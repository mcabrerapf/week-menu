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
export const onCreateDish = /* GraphQL */ `
  subscription OnCreateDish($filter: ModelSubscriptionDishFilterInput) {
    onCreateDish(filter: $filter) {
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
export const onUpdateDish = /* GraphQL */ `
  subscription OnUpdateDish($filter: ModelSubscriptionDishFilterInput) {
    onUpdateDish(filter: $filter) {
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
export const onDeleteDish = /* GraphQL */ `
  subscription OnDeleteDish($filter: ModelSubscriptionDishFilterInput) {
    onDeleteDish(filter: $filter) {
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
export const onCreateMenu = /* GraphQL */ `
  subscription OnCreateMenu($filter: ModelSubscriptionMenuFilterInput) {
    onCreateMenu(filter: $filter) {
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
export const onUpdateMenu = /* GraphQL */ `
  subscription OnUpdateMenu($filter: ModelSubscriptionMenuFilterInput) {
    onUpdateMenu(filter: $filter) {
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
export const onDeleteMenu = /* GraphQL */ `
  subscription OnDeleteMenu($filter: ModelSubscriptionMenuFilterInput) {
    onDeleteMenu(filter: $filter) {
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
export const onCreateDishIngredient = /* GraphQL */ `
  subscription OnCreateDishIngredient(
    $filter: ModelSubscriptionDishIngredientFilterInput
    $owner: String
  ) {
    onCreateDishIngredient(filter: $filter, owner: $owner) {
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
export const onUpdateDishIngredient = /* GraphQL */ `
  subscription OnUpdateDishIngredient(
    $filter: ModelSubscriptionDishIngredientFilterInput
    $owner: String
  ) {
    onUpdateDishIngredient(filter: $filter, owner: $owner) {
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
export const onDeleteDishIngredient = /* GraphQL */ `
  subscription OnDeleteDishIngredient(
    $filter: ModelSubscriptionDishIngredientFilterInput
    $owner: String
  ) {
    onDeleteDishIngredient(filter: $filter, owner: $owner) {
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
export const onCreateDishMenu = /* GraphQL */ `
  subscription OnCreateDishMenu($filter: ModelSubscriptionDishMenuFilterInput) {
    onCreateDishMenu(filter: $filter) {
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
export const onUpdateDishMenu = /* GraphQL */ `
  subscription OnUpdateDishMenu($filter: ModelSubscriptionDishMenuFilterInput) {
    onUpdateDishMenu(filter: $filter) {
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
export const onDeleteDishMenu = /* GraphQL */ `
  subscription OnDeleteDishMenu($filter: ModelSubscriptionDishMenuFilterInput) {
    onDeleteDishMenu(filter: $filter) {
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
