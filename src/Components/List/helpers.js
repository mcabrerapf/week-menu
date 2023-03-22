/* eslint-disable import/prefer-default-export */
const filterList = (list, key, searchValue, filterValue) => {
  if (!searchValue && !filterValue) return list;

  return list.filter(({ name, type, types }) => {
    const filterMatch = types ? types.includes(filterValue) : type === filterValue;
    if (searchValue) {
      if (filterValue) {
        return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 && filterMatch;
      }
      return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    }
    if (filterValue) return filterMatch;
    return true;
  });
};

export { filterList };
