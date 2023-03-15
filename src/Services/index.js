import { fetchData } from './helpers';
import {
  CREATE_INGREDIENT_MUTATION,
  DELETE_INGREDIENT_MUTATION,
  UPDATE_INGREDIENT_MUTATION,
  CREATE_DISH_MUTATION,
  DELETE_DISH_MUTATION,
  UPDATE_DISH_MUTATION,
  CREATE_MENU_MUTATION,
  UPDATE_MENU_MUTATION,
  DELETE_MENU_MUTATION,
} from './mutations';
import {
  GET_INGREDIENT_QUERY,
  GET_ALL_INGREDIENTS_QUERY,
  GET_DISH_QUERY,
  GET_ALL_DISHES_QUERY,
  GET_MENU_QUERY,
  GET_ALL_MENUS_QUERY,
} from './querys';
import { offlineServices } from './offlineservices';

const getQueryMatch = {
  ingredient: {
    get: [GET_INGREDIENT_QUERY, 'getIngredient'],
    create: [CREATE_INGREDIENT_MUTATION, 'createIngredient'],
    update: [UPDATE_INGREDIENT_MUTATION, 'updateIngredient'],
    delete: [DELETE_INGREDIENT_MUTATION, 'deleteIngredient'],
    getAll: [GET_ALL_INGREDIENTS_QUERY, 'listIngredients-items'],
  },
  dish: {
    get: [GET_DISH_QUERY, 'getDish'],
    create: [CREATE_DISH_MUTATION, 'createDish'],
    update: [UPDATE_DISH_MUTATION, 'updateDish'],
    delete: [DELETE_DISH_MUTATION, 'deleteDish'],
    getAll: [GET_ALL_DISHES_QUERY, 'listDishes-items'],
  },
  menu: {
    get: [GET_MENU_QUERY, 'getMenu'],
    create: [CREATE_MENU_MUTATION, 'createMenu'],
    update: [UPDATE_MENU_MUTATION, 'updateMenu'],
    delete: [DELETE_MENU_MUTATION, 'deleteMenu'],
    getAll: [GET_ALL_MENUS_QUERY, 'listMenus-items'],
  },
};

export const handleGet = async (name, input) => {
  const [query, dataKeys] = getQueryMatch[name].get;
  return fetchData(
    { query, variables: { input } },
    dataKeys,
  );
};

export const handleCreate = async (name, input) => {
  const [query, dataKeys] = getQueryMatch[name].create;
  return fetchData(
    { query, variables: { input } },
    dataKeys,
  );
};

export const handleUpdate = async (name, input) => {
  const [query, dataKeys] = getQueryMatch[name].update;
  return fetchData(
    { query, variables: { input } },
    dataKeys,
  );
};

export const handleDelete = async (name, input) => {
  const [query, dataKeys] = getQueryMatch[name].delete;
  return fetchData(
    { query, variables: { input } },
    dataKeys,
  );
};

export const handleGetAll = async (name) => {
  const [query, dataKeys] = getQueryMatch[name].getAll;
  return fetchData(
    { query },
    dataKeys,
  );
};

export const services = {
  get: handleGet,
  create: handleCreate,
  update: handleUpdate,
  delete: handleDelete,
  getAll: handleGetAll,
};

export function serviceHandler(action) {
  const currentMode = window.localStorage.getItem('week-menu-offline-mode', 1);
  const isOffline = currentMode === '0';
  const servicesToUse = isOffline ? offlineServices : services;
  if (!action || !servicesToUse[action]) {
    console.log('No actions found for ', action);
    return () => {};
  }
  return servicesToUse[action];
}
