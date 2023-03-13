import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import Button from '../Button';
import { buildSelectOptions } from '../helpers';
import { SELECT_OPTIONS } from '../constants';
import {
  INGREDIENT_STRING,
} from '../../constants';

function IngredientsField({
  ingredients, handleIngredientChange, handleRemoveIngredient,
}) {
  const setCursorOnInputEnd = (event) => {
    const { value } = event.target;
    const position = value.length;
    event.target.setSelectionRange(position, position);
  };

  return (
    <div className="form-ingredients">
      {ingredients.map((currentIngredient) => {
        const {
          id, name, quantity, unit,
        } = currentIngredient;

        return (
          <div className="form-ingredients-ingredient" key={id}>
            <div className="form-ingredients-ingredient-name">{name}</div>
            <div className="form-ingredients-ingredient-quantity-container">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="form-ingredients-ingredient-quantity"
                aria-label={id}
                key={id}
                id={id}
                name="quantity"
                value={quantity}
                onClick={setCursorOnInputEnd}
                onFocus={() => handleIngredientChange(id, 'quantity', null)}
                onBlur={() => !quantity && handleIngredientChange(id, 'quantity', 1)}
                onChange={({ target: { value } }) => !!value && handleIngredientChange(id, 'quantity', value)}
              />
              <select
                className="form-ingredients-ingredient-unit"
                id={id}
                name="unit"
                value={unit}
                onChange={({ target: { value } }) => handleIngredientChange(id, 'unit', value)}
              >
                <option value="" className="form-select-option" disabled>
                  Choose a unit...
                </option>
                {buildSelectOptions(SELECT_OPTIONS[INGREDIENT_STRING].unit, 'value')}
              </select>
              <Button
                modifier="form-ingredients-ingredient-remove"
                aria-label={`remove-${id}`}
                type="button"
                value={id}
                onClick={() => handleRemoveIngredient(id)}
              >
                <i className="fa fa-times" aria-hidden="true" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>

  );
}

IngredientsField.propTypes = {
  handleIngredientChange: PropTypes.func.isRequired,
  handleRemoveIngredient: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape()),
};

IngredientsField.defaultProps = {
  ingredients: [],
};

export default IngredientsField;
