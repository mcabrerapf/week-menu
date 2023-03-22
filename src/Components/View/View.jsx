import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './View.css';
import List from '../List';
import { MainContext } from '../../Contexts/MainContext';

const minSwipeDistance = 80;

function View({
  name,
}) {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const {
    view, ingredients, dishes, setContextState,
  } = useContext(MainContext);
  const isHidden = view !== name;
  const listData = view === 'dish' ? dishes : ingredients;
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
    if (view === 'dish' && isRightSwipe) setContextState('view', 'menu');
    if (view === 'dish' && isLeftSwipe) setContextState('view', 'ingredient');
    if (view === 'ingredient' && isRightSwipe) setContextState('view', 'dish');
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
