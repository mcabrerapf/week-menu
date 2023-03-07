import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import { MainContext, useMainContext } from '../../Context';

function Footer({ signOut }) {
  const { view, setContextState } = useMainContext(MainContext);

  const handleOnClick = (newView) => {
    if (newView !== view) setContextState('view', newView);
  };

  return (
    <footer className="footer">
      <div className="footer-buttons">
        <div className="view-buttons">
          <button className={view === 0 ? 'selected' : ''} type="button" onClick={() => handleOnClick(0)}>Week</button>
          <button className={view === 1 ? 'selected' : ''} type="button" onClick={() => handleOnClick(1)}> Dishes</button>
          <button className={view === 2 ? 'selected' : ''} type="button" onClick={() => handleOnClick(2)}>Ingredients</button>
        </div>
        <button className="signout-button" type="button" onClick={signOut}>
          <i className="fa fa-sign-out" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  signOut: PropTypes.bool.isRequired,
};

export default Footer;
