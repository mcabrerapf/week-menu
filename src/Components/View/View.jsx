import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './View.css';
import List from '../List';
import WeekView from '../WeekView';
import { MainContext } from '../../Contexts/MainContext';
import { getListData, getNewView } from './helpers';
import { MENU_BUILDER_STRING } from '../../constants';

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
    const newView = getNewView({
      view, touchStart, touchEnd,
    });
    if (newView !== view) setContextState('view', newView);
  };

  return (
    <div
      className={className}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {view === MENU_BUILDER_STRING
        ? <WeekView /> : (
          <List
            listData={listData}
          />
        )}

    </div>

  );
}

View.propTypes = {
  name: PropTypes.string.isRequired,
};

export default View;
