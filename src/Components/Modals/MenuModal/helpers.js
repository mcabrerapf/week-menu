const parseMenuData = (menu) => {
  const parsedWeeks = menu.weeks.map((week) => {
    const parsedDays = week.days.map((day) => {
      const parsedDishes = day.dishes.map((dish) => {
        if (!dish) return null;
        const { id } = dish;
        const sideDishesToUse = dish.sideDishesToUse || [];
        const parsedSideDishesToUse = sideDishesToUse.map((sideDish) => sideDish?.id);
        return { id, sideDishesToUse: parsedSideDishesToUse };
      });
      return { ...day, dishes: parsedDishes };
    });
    return { ...week, days: parsedDays };
  });
  return { ...menu, weeks: parsedWeeks };
};

// eslint-disable-next-line import/prefer-default-export
export { parseMenuData };
