const filterByKey = (list, key, value, notMatch) => {
  const listItemKey = key || 'id';

  return list.filter((listItem) => {
    const valueToCompare = key === null ? listItem : listItem[listItemKey];
    if (!value) return !!valueToCompare;
    if (notMatch) return valueToCompare !== value;
    return !!valueToCompare === value;
  });
};

export default filterByKey;
