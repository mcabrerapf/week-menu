import { BREAKFAST_STRING, DINNER_STRING, LUNCH_STRING } from '../../../constants';

const getMealMinMax = (dishes, currentData, mealType, dayKeyCheck) => {
  const { days } = currentData;
  const { length: availableDishes } = dishes
    .filter(({ types }) => types && types.includes(mealType)) || [];
  const { length: selectedDays } = days.filter(({ [dayKeyCheck]: value }) => !!value) || [];
  const min = availableDishes === 0 || selectedDays === 0 ? 0 : 1;
  const max = selectedDays > availableDishes ? availableDishes : selectedDays;
  return [min, max, availableDishes];
};

const checkIfInRange = (value, min, max) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

const initMenuOptions = (data, dishes) => {
  const {
    maxBreakfasts, maxLunches, maxDinners,
  } = data;

  const [breakfastMin, breakfastMax] = getMealMinMax(dishes, data, BREAKFAST_STRING, 'hasBreakfast');
  const [lunchMin, lunchMax] = getMealMinMax(dishes, data, LUNCH_STRING, 'hasLunch');
  const [dinnerMin, dinnerMax] = getMealMinMax(dishes, data, DINNER_STRING, 'hasDinner');

  const breakfastsToUse = checkIfInRange(maxBreakfasts, breakfastMin, breakfastMax);
  const lunchesToUse = checkIfInRange(maxLunches, lunchMin, lunchMax);
  const dinnersToUse = checkIfInRange(maxDinners, dinnerMin, dinnerMax);

  return {
    ...data,
    maxBreakfasts: breakfastsToUse,
    maxLunches: lunchesToUse,
    maxDinners: dinnersToUse,
  };
};

export { initMenuOptions, getMealMinMax };
