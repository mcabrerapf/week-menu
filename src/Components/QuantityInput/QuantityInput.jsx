import React from 'react';
import PropTypes from 'prop-types';
import './QuantityInput.css';
import { parseClassName } from '../helpers';
import Button from '../Button';

function QuantityInput({
  value, labelText, min, max, valueKey, handleDecrease, handleIncrease, modifier,
}) {
  return (
    <div className={parseClassName('quantity-input-container', modifier)}>
      {labelText && <span className="quantity-input-container-label">{labelText}</span>}
      <Button
        modifier="quantity-input-container-button-less"
        buttonText="-"
        disabled={value === min}
        onClick={() => handleDecrease(valueKey)}
      />
      <div className="quantity-input-container-quantity">{value}</div>
      <Button
        modifier="quantity-input-container-button-more"
        buttonText="+"
        disabled={value === max}
        onClick={() => handleIncrease(valueKey)}
      />
    </div>
  );
}

QuantityInput.propTypes = {
  handleDecrease: PropTypes.func.isRequired,
  handleIncrease: PropTypes.func.isRequired,
  valueKey: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  modifier: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.number,
  max: PropTypes.number,

};

QuantityInput.defaultProps = {
  value: '',
  labelText: '',
  modifier: '',
  min: null,
  max: null,
};

export default QuantityInput;
