import React from 'react';
import './Footer.css';
import { MainContext, useMainContext } from '../../Context';

function Footer() {
  const { view, setContextState } = useMainContext(MainContext);

  const handleOnClick = (newView) => {
    if (newView !== view) setContextState('view', newView);
  };

  return (
    <footer className="footer">
      <div className="footer-buttons">
        <button className={view === 0 ? 'selected' : ''} type="button" onClick={() => handleOnClick(0)}>Week</button>
        <button className={view === 1 ? 'selected' : ''} type="button" onClick={() => handleOnClick(1)}> Dishes</button>
        <button className={view === 2 ? 'selected' : ''} type="button" onClick={() => handleOnClick(2)}>Ingredients</button>
      </div>
    </footer>
  );
}

export default Footer;
