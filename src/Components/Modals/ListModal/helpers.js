/* eslint-disable import/prefer-default-export */
import { deepCopy } from '../../helpers';
import { DISH_STRING, MENU_STRING } from '../../../constants';

const parseData = (data, view, mode, id) => {
  const copiedData = deepCopy(data);
  if (view === DISH_STRING) {
    const { ingredients } = copiedData;
    copiedData.ingredients = ingredients
      .map(({ id: iId, unit, quantity }) => ({ id: iId, quantity, unit }));
  }
  if (view === MENU_STRING) {
    const { dishes } = copiedData;
    copiedData.dishes = dishes
      .map(({ id: iId, useAs, days }) => ({ id: iId, useAs, days }));
  }
  if (mode !== 'create') return { ...copiedData, id };
  return copiedData;
};

export { parseData };
