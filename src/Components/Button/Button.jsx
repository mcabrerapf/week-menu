import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Button.css';
import { parseClassName } from '../helpers';
import Icon from '../Icon';

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
  name,
  buttonIcon,
  disableMultipleClicks,
}) {
  const baseClassName = `button${disabled ? ' disabled' : ''}`;
  const [amountOfClicks, setAmountOfClicks] = useState(0);

  return (
    <button
      type="button"
      name={name}
      className={parseClassName(baseClassName, modifier)}
      onClick={(e) => {
        if (disableMultipleClicks && amountOfClicks > 0) return;
        setAmountOfClicks(amountOfClicks + 1);
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
      value={value}
      disabled={disabled}
    >
      {!!buttonIcon && (
        <Icon type={buttonIcon} value={value} />
      )}
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
  children: PropTypes.oneOfType([PropTypes.shape(), PropTypes.arrayOf(PropTypes.shape())]),
  modifier: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  disabled: PropTypes.bool,
  buttonIcon: PropTypes.string,
  name: PropTypes.string,
  disableMultipleClicks: PropTypes.bool,
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
  disableMultipleClicks: false,
  buttonIcon: '',
  name: '',
};

export default Button;
