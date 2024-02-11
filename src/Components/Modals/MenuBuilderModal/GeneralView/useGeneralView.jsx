import { useState } from 'react';
import { deepCopy } from '../../../helpers';
import { initMenuOptions, getMealMinMax } from '../helpers';
import { BREAKFAST_STRING, DINNER_STRING, LUNCH_STRING } from '../../../../constants/STRINGS';
import { DEFAULT_WEEK_SETTINGS } from '../../../../constants/MENU';

function useGeneralView({
  dishes, currentData, setCurrentData,
}) {
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

  const {
    weeks,
    weekLimit,
  } = currentData || {};
  console.log({ currentData });
  const selectedWeek = weeks[selectedWeekIndex];
  const { days, mealLimits, people } = selectedWeek;
  const breakfastLimits = getMealMinMax(dishes, days, BREAKFAST_STRING, 0);
  const lunchesLimits = getMealMinMax(dishes, days, LUNCH_STRING, 1);
  const dinnerLimits = getMealMinMax(dishes, days, DINNER_STRING, 2);

  const handleLimitChange = (key, index, increase) => {
    const quantity = key
      ? currentData.weeks[selectedWeekIndex][key]
      : currentData.weeks[selectedWeekIndex].mealLimits[index];
    const newQuantity = increase ? quantity + 1 : quantity - 1;
    const updatedValues = { ...currentData };
    if (key) {
      updatedValues.weeks[selectedWeekIndex][key] = newQuantity;
    } else updatedValues.weeks[selectedWeekIndex].mealLimits[index] = newQuantity;

    setCurrentData(updatedValues);
  };

  const handleWeekLimitChange = (increase) => {
    const updatedValues = { ...currentData };
    const newQuantity = increase ? currentData.weekLimit + 1 : currentData.weekLimit - 1;
    const updatedWeeks = increase
      ? [...currentData.weeks, DEFAULT_WEEK_SETTINGS]
      : currentData.weeks.slice(0, currentData.weeks.length - 1);
    updatedValues.weeks = updatedWeeks;
    updatedValues.weekLimit = newQuantity;
    // eslint-disable-next-line max-len
    if (!increase && selectedWeekIndex === currentData.weeks.length - 1) setSelectedWeekIndex(selectedWeekIndex - 1);
    setCurrentData(updatedValues);
  };

  const handleMealChange = (dayIndex, mealIndex, mealValue) => {
    const updatedData = deepCopy(currentData);
    updatedData.weeks[selectedWeekIndex].days[dayIndex][mealIndex] = !mealValue;
    const initedData = initMenuOptions(
      updatedData,
      dishes,
      selectedWeekIndex,
    );
    setCurrentData(initedData);
  };

  const handleDayChange = (hasMeal, dayIndex) => {
    const updatedData = deepCopy(currentData);
    if (hasMeal) {
      updatedData.weeks[selectedWeekIndex].days[dayIndex][0] = false;
      updatedData.weeks[selectedWeekIndex].days[dayIndex][1] = false;
      updatedData.weeks[selectedWeekIndex].days[dayIndex][2] = false;
    } else {
      updatedData.weeks[selectedWeekIndex].days[dayIndex][0] = breakfastLimits[2] > 0;
      updatedData.weeks[selectedWeekIndex].days[dayIndex][1] = lunchesLimits[2] > 0;
      updatedData.weeks[selectedWeekIndex].days[dayIndex][2] = dinnerLimits[2] > 0;
    }
    const initedData = initMenuOptions(
      updatedData,
      dishes,
      selectedWeekIndex,
    );
    setCurrentData(initedData);
  };

  return {
    weeks,
    days,
    weekLimit,
    people,
    breakfastLimits,
    lunchesLimits,
    dinnerLimits,
    mealLimits,
    selectedWeekIndex,
    setSelectedWeekIndex,
    handleDayChange,
    handleMealChange,
    handleLimitChange,
    handleWeekLimitChange,
  };
}

export default useGeneralView;
