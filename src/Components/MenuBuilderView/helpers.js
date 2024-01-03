/* eslint-disable import/prefer-default-export */
import { deepCopy } from '../helpers';

// TODO refactor
const updateDishes = (updateData, menuDishes) => {
  const {
    changeAll, oldDish, newDish,
  } = updateData;

  const { id: oldDishId } = oldDish;
  const { id: newDishId } = newDish;
  const oldDishes = deepCopy(menuDishes);
  const newDishes = [];
  oldDishes.forEach((dish) => {
    const { id } = dish;
    if (id === oldDishId) {
      if (changeAll) return;
      newDishes.push(oldDish);
    } else if (id === newDishId) {
      newDishes.push(newDish);
    } else {
      newDishes.push(dish);
    }
  });
  newDishes.push({ ...newDish });
  return newDishes;
};

export { updateDishes };
