/* eslint-disable import/prefer-default-export */
const initMenuOptions = (data, breakfastLimit, lunchLimit, dinnerLimit) => {
  const { maxBreakfasts, maxLunches, maxDinners } = data;
  const breakfastsToUse = maxBreakfasts > breakfastLimit ? breakfastLimit : maxBreakfasts;
  const lunchesToUse = maxLunches > lunchLimit ? lunchLimit : maxLunches;
  const dinnersToUse = maxDinners > dinnerLimit ? dinnerLimit : maxDinners;

  return {
    ...data,
    maxBreakfasts: breakfastsToUse,
    maxLunches: lunchesToUse,
    maxDinners: dinnersToUse,
  };
};

export { initMenuOptions };
