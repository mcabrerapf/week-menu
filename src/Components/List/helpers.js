/* eslint-disable import/prefer-default-export */
import { INGREDIENT_TYPES, DISH_TYPES } from '../constants';
import { DISH_STRING, INGREDIENT_STRING } from '../../constants';

const getListData = (view, contextProps) => {
  const { menus, dishes, ingredients } = contextProps;
  switch (view) {
    case 'menu':
      return menus;
    case 'dish':
      return dishes;
    case 'ingredients':
      return ingredients;
    default:
      return ingredients;
  }
};

const filterList = (list, searchValue, filterValue) => {
  if (!searchValue && !filterValue) return list;
  const useFavourite = filterValue === 'favourite';
  return list.filter(({
    name, type, types, favourite,
  }) => {
    const filterMatch = types ? types.includes(filterValue) : type === filterValue;
    const matchToUse = useFavourite ? favourite : filterMatch;
    if (searchValue) {
      if (filterValue) {
        return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 && matchToUse;
      }
      return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    }
    if (filterValue) return matchToUse;
    return true;
  });
};

const getFilterOptions = (view) => {
  switch (view) {
    case 'menu':
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
