import { BREAKFAST_STRING, DINNER_STRING, LUNCH_STRING } from '../../../constants/STRINGS';

const getMealMinMax = (dishes, days, mealType, mealIndex) => {
  const { length: availableDishes } = dishes
    .filter(({ types }) => types && types.includes(mealType)) || [];
  const { length: selectedDays } = days.filter((day) => !!day[mealIndex]) || [];
  const min = availableDishes === 0 || selectedDays === 0 ? 0 : 1;
  const max = selectedDays > availableDishes ? availableDishes : selectedDays;
  return [min, max, availableDishes];
};

const checkIfInRange = (value, min, max) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

const initMenuOptions = (data, dishes, selectedWeekIndex) => {
  const { weeks } = data;
  const { mealLimits, days } = weeks[selectedWeekIndex];
  const [breakfastMin, breakfastMax] = getMealMinMax(dishes, days, BREAKFAST_STRING, 0);
  const [lunchMin, lunchMax] = getMealMinMax(dishes, days, LUNCH_STRING, 1);
  const [dinnerMin, dinnerMax] = getMealMinMax(dishes, days, DINNER_STRING, 2);

  const breakfastsToUse = checkIfInRange(mealLimits[0], breakfastMin, breakfastMax);
  const lunchesToUse = checkIfInRange(mealLimits[1], lunchMin, lunchMax);
  const dinnersToUse = checkIfInRange(mealLimits[2], dinnerMin, dinnerMax);
  const updatedWeek = {
    ...weeks[selectedWeekIndex],
    mealLimits: [breakfastsToUse, lunchesToUse, dinnersToUse],
  };
  const updatedWeeks = [...weeks];
  updatedWeek[selectedWeekIndex] = updatedWeek;
  return {
    ...data,
    weeks: updatedWeeks,
  };
};

export { initMenuOptions, getMealMinMax };
