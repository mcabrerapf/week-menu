import { useState } from 'react';
import { deepCopy } from '../../../helpers';
import { initMenuOptions } from '../helpers';
import { DEFAULT_WEEK_SETTINGS } from '../../../../constants/MENU';

function useGeneralView({
  dishes, currentData, setCurrentData,
}) {
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

  const {
    weeks,
    weekLimit,
  } = currentData || {};

  const selectedWeek = weeks[selectedWeekIndex];
  const { days, mealLimits, people } = selectedWeek;

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
      updatedData.weeks[selectedWeekIndex].days[dayIndex][0] = true;
      updatedData.weeks[selectedWeekIndex].days[dayIndex][1] = true;
      updatedData.weeks[selectedWeekIndex].days[dayIndex][2] = true;
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
