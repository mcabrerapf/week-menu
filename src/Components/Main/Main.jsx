import React from 'react';
import './Main.css';
import WeekView from '../WeekView';
import { useMainContext, MainContext } from '../../Context';

function Main() {
  const { view } = useMainContext(MainContext);

  return (
    <div className="main">
      {view === 'week' && <WeekView />}
    </div>
  );
}

export default Main;
