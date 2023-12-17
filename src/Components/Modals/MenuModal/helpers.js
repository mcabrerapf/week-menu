const parseMenuData = (data) => {
  const { dishes, name, favourite } = data;
  const parsedDishes = dishes.map(({
    id, useAs, days, sideDishesToUse,
  }) => {
    const sideDishesIds = sideDishesToUse.map(({ id: sideDishId }) => sideDishId);
    return {
      id, useAs, days, sideDishesToUse: sideDishesIds,
    };
  });
  return { name, favourite, dishes: parsedDishes };
};

// eslint-disable-next-line import/prefer-default-export
export { parseMenuData };
