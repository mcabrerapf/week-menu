const buildMenusWithDishes = (menus, allDishes) => {
  if (!Array.isArray(menus) || !Array.isArray(allDishes)) return [];

  return menus
    .map((menu) => {
      const { weeks } = menu;
      const parsedWeeks = weeks.map((week) => {
        const { dishes } = week;
        const parsedDishes = dishes.map((dish) => {
          const {
            id: dishId,
            useAs,
            days,
            sideDishesToUse,
          } = dish;
          const dishMatch = allDishes
            .find(({ id: idToCheck }) => idToCheck === dishId) || {};
          const populatedSideDishes = !sideDishesToUse ? [] : sideDishesToUse
            .map((sideDishId) => allDishes.find(({ id: idToCheck }) => idToCheck === sideDishId));

          return {
            ...dishMatch,
            useAs,
            days,
            sideDishesToUse: populatedSideDishes,
          };
        });
        return { ...week, dishes: parsedDishes };
      });

      return { ...menu, weeks: parsedWeeks };
    });
};

export default buildMenusWithDishes;
