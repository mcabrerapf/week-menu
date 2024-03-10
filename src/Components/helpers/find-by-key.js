const findByKey = (list, value, key, notMatch) => {
  const listItemKey = key || 'id';
  return list.find((listItem) => {
    if (notMatch) return listItem[listItemKey] !== value;
    return listItem[listItemKey] === value;
  });
};

export default findByKey;
