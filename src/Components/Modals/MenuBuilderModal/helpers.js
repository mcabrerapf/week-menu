const initMenuOptions = (data, selectedWeekIndex) => {
  const { weeks } = data;

  const updatedWeek = {
    ...weeks[selectedWeekIndex],
    mealLimits: [0, 3, 3],
  };
  const updatedWeeks = [...weeks];
  updatedWeek[selectedWeekIndex] = updatedWeek;
  return {
    ...data,
    filters: {
      ingredientTypes: [],
      ingredients: [],
      dishes: [],
    },
    weeks: updatedWeeks,
  };
};

// eslint-disable-next-line import/prefer-default-export
export { initMenuOptions };
