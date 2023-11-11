import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MainContextProvider } from './MainContext';
import { serviceHandler } from '../../Services';
import {
  DISH_STRING, GET_ALL_STRING, INGREDIENT_STRING, MENU_STRING, MENU_BUILDER_STRING,
} from '../../constants';
import { buildDishesWithIngredients, buildMenusWithDishes } from '../../Components/helpers';
import './MainContextWrapper.css';
import { defaultMenuOptions } from '../../Components/MenuBuilderView/Week/constants';

function MainContextWrapper({ children }) {
  const [contextState, setContextState] = useState({
    view: 'dish',
    loading: true,
    offlineMode: 0,
    currentMenu: { menuOptions: defaultMenuOptions, menuDishes: [] },
    menus: [],
    dishes: [],
    ingredients: [],
    errorMessage: null,
  });

  useEffect(() => {
    async function initContext() {
      const localOfflineMode = Number(window.localStorage.getItem('week-menu-offline-mode'));
      const allDishes = await serviceHandler(GET_ALL_STRING)(DISH_STRING);
      if (allDishes.errors) {
        return setContextState({ ...contextState, errorMessage: allDishes.errors[0].message });
      }
      const allIngredients = await serviceHandler(GET_ALL_STRING)(INGREDIENT_STRING);
      if (allIngredients.errors) {
        return setContextState({ ...contextState, errorMessage: allIngredients.errors[0].message });
      }
      const allMenus = await serviceHandler(GET_ALL_STRING)(MENU_STRING);
      if (allMenus.errors) {
        return setContextState({ ...contextState, errorMessage: allMenus.errors[0].message });
      }
      if (!allDishes.length) {
        return setContextState({
          ...contextState,
          offlineMode: localOfflineMode,
          loading: false,
          dishes: [],
          ingredients: allIngredients,
        });
      }

      const dishesWithIngredients = buildDishesWithIngredients(allDishes, allIngredients);
      const menusWithDishes = buildMenusWithDishes(allMenus, dishesWithIngredients);

      return setContextState({
        ...contextState,
        offlineMode: localOfflineMode,
        loading: false,
        dishes: dishesWithIngredients,
        ingredients: allIngredients,
        menus: menusWithDishes,
      });
    }

    initContext();
  }, []);

  const updateLists = async (listToUpdate) => {
    const {
      view, ingredients, dishes, menus,
    } = contextState;
    const listName = listToUpdate || view;
    const viewToUse = view === MENU_BUILDER_STRING ? MENU_STRING : listName;
    const newData = await serviceHandler(GET_ALL_STRING)(viewToUse);
    if (newData.errors) return newData;
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
    return newData;
  };

  const updateCurrentMenu = (newMenu) => {
    setContextState({ ...contextState, currentMenu: newMenu, view: MENU_BUILDER_STRING });
  };

  const stateHandler = (key, value) => {
    setContextState({ ...contextState, [key]: value });
  };

  const { loading, errorMessage } = contextState;

  return (
    <MainContextProvider value={{
      ...contextState,
      setContextState: stateHandler,
      updateLists,
      updateCurrentMenu,
    }}
    >
      {loading && (
      <div
        className="main-context-message-wrapper"
      >
        <div>{errorMessage || 'Loading...'}</div>
      </div>
      )}
      {children}
    </MainContextProvider>
  );
}

MainContextWrapper.propTypes = {
  children: PropTypes
    .oneOfType([PropTypes.shape(), PropTypes.arrayOf(PropTypes.shape())]).isRequired,
};

export default MainContextWrapper;
