/* eslint-disable import/prefer-default-export */
import { deepCopy } from '../helpers';

// TODO refactor
const updateDishes = (updateData, menuDishes) => {
  const {
    changeAll, dayIndex, oldDishId, newDish,
  } = updateData;

  const { id: newDishId } = newDish;
  const oldDishes = deepCopy(menuDishes);
  const newDishes = oldDishes
    .map((currentDish) => {
      const { id, days } = currentDish;
      if (id === oldDishId) {
        if (changeAll) newDish.days = days;
        const updatedDays = changeAll ? [] : days.filter((day) => day !== dayIndex);
        if (!updatedDays.length) return null;
        return { ...currentDish, days: updatedDays };
      }
      if (id === newDishId) {
        return null;
      }

      return currentDish;
    }).filter(Boolean);
  newDishes.push({ ...newDish });
  return newDishes;
};

export { updateDishes };
