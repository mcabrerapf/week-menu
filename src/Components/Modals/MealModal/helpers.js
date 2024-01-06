import { SIDE_STRING } from '../../../constants/STRINGS';
import { sortBy } from '../../helpers';

/* eslint-disable import/prefer-default-export */
const getDishesAndSideDishes = (dishes, oldDish) => {
  const mainDishes = [];
  const sideDishes = [];
  dishes.forEach((dish) => {
    const { id: dishId, types } = dish;
    if (oldDish?.id === dishId) return;
    if (types.includes(SIDE_STRING)) sideDishes.push(dish);
    else mainDishes.push(dish);
  });
  return [sortBy(mainDishes, 'name', 'alphabetical'), sortBy(sideDishes, 'name', 'alphabetical')];
};

export { getDishesAndSideDishes };
