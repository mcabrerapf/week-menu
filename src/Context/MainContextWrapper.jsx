import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MainContextProvider } from './MainContext';
import { serviceHandler } from '../Services';
import { DISH_STRING, GET_ALL_STRING, INGREDIENT_STRING } from '../constants';
import { buildDishesWithIngredients } from '../Components/helpers';

function MainContextWrapper({ children }) {
  const [contextState, setContextState] = useState({
    view: 'menu',
    offlineMode: 0,
    menus: [],
    dishes: [],
    ingredients: [],
  });

  useEffect(() => {
    async function initContext() {
      const allDishes = await serviceHandler(GET_ALL_STRING)(DISH_STRING);
      const allIngredients = await serviceHandler(GET_ALL_STRING)(INGREDIENT_STRING);
      if (!allDishes) return;
      const dishesWithIngredients = buildDishesWithIngredients(allDishes, allIngredients);
      const localOfflineMode = window.localStorage.getItem('week-menu-offline-mode');

      setContextState({
        ...contextState,
        offlineMode: Number(localOfflineMode),
        dishes: dishesWithIngredients,
        ingredients: allIngredients,
      });
    }
    initContext();
  }, []);

  const stateHandler = (key, value) => {
    setContextState({ ...contextState, [key]: value });
  };

  const updateDishes = async () => {
    const {
      view, ingredients, dishes, offlineMode,
    } = contextState;
    const newData = offlineMode === 0 ? await serviceHandler(GET_ALL_STRING)(view) : dishes;
    const dishesWithIngredients = buildDishesWithIngredients(newData, ingredients);
    setContextState({ ...contextState, dishes: dishesWithIngredients });
  };

  const updateIngredients = async () => {
    const {
      view, offlineMode, ingredients, dishes,
    } = contextState;
    const newData = offlineMode === 0 ? await serviceHandler(GET_ALL_STRING)(view) : ingredients;
    const dishesWithIngredients = buildDishesWithIngredients(dishes, newData);
    setContextState({ ...contextState, ingredients: newData, dishes: dishesWithIngredients });
  };

  return (
    <MainContextProvider value={{
      ...contextState,
      setContextState: stateHandler,
      updateDishes,
      updateIngredients,
    }}
    >
      {children}
    </MainContextProvider>
  );
}

MainContextWrapper.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default MainContextWrapper;
