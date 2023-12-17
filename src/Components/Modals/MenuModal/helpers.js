const parseMenuData = (data) => {
  const {
    dishes, name, favourite, id,
  } = data;
  const parsedDishes = dishes.map(({
    useAs, days, sideDishesToUse,
  }) => {
    const sideDishesIds = sideDishesToUse.map(({ id: sideDishId }) => sideDishId);
    return {
      id, useAs, days, sideDishesToUse: sideDishesIds,
    };
  });
  const parsedData = { name, favourite, dishes: parsedDishes };
  if (id) parsedData.id = id;
  return parsedData;
};

// eslint-disable-next-line import/prefer-default-export
export { parseMenuData };
