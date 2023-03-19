import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MainContextProvider } from './MainContext';
import { serviceHandler } from '../../Services';
import { DISH_STRING, GET_ALL_STRING, INGREDIENT_STRING } from '../../constants';
import { buildDishesWithIngredients } from '../../Components/helpers';
import './MainContextWrapper.css';

function MainContextWrapper({ children }) {
  const [contextState, setContextState] = useState({
    view: 'menu',
    loading: true,
    offlineMode: 0,
    menus: [],
    dishes: [],
    ingredients: [],
    errorMessage: null,
  });

  useEffect(() => {
    async function initContext() {
      const localOfflineMode = window.localStorage.getItem('week-menu-offline-mode');
      const allDishes = await serviceHandler(GET_ALL_STRING)(DISH_STRING);
      if (allDishes.errors) {
        return setContextState({ ...contextState, errorMessage: allDishes.errors[0].message });
      }
      const allIngredients = await serviceHandler(GET_ALL_STRING)(INGREDIENT_STRING);
      if (allIngredients.errors) {
        return setContextState({ ...contextState, errorMessage: allIngredients.errors[0].message });
      }
      if (!allDishes.length) {
        setContextState({
          ...contextState,
          offlineMode: Number(localOfflineMode),
          loading: false,
          dishes: [],
          ingredients: allIngredients,
        });
      }
      const dishesWithIngredients = buildDishesWithIngredients(allDishes, allIngredients);

      return setContextState({
        ...contextState,
        offlineMode: Number(localOfflineMode),
        loading: false,
        dishes: dishesWithIngredients,
        ingredients: allIngredients,
      });
    }
    initContext();
  }, []);

  const stateHandler = (key, value) => {
    setContextState({ ...contextState, [key]: value });
  };

  const updateLists = async () => {
    const {
      view, ingredients, dishes,
    } = contextState;
    const newData = await serviceHandler(GET_ALL_STRING)(view);
    if (newData.errors) return newData;
    const dishesWithIngredients = view === DISH_STRING
      ? buildDishesWithIngredients(newData, ingredients)
      : buildDishesWithIngredients(dishes, newData);

    const ingredientsToUse = view === INGREDIENT_STRING ? newData : ingredients;

    setContextState({
      ...contextState,
      dishes: dishesWithIngredients,
      ingredients: ingredientsToUse,
    });
    return newData;
  };

  const { loading, errorMessage } = contextState;

  return (
    <MainContextProvider value={{
      ...contextState,
      setContextState: stateHandler,
      updateLists,
    }}
    >
      <div
        style={{ display: `${loading ? 'flex' : 'none'}` }}
        className="main-context-wrapper"
      >
        <div>{errorMessage || 'Loading...'}</div>
      </div>
      {!loading && children}
    </MainContextProvider>
  );
}

MainContextWrapper.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default MainContextWrapper;
