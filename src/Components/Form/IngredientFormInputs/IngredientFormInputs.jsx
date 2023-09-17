/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import './IngredientFormInputs.css';
import { INGREDIENT_TYPES, INGREDIENT_UNITS } from '../../constants';
import Input from '../../Input';
import Button from '../../Button';

function IngredientFormInputs({ currentData, setCurrentData }) {
  const handleOnChange = ({ target: { value, name: eName } }) => {
    setCurrentData({ ...currentData, [eName]: value });
  };

  const {
    name, type, unit,
  } = currentData;

  return (
    <div className="form-inputs">
      <Input
        autoComplete="off"
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleOnChange}
        placeholder="Name"
        // label="Name"
      />
      <div className="ingredient-item-group">
        <span className="ingredient-item-group-label">Type</span>
        <div className="ingredient-item-group-options">
          {INGREDIENT_TYPES
            .map(({ value, name: tName }) => (
              <Button
                key={value}
                modifier={`ingredient-item-group-button${type === value ? '' : ' not-selected'}`}
                name="type"
                value={value}
                buttonText={tName}
                onClick={handleOnChange}
              />
            ))}
        </div>
      </div>
      <div className="ingredient-item-group">
        <span className="ingredient-item-group-label">Unit</span>
        <div className="ingredient-item-group-options">
          {INGREDIENT_UNITS
            .map(({ value, name: uName }) => (
              <Button
                key={value}
                modifier={`ingredient-item-group-button${unit === value ? '' : ' not-selected'}`}
                name="unit"
                value={value}
                buttonText={uName}
                onClick={handleOnChange}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

IngredientFormInputs.propTypes = {
  setCurrentData: PropTypes.func.isRequired,
  currentData: PropTypes.shape(),

};

IngredientFormInputs.defaultProps = {
  currentData: {},
};

export default IngredientFormInputs;
