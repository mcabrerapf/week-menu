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

  const updateDishes = (newData) => {
    const { ingredients } = contextState;
    const dishesWithIngredients = buildDishesWithIngredients(newData, ingredients);
    setContextState({ ...contextState, dishes: dishesWithIngredients });
  };

  const updateIngredients = (newData) => {
    setContextState({ ...contextState, ingredients: newData });
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
