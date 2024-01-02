import {
  BREAKFAST_STRING, DINNER_STRING, LUNCH_STRING, SIDE_STRING,
} from '../../constants';

const DISH_TYPES = [
  {
    id: BREAKFAST_STRING, name: 'Breakfast', shortLabel: 'B',
  },
  {
    id: LUNCH_STRING, name: 'Lunch', shortLabel: 'L',
  },
  {
    id: DINNER_STRING, name: 'Dinner', shortLabel: 'D',
  },
  {
    id: SIDE_STRING, name: 'Side', shortLabel: 'S',
  },
];

// const DISH_TAGS = {
//   fish: 'pescado', meat: 'carne', latin: 'latino', pasta: 'pasta',
// };

// eslint-disable-next-line import/prefer-default-export
export { DISH_TYPES };
