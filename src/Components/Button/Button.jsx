import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button({ handleOnClick }) {
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  return <div role="button" className="food-button" onClick={handleOnClick}>Gimme Foooood</div>;
}

Button.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default Button;
