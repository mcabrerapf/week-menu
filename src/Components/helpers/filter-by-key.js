const filterByKey = (list, key, value, toNotMatch) => {
  const listItemKey = key || 'id';

  return list.filter((listItem) => {
    const valueToCompare = key === null ? listItem : listItem[listItemKey];
    if (!value) return !!valueToCompare;
    if (toNotMatch) return valueToCompare !== value;
    if (typeof valueToCompare === 'string') return valueToCompare === value;
    return !!valueToCompare === !!value;
  });
};

export default filterByKey;
