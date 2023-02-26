import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button({ handleOnClick }) {
  return (
    <div role="button" className="food-button" onClick={handleOnClick} onKeyUp={handleOnClick} tabIndex={0}>
      <span>Build Plan</span>
    </div>
  );
}

Button.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default Button;
