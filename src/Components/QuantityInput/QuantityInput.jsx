import React from 'react';
import PropTypes from 'prop-types';
import { parseClassName } from '../helpers';
import Button from '../Button';
import Icon from '../Icon';

function QuantityInput({
  value,
  labelText,
  min,
  max,
  valueKey,
  valueIndex,
  handleDecrease,
  handleIncrease,
  modifier,
  iconName,
}) {
  return (
    <div className={parseClassName('col gap-10', modifier)}>
      <div className="quantity-input-label row centered">
        {!!labelText && <span>{labelText}</span>}
        {!!iconName && <Icon iconName={iconName} modifier="icon" />}
      </div>

      <div className="row">
        <Button
          modifier="icon"
          disabled={value === min}
          onClick={() => handleDecrease(valueKey, valueIndex)}
        >
          <Icon iconName="minus" />
        </Button>
        <div className="row centered w-4 font-l">{value}</div>
        <Button
          modifier="icon"
          disabled={value === max}
          onClick={() => handleIncrease(valueKey, valueIndex)}
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
  valueKey: PropTypes.string,
  valueIndex: PropTypes.number,
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
  valueKey: null,
  valueIndex: null,
  min: null,
  max: null,
};

export default QuantityInput;
