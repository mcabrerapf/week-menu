const buildMenusWithDishes = (menus, allDishes) => {
  if (!Array.isArray(menus) || !Array.isArray(allDishes)) return [];

  return menus
    .map((menu) => {
      const { dishes } = menu;
      const parsedDishes = dishes.map((dish) => {
        const {
          id: dishId,
          useAs, days,
        } = dish;
        const dishMatch = allDishes
          .find(({ id: idToCheck }) => idToCheck === dishId) || {};
        return {
          ...dishMatch,
          useAs,
          days,
        };
      });
      return { ...menu, dishes: parsedDishes };
    });
};

export default buildMenusWithDishes;
