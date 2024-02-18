/* eslint-disable import/prefer-default-export */

import {
  DISH_STRING, INGREDIENT_STRING, MENU_STRING,
} from '../../constants/STRINGS';
import { DISH_TYPES } from '../../constants/DISH';
import { INGREDIENT_TYPES } from '../../constants/INGREDIENT';

const getListData = (view, contextProps) => {
  const { menus, dishes, ingredients } = contextProps;
  switch (view) {
    case MENU_STRING:
      return menus;
    case DISH_STRING:
      return dishes;
    case INGREDIENT_STRING:
      return ingredients;
    default:
      return [];
  }
};

const filterList = (list, searchValue, filterValue) => {
  if (!searchValue && !filterValue) return list;
  const useFavourite = filterValue === 'favourite';
  return list.filter(({
    name, ingredients = [], type, types, favourite,
  }) => {
    const filterMatch = types ? types.includes(filterValue) : type === filterValue;
    const matchToUse = useFavourite ? favourite : filterMatch;
    if (searchValue) {
      const hasTextMatch = name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      || !!ingredients
        .find(({ name: iname }) => iname.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1);
      if (filterValue) {
        return hasTextMatch && matchToUse;
      }
      return hasTextMatch;
    }
    if (filterValue) return matchToUse;
    return true;
  });
};

const getFilterOptions = (view) => {
  switch (view) {
    case MENU_STRING:
      return [{ value: 'favourite', name: 'Favourite' }];
    case DISH_STRING:
      return DISH_TYPES;
    case INGREDIENT_STRING:
      return INGREDIENT_TYPES;
    default:
      return [];
  }
};

export { filterList, getFilterOptions, getListData };
