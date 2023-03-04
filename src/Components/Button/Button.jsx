import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button({ handleOnClick }) {
  return <button type="button" className="food-button" onClick={handleOnClick}>Gimme Foooood</button>;
}

Button.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default Button;
