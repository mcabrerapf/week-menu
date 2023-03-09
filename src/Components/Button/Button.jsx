import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function parseClassName(className, modifier) {
  if (modifier) return `${className} ${modifier}`;
  return modifier;
}

function Button({
  modifier, handleOnClick, buttonText, children,
}) {
  return (
    <button type="button" className={parseClassName('button', modifier)} onClick={handleOnClick}>
      {buttonText}
      {children}
    </button>
  );
}

Button.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  children: PropTypes.shape(),
  modifier: PropTypes.string,
};

Button.defaultProps = {
  buttonText: '',
  modifier: '',
  children: null,
};

export default Button;
