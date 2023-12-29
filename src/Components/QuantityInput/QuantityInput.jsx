import React from 'react';
import PropTypes from 'prop-types';
import './QuantityInput.css';
import { parseClassName } from '../helpers';
import Button from '../Button';
import Icon from '../Icon';

function QuantityInput({
  value, labelText, min, max, valueKey, handleDecrease, handleIncrease, modifier, iconName,
}) {
  return (
    <div className={parseClassName('col gap-5', modifier)}>
      <div className="quantity-input-label row centered">
        {!!labelText && <span>{labelText}</span>}
        {!!iconName && <Icon iconName={iconName} modifier="icon" />}
      </div>

      <div className="row">
        <Button
          modifier="m"
          disabled={value === min}
          onClick={() => handleDecrease(valueKey)}
        >
          <Icon iconName="minus" />
        </Button>
        <div className="quantity-input-value row centered">{value}</div>
        <Button
          modifier="m"
          disabled={value === max}
          onClick={() => handleIncrease(valueKey)}
        >
          <Icon iconName="plus" />
        </Button>
      </div>

    </div>
  );
}

QuantityInput.propTypes = {
  handleDecrease: PropTypes.func.isRequired,
  handleIncrease: PropTypes.func.isRequired,
  valueKey: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  labelText: PropTypes.string,
  modifier: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.number,
  max: PropTypes.number,

};

QuantityInput.defaultProps = {
  value: '',
  labelText: '',
  iconName: '',
  modifier: '',
  min: null,
  max: null,
};

export default QuantityInput;
