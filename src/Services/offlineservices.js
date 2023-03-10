import { INGREDIENTS_MOCK, DISHES_MOCK, MENUS_MOCK } from './MOCKS';

const getQueryMatch = {
  ingredient: {
    get: () => {},
    create: () => {},
    update: () => {},
    delete: () => {},
    getAll: INGREDIENTS_MOCK,
  },
  dish: {
    get: () => {},
    create: () => {},
    update: () => {},
    delete: () => {},
    getAll: DISHES_MOCK,
  },
  menu: {
    get: () => {},
    create: () => {},
    update: () => {},
    delete: () => {},
    getAll: MENUS_MOCK,
  },
};

export const handleGet = async (name) => getQueryMatch[name].get;

export const handleCreate = async (name) => getQueryMatch[name].create;

export const handleUpdate = async (name) => getQueryMatch[name].update;

export const handleDelete = async (name) => getQueryMatch[name].delete;

export const handleGetAll = async (name) => getQueryMatch[name].getAll;

export const offlineServices = {
  get: handleGet,
  create: handleCreate,
  update: handleUpdate,
  delete: handleDelete,
  getAll: handleGetAll,
};
