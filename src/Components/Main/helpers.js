import { MIN_SWIPE_DISTANCE } from '../constants';

const getNewView = ({
  view, touchStart, touchEnd,
}) => {
  const distance = touchStart - touchEnd;
  const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
  const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

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

// eslint-disable-next-line import/prefer-default-export
export { getNewView };
