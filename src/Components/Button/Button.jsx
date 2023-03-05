import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button({ modifier, handleOnClick, buttonText }) {
  return <button type="button" className={`button${modifier}`} onClick={handleOnClick}>{buttonText}</button>;
}

Button.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  modifier: PropTypes.string,
};

Button.defaultProps = {
  modifier: '',
};

export default Button;
