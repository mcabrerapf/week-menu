const parseMenuData = (data) => {
  const {
    name, favourite, id, weeks,
  } = data;
  const parsedWeeks = weeks.map((week) => {
    const { dishes } = week;
    const parsedDishes = dishes.map(({
      id: dishId, useAs, days, sideDishesToUse,
    }) => {
      const sideDishesIds = sideDishesToUse.map(({ id: sideDishId }) => sideDishId);
      return {
        id: dishId, useAs, days, sideDishesToUse: sideDishesIds,
      };
    });
    return { dishes: parsedDishes };
  });

  const parsedData = {
    name, favourite, weeks: parsedWeeks,
  };
  if (id) parsedData.id = id;
  return parsedData;
};

// eslint-disable-next-line import/prefer-default-export
export { parseMenuData };
