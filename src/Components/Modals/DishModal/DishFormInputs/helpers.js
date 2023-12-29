import { sortBy } from '../../../helpers';

const filterIngredinents = (ingredients, selectedType, searchValue) => {
  const filteredIngredients = ingredients
    .filter(({ type, name }) => {
      if (selectedType === '') {
        if (!searchValue) return true;
        return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
      }
      if (selectedType === type) {
        if (!searchValue) return true;
        return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
      }
      return false;
    });

  return sortBy(filteredIngredients, 'name', 'alphabetical');
};
// eslint-disable-next-line import/prefer-default-export
export { filterIngredinents };
