import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { MainContextProvider } from './MainContext';
import { serviceHandler } from '../../Services';
import {
  DISH_STRING,
  GET_ALL_STRING,
  INGREDIENT_STRING,
  MENU_STRING,
  MENU_BUILDER_STRING,
  DELETE_STRING,
  UPDATE_STRING,
  CREATE_STRING,
} from '../../constants';
import { buildDishesWithIngredients, buildMenusWithDishes, sortBy } from '../../Components/helpers';
import { defaultMenuOptions } from '../../Components/MenuBuilderView/Week/constants';
import { ToastContext } from '../ToastContext';

function MainContextWrapper({ children }) {
  const { addToast } = useContext(ToastContext);
  const [contextState, setContextState] = useState({
    view: DISH_STRING,
    offlineMode: 0,
    currentMenu: { menuOptions: defaultMenuOptions, menuDishes: [] },
    menus: [],
    dishes: [],
    ingredients: [],
    errorMessage: null,
  });
  const { errorMessage } = contextState;

  useEffect(() => {
    async function initContext() {
      const localOfflineMode = Number(window.localStorage.getItem('week-menu-offline-mode'));
      const allIngredients = await serviceHandler(GET_ALL_STRING)(INGREDIENT_STRING);
      if (allIngredients.errors) {
        return setContextState({ ...contextState, errorMessage: allIngredients.errors[0].message });
      }
      const allDishes = await serviceHandler(GET_ALL_STRING)(DISH_STRING);

      if (allDishes.errors) {
        return setContextState({ ...contextState, errorMessage: allDishes.errors[0].message });
      }

      const allMenus = await serviceHandler(GET_ALL_STRING)(MENU_STRING);
      if (allMenus.errors) {
        return setContextState({ ...contextState, errorMessage: allMenus.errors[0].message });
      }

      const dishesWithIngredients = buildDishesWithIngredients(allDishes, allIngredients);
      const menusWithDishes = buildMenusWithDishes(allMenus, dishesWithIngredients);

      return setContextState({
        ...contextState,
        offlineMode: localOfflineMode,
        ingredients: sortBy(allIngredients, 'name', 'alphabetical'),
        dishes: sortBy(dishesWithIngredients, 'name', 'alphabetical'),
        menus: sortBy(menusWithDishes, 'name', 'alphabetical'),
      });
    }

    initContext();
  }, []);

  useEffect(() => {
    if (errorMessage) addToast(errorMessage, 'error');
  }, [errorMessage]);

  const getListAndKey = (key, data) => {
    const {
      ingredients, dishes,
    } = contextState;
    switch (key) {
      case DISH_STRING:
        return [buildDishesWithIngredients(data, ingredients), `${key}es`];
      case MENU_STRING:
        return [buildMenusWithDishes(data, dishes), `${key}s`];

      default:
        return [data, `${key}s`];
    }
  };

  const updateList = async (listToUpdate) => {
    const newData = await serviceHandler(GET_ALL_STRING)(listToUpdate);
    if (newData.errors) {
      addToast(newData.errors, 'error');
      return;
    }
    const [updatedList, listKey] = getListAndKey(listToUpdate, newData);
    setContextState({
      ...contextState,
      [listKey]: sortBy(updatedList, 'name', 'alphabetical'),
    });
  };

  const updateCurrentMenu = (newMenu) => {
    setContextState({ ...contextState, currentMenu: newMenu, view: MENU_BUILDER_STRING });
  };

  const stateHandler = (key, value) => {
    setContextState({ ...contextState, [key]: value });
  };

  const handleSave = async (data, serviceName) => {
    const serviceString = data.id ? UPDATE_STRING : CREATE_STRING;
    const serviceToUse = serviceHandler(serviceString);
    const response = await serviceToUse(serviceName, data);
    if (response.errors) {
      addToast(response.errors[0], 'error');
      return null;
    }
    addToast(data.name, 'success');
    await updateList(serviceName);
    return response;
  };

  const handleDelete = async (id, name, serviceName) => {
    const serviceToUse = serviceHandler(DELETE_STRING);
    const response = await serviceToUse(serviceName, { id });
    if (response.errors) {
      addToast(response.errors[0], 'error');
      return;
    }
    addToast(name, 'delete');
    await updateList(serviceName);
  };

  return (
    <MainContextProvider value={{
      ...contextState,
      setContextState: stateHandler,
      updateList,
      updateCurrentMenu,
      handleDelete,
      handleSave,
    }}
    >
      {children}
    </MainContextProvider>
  );
}

MainContextWrapper.propTypes = {
  children: PropTypes
    .oneOfType([PropTypes.shape(), PropTypes.arrayOf(PropTypes.shape())]).isRequired,
};

export default MainContextWrapper;
