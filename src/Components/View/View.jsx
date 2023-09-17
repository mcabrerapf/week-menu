import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './View.css';
import List from '../List';
import { MainContext } from '../../Contexts/MainContext';

const minSwipeDistance = 50;
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

const getNewView = (view, leftSwipe, rightSwipe) => {
  switch (view) {
    case 'menu':
      if (leftSwipe) return 'buildMenu';
      if (rightSwipe) return 'dish';
      return view;
    case 'dish':
      if (leftSwipe) return 'menu';
      if (rightSwipe) return 'ingredient';
      return view;
    case 'ingredient':
      if (leftSwipe) return 'dish';
      return view;
    default:
      return view;
  }
};

function View({
  name,
}) {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const {
    view, setContextState, ...contextProps
  } = useContext(MainContext);
  const isHidden = view !== name;
  const listData = getListData(view, contextProps);
  const className = isHidden ? 'view no-show' : 'view';

  const onTouchStart = (e) => {
    e.stopPropagation();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    e.stopPropagation();
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e) => {
    e.stopPropagation();
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    const newView = getNewView(view, isRightSwipe, isLeftSwipe);
    if (newView !== view) setContextState('view', newView);
  };

  return (
    <div
      className={className}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <List
        listData={listData}
      />
    </div>
  );
}

View.propTypes = {
  name: PropTypes.string.isRequired,
};

export default View;
