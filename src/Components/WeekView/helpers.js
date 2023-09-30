/* eslint-disable import/prefer-default-export */
import { deepCopy } from '../helpers';

const updateDishes = (updateData, menuDishes) => {
  const {
    changeAll, dayIndex, oldDishId, newDish, type,
  } = updateData;
  const { id: newDishId } = newDish;
  const oldDishes = deepCopy(menuDishes);
  const newDishes = oldDishes
    .map((currentDish) => {
      const { id, days, useAs } = currentDish;
      if (useAs === type) {
        if (id === oldDishId) {
          if (changeAll) days.forEach((day) => newDish.days.push(day));
          const updatedDays = changeAll ? [] : days.filter((day) => day !== dayIndex);
          return { ...currentDish, days: updatedDays };
        }
        if (newDishId === id) {
          days.forEach((day) => !newDish.days.includes(day) && newDish.days.push(day));
          return { ...currentDish, days: [] };
        }
      }

      return currentDish;
    }).filter(({ days }) => !!days.length);
  newDishes.push({ ...newDish });
};

export { updateDishes };
