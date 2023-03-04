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
        <button type="button" onClick={() => handleOnClick('week')}>Week</button>
        <button type="button" onClick={() => handleOnClick('dishes')}> Dishes</button>
        <button type="button" onClick={() => handleOnClick('ingredients')}>Ingredients</button>
      </div>
    </footer>
  );
}

export default Footer;
