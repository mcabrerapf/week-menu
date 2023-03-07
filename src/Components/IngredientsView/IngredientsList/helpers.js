import { INGREDIENTS_UNITS_MOCK, INGREDIENT_TYPES_MOCK } from '../../constants';

// eslint-disable-next-line import/prefer-default-export
export const initData = ({ name, type, unit }) => ({
  name: name || '',
  type: type || INGREDIENT_TYPES_MOCK[0].value,
  unit: unit || INGREDIENTS_UNITS_MOCK[0].value,
});
