import {
  DISH_STRING, INGREDIENT_STRING, MENU_BUILDER_STRING, MENU_STRING,
} from '../../constants/STRINGS';
import { MIN_SWIPE_DISTANCE } from '../../constants';

const getNewView = ({
  view, touchStart, touchEnd,
}) => {
  const distance = touchStart - touchEnd;
  const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
  const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

  switch (view) {
    case MENU_BUILDER_STRING:
      if (isLeftSwipe) return MENU_STRING;
      return view;
    case MENU_STRING:
      if (isLeftSwipe) return DISH_STRING;
      if (isRightSwipe) return MENU_BUILDER_STRING;
      return view;
    case DISH_STRING:
      if (isLeftSwipe) return INGREDIENT_STRING;
      if (isRightSwipe) return MENU_STRING;
      return view;
    case INGREDIENT_STRING:
      if (isRightSwipe) return DISH_STRING;
      return view;
    default:
      return view;
  }
};

// eslint-disable-next-line import/prefer-default-export
export { getNewView };
