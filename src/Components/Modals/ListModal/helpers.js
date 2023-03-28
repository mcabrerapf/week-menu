/* eslint-disable import/prefer-default-export */
import { deepCopy } from '../../helpers';
import { DISH_STRING } from '../../../constants';

const parseData = (data, view, mode, id) => {
  const copiedData = deepCopy(data);
  if (view === DISH_STRING) {
    const { ingredients } = copiedData;
    copiedData.ingredients = ingredients
      .map(({ id: iId, unit, quantity }) => ({ id: iId, quantity, unit }));
  }
  if (mode !== 'create') return { ...copiedData, id };
  return copiedData;
};

export { parseData };
