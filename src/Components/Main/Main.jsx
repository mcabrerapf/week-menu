import React, { useState } from 'react';
import './Main.css';
import View from '../View';
import WeekView from '../WeekView';
import { DISH_STRING, INGREDIENT_STRING } from '../../constants';
import { MainContext, useMainContext } from '../../Context';

const minSwipeDistance = 60;

function Main() {
  const {
    view, offlineMode, setContextState,
  } = useMainContext(MainContext);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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
    if (view === 'menu' && isLeftSwipe) setContextState('view', 'dish');
    if (view === 'dish' && isRightSwipe) setContextState('view', 'menu');
    if (view === 'dish' && isLeftSwipe) setContextState('view', 'ingredient');
    if (view === 'ingredient' && isRightSwipe) setContextState('view', 'dish');
  };

  const mainClassName = `main${offlineMode === 1 ? ' offline-mode' : ''}`;

  return (
    <div
      className={mainClassName}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <WeekView />
      <View name={DISH_STRING} />
      <View name={INGREDIENT_STRING} />
    </div>

  );
}

export default Main;
