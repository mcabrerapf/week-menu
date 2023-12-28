import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../Button';
import Input from '../../../Input';
import { buildSelectOptions, capitalizeFirstLetter, sortBy } from '../../../helpers';
import { SELECT_OPTIONS } from '../../../constants';
import { INGREDIENT_STRING } from '../../../../constants';
import Icon from '../../../Icon';

function IngredientsField({
  ingredients, handleIngredientChange, handleRemoveIngredient,
}) {
  const sortedIngredients = sortBy(ingredients, 'name', 'alphabetical');
  return (
    <div className="form-ingredients">
      {!sortedIngredients.length && <div>No ingredients...</div>}
      {sortedIngredients.map((currentIngredient) => {
        const {
          id, name, quantity, unit,
        } = currentIngredient;

        return (
          <div className="form-ingredients-ingredient border-b" key={id}>
            <div className="form-ingredients-ingredient-name">{capitalizeFirstLetter(name)}</div>
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
              {/* <div className="form-ingredients-ingredient-unit">{unit}</div> */}
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
                {buildSelectOptions(SELECT_OPTIONS[INGREDIENT_STRING].unit, 'name')}
              </select>

              <Button
                modifier="form-ingredients-ingredient-remove"
                aria-label={`remove-${id}`}
                type="button"
                value={id}
                onClick={() => handleRemoveIngredient(id)}
              >
                <Icon iconName="close" />
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
