import React, { useContext, useEffect, useState } from 'react';
import {
  MENU_BUILDER_STRING,
} from '../../constants/STRINGS';
import { MainContext } from '../../Contexts';
import { getNewView } from './helpers';
import MenuBuilder from '../MenuBuilder';
import List from '../List';

function Main() {
  const {
    offlineMode, view, setContextState,
  } = useContext(MainContext);
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
    const newView = getNewView({
      view, touchStart, touchEnd,
    });
    if (newView !== view) setContextState('view', newView);
  };

  // Enable to stop browser auto navigation
  useEffect(() => {
    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  });

  const offlineClass = offlineMode === 1 ? ' bgc-off' : '';

  return (
    <div
      className={`main col w-f${offlineClass}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {view === MENU_BUILDER_STRING && <MenuBuilder />}
      {view !== MENU_BUILDER_STRING && <List />}
    </div>
  );
}

export default Main;
