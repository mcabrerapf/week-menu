import React from 'react';
import PropTypes from 'prop-types';
import './MenuModal.css';

import Button from '../Button';

function QuantityInput({
  value, labelText, min, max, valueKey, handleDecrease, handleIncrease,
}) {
  return (
    <div className="quantity-input-container">
      {labelText && <span className="quantity-input-container-label">{labelText}</span>}
      <Button
        modifier="quantity-input-container-button-less"
        buttonText="-"
        disabled={value === min}
        onClick={() => handleDecrease(valueKey)}
      />
      <span className="quantity-input-container-quantity">{value}</span>
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.number,
  max: PropTypes.number,

};

QuantityInput.defaultProps = {
  value: '',
  labelText: '',
  min: null,
  max: null,
};

export default QuantityInput;
