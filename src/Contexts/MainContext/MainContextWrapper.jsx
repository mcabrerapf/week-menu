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
import { buildDishesWithIngredients, buildMenusWithDishes } from '../../Components/helpers';
import './MainContextWrapper.css';
import { defaultMenuOptions } from '../../Components/MenuBuilderView/Week/constants';
import { ToastContext } from '../ToastContext';

function MainContextWrapper({ children }) {
  const { addToast } = useContext(ToastContext);
  const [contextState, setContextState] = useState({
    view: 'dish',
    offlineMode: 0,
    currentMenu: { menuOptions: defaultMenuOptions, menuDishes: [] },
    menus: [],
    dishes: [],
    ingredients: [],
    errorMessage: null,
  });
  const { errorMessage, view } = contextState;

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
        dishes: dishesWithIngredients,
        ingredients: allIngredients,
        menus: menusWithDishes,
      });
    }

    initContext();
  }, []);

  useEffect(() => {
    if (errorMessage) addToast(errorMessage, 'error');
  }, [errorMessage]);

  const updateLists = async (listToUpdate) => {
    const {
      ingredients, dishes, menus,
    } = contextState;
    const listName = listToUpdate || view;
    const viewToUse = view === MENU_BUILDER_STRING ? MENU_STRING : listName;
    const newData = await serviceHandler(GET_ALL_STRING)(viewToUse);
    if (newData.errors) {
      addToast(newData.errors, 'error');
      return;
    }
    const ingredientsToUse = viewToUse === INGREDIENT_STRING ? newData : ingredients;
    const dishesToUse = viewToUse === DISH_STRING ? newData : dishes;
    const menusToUse = viewToUse === MENU_STRING ? newData : menus;
    const dishesWithIngredients = buildDishesWithIngredients(dishesToUse, ingredientsToUse);
    const menusWithDishes = buildMenusWithDishes(menusToUse, dishesWithIngredients);

    setContextState({
      ...contextState,
      dishes: dishesWithIngredients,
      ingredients: ingredientsToUse,
      menus: menusWithDishes,
    });
  };

  const updateCurrentMenu = (newMenu) => {
    setContextState({ ...contextState, currentMenu: newMenu, view: MENU_BUILDER_STRING });
  };

  const stateHandler = (key, value) => {
    setContextState({ ...contextState, [key]: value });
  };

  const handleSave = async (id, name, data, serviceName) => {
    const listName = serviceName || view;
    const viewToUse = view === MENU_BUILDER_STRING ? MENU_STRING : listName;
    const serviceString = id ? UPDATE_STRING : CREATE_STRING;
    const serviceToUse = serviceHandler(serviceString);
    const response = await serviceToUse(viewToUse, data);
    if (response.errors) {
      addToast(response.errors[0], 'error');
      return null;
    }
    addToast(name, 'success');
    await updateLists(viewToUse);
    return response;
  };

  const handleDelete = async (id, name) => {
    const viewToUse = view === MENU_BUILDER_STRING ? MENU_STRING : view;
    const serviceToUse = serviceHandler(DELETE_STRING);
    const response = await serviceToUse(viewToUse, { id });
    if (response.errors) {
      addToast(response.errors[0], 'error');
      return;
    }
    addToast(name, 'delete');
    await updateLists();
  };

  return (
    <MainContextProvider value={{
      ...contextState,
      setContextState: stateHandler,
      updateLists,
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
