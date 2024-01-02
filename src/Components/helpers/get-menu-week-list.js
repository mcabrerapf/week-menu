import { BREAKFAST_STRING, DINNER_STRING, LUNCH_STRING } from '../../constants';

const getDishDayIndex = (dishType) => {
  switch (dishType) {
    case BREAKFAST_STRING:
      return 0;
    case LUNCH_STRING:
      return 1;
    case DINNER_STRING:
      return 2;
    default:
      return 0;
  }
};

const getMenuWeekList = (dishes) => {
  const days = [];
  for (let index = 0; index < 7; index += 1) {
    days.push([{ useAs: BREAKFAST_STRING }, { useAs: LUNCH_STRING }, { useAs: DINNER_STRING }]);
  }
  console.log(days);
  dishes.forEach((dish) => {
    const dishIndex = getDishDayIndex(dish.useAs);
    if (dish.days) {
      dish.days.forEach((day) => {
        days[day][dishIndex] = dish;
      });
    }
  });
  return days;
};

export default getMenuWeekList;
