/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import './Button.css';

function Button({ handleOnClick }) {
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  return <div role="button" className="food-button" onClick={handleOnClick}><span>Gimme Foooood</span></div>;
}

export default Button;
