import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import './Main.css';
import View from '../View';
import WeekView from '../WeekView';
import { DISH_STRING, INGREDIENT_STRING } from '../../constants';
import { MainContext, useMainContext } from '../../Context';

function Main() {
  const { view, setContextState } = useMainContext(MainContext);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (view === 'menu' && isLeftSwipe) setContextState('view', 'dish');
    if (view === 'dish' && isRightSwipe) setContextState('view', 'menu');
    if (view === 'dish' && isLeftSwipe) setContextState('view', 'ingredient');
    if (view === 'ingredient' && isRightSwipe) setContextState('view', 'dish');
  };

  return (
    <div
      className="main"
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

// Main.propTypes = {
//   signOut: PropTypes.func.isRequired,
// };

export default Main;
