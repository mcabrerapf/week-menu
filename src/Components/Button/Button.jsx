import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';
import { parseClassName } from '../helpers';

function Button({
  modifier,
  onClick,
  onMouseDown,
  onMouseLeave,
  onMouseUp,
  onTouchEnd,
  onTouchStart,
  buttonText,
  children,
  value,
  disabled,
}) {
  const baseClassName = `button${disabled ? ' disabled' : ''}`;
  return (
    <button
      type="button"
      className={parseClassName(baseClassName, modifier)}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
      value={value}
      disabled={disabled}
    >
      {buttonText}
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchStart: PropTypes.func,
  buttonText: PropTypes.string,
  children: PropTypes.shape(),
  modifier: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  onMouseDown: () => {},
  onMouseLeave: () => {},
  onMouseUp: () => {},
  onTouchEnd: () => {},
  onTouchStart: () => {},
  buttonText: '',
  modifier: '',
  children: null,
  value: '',
  disabled: false,
};

export default Button;
