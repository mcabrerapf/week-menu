function getSortValue(item, itemKey, sorttype) {
  const parsedItem = itemKey ? item[itemKey] : item;

  switch (sorttype) {
    case 'alphabetical':
      return parsedItem.toLowerCase();
    default:
      return parsedItem;
  }
}

export default function sortBy(items, itemKey = 'name', sortType = 'alphabetical') {
  return items.sort((a, b) => {
    if (getSortValue(a, itemKey, sortType) < getSortValue(b, itemKey, sortType)) return -1;
    if (getSortValue(a, itemKey, sortType) > getSortValue(b, itemKey, sortType)) return 1;
    return 0;
  });
}
