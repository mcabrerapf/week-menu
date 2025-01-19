import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { MainContextProvider } from './MainContext';
import { serviceHandler } from '../../Services';
import {
  DISH_STRING,
  GET_ALL_STRING,
  INGREDIENT_STRING,
  MENU_STRING,
  DELETE_STRING,
  UPDATE_STRING,
  CREATE_STRING,
  MENU_BUILDER_STRING,
} from '../../constants/STRINGS';
import { DEFAULT_MENU_OPTIONS } from '../../constants/MENU';
import { buildDishesWithIngredients, buildMenusWithDishes, sortBy } from '../../Components/helpers';
import { ToastContext } from '../ToastContext';

function MainContextWrapper({ children }) {
  const { addToast } = useContext(ToastContext);
  const [contextState, setContextState] = useState({
    view: DISH_STRING,
    offlineMode: 0,
    menuOptions: DEFAULT_MENU_OPTIONS,
    currentMenu: {},
    menus: [],
    dishes: [],
    ingredients: [],
  });

  useEffect(() => {
    async function initContext() {
      let allIngredients = [];
      let allDishes = [];

      await serviceHandler(GET_ALL_STRING)(INGREDIENT_STRING)
        .then((res) => {
          allIngredients = res;
          return serviceHandler(GET_ALL_STRING)(DISH_STRING);
        })
        .then((res) => {
          allDishes = buildDishesWithIngredients(res, allIngredients);
          return serviceHandler(GET_ALL_STRING)(MENU_STRING);
        })
        .then((res) => {
          const menusWithDishes = buildMenusWithDishes(res, allDishes);
          setContextState({
            ...contextState,
            offlineMode: false,
            ingredients: sortBy(allIngredients),
            dishes: sortBy(allDishes),
            menus: sortBy(menusWithDishes),
          });
        })
        .catch((err) => {
          addToast(err.errors[0].message, 'error');
        });
    }

    initContext();
  }, []);

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

  const stateHandler = (key, value, newView) => {
    if (!key || !value) return;
    const updatedContext = { ...contextState, [key]: value };
    if (newView) updatedContext.view = newView;
    setContextState(updatedContext);
  };

  const updateCurrentMenu = (newMenu, newOptions) => {
    if (!newMenu && !newOptions) return;
    const updatedContext = { ...contextState, view: MENU_BUILDER_STRING };
    if (newMenu) updatedContext.currentMenu = newMenu;
    if (newOptions) updatedContext.menuOptions = newOptions;
    setContextState(updatedContext);
  };

  const updateList = async (listToUpdate) => serviceHandler(GET_ALL_STRING)(listToUpdate)
    .then((res) => {
      const [updatedList, listKey] = getListAndKey(listToUpdate, res);
      setContextState({
        ...contextState,
        [listKey]: sortBy(updatedList, 'name', 'alphabetical'),
      });
    })
    .catch((err) => {
      addToast(err.errors, 'error');
    });

  const handleSave = async (data, serviceName, callback) => {
    const serviceString = data.id ? UPDATE_STRING : CREATE_STRING;
    const serviceToUse = serviceHandler(serviceString);
    let savedItem = {};
    return serviceToUse(serviceName, data)
      .then((res) => {
        savedItem = res;
        return updateList(serviceName);
      })
      .then(() => {
        if (callback) callback();
        addToast(data.name, 'success', serviceName);
        return savedItem;
      })
      .catch((err) => {
        if (callback) callback();
        addToast(err.errors[0], 'error');
        return {};
      });
  };

  const handleDelete = async (data, serviceName) => {
    const { id, name } = data;
    const serviceToUse = serviceHandler(DELETE_STRING);
    return serviceToUse(serviceName, { id })
      .then(() => updateList(serviceName))
      .then(() => {
        addToast(name, 'delete', serviceName);
      })
      .catch((err) => {
        addToast(err.errors[0], 'error');
      });
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
