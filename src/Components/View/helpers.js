import { minSwipeDistance } from '../constants';

const getListData = (view, contextProps) => {
  switch (view) {
    case 'menu':
      return contextProps.menus;
    case 'dish':
      return contextProps.dishes;
    case 'ingredients':
      return contextProps.ingredients;
    default:
      return contextProps.ingredients;
  }
};

const getNewView = ({
  view, touchStart, touchEnd,
}) => {
  const distance = touchStart - touchEnd;
  const isLeftSwipe = distance > minSwipeDistance;
  const isRightSwipe = distance < -minSwipeDistance;

  switch (view) {
    case 'menuBuilder':
      if (isLeftSwipe) return 'menu';
      return view;
    case 'menu':
      if (isLeftSwipe) return 'dish';
      if (isRightSwipe) return 'menuBuilder';
      return view;
    case 'dish':
      if (isLeftSwipe) return 'ingredient';
      if (isRightSwipe) return 'menu';
      return view;
    case 'ingredient':
      if (isRightSwipe) return 'dish';
      return view;
    default:
      return view;
  }
};

export { getListData, getNewView };
