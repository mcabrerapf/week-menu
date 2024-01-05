const buildMenusWithDishes = (menus, allDishes) => {
  if (!Array.isArray(menus) || !Array.isArray(allDishes)) return [];

  return menus
    .map((menu) => {
      const { weeks } = menu;
      const parsedWeeks = weeks.map((week) => {
        const { days } = week;
        const builtDays = days.map(({ dishes }) => {
          const parsedDishes = dishes.map((dish) => {
            if (!dish) return null;
            const {
              id: dishId,
              sideDishesToUse,
            } = dish;
            const dishMatch = allDishes
              .find(({ id: idToCheck }) => idToCheck === dishId) || {};
            const populatedSideDishes = !sideDishesToUse ? [] : sideDishesToUse
              .map((sideDishId) => allDishes.find(({ id: idToCheck }) => idToCheck === sideDishId));

            return {
              ...dishMatch,
              sideDishesToUse: populatedSideDishes,
            };
          });
          return { dishes: parsedDishes };
        });

        return { ...week, days: builtDays };
      });

      return { ...menu, weeks: parsedWeeks };
    });
};

export default buildMenusWithDishes;
