/* eslint-disable import/prefer-default-export */

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

export { filterList };
