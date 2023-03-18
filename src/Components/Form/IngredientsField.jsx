import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import Button from '../Button';
import { buildSelectOptions } from '../helpers';
import { SELECT_OPTIONS } from '../constants';
import {
  INGREDIENT_STRING,
} from '../../constants';
import Input from '../Input';

function IngredientsField({
  ingredients, handleIngredientChange, handleRemoveIngredient,
}) {
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
              <Input
                type="number"
                modifier="form-ingredients-ingredient-quantity"
                key={id}
                id={id}
                name="quantity"
                value={quantity}
                resetValueOnClick
                min={1}
                onFocus={handleIngredientChange}
                onBlur={handleIngredientChange}
                onChange={handleIngredientChange}
              />
              <select
                className="form-ingredients-ingredient-unit"
                id={id}
                name="unit"
                value={unit}
                onChange={handleIngredientChange}
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
