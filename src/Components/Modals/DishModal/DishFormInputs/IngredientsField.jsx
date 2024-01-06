import React from 'react';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter, sortBy } from '../../../helpers';
import { SELECT_OPTIONS } from '../../../../constants';
import { INGREDIENT_STRING } from '../../../../constants/STRINGS';
import Icon from '../../../Icon';
import Button from '../../../Button';
import Input from '../../../Input';

function IngredientsField({
  ingredients, handleIngredientChange, handleRemoveIngredient,
}) {
  const sortedIngredients = sortBy(ingredients, 'name', 'alphabetical');
  return (
    <div className="dish-modal-ingredients-list col overflow-y gap-5">
      {sortedIngredients.map((currentIngredient) => {
        const {
          id, name, quantity, unit,
        } = currentIngredient;

        return (
          <div className="row gap-5 w-f j-bet border-b" key={id}>
            <div className="row">{capitalizeFirstLetter(name)}</div>
            <div className="row j-end gap-5">
              <Input
                type="number"
                key={id}
                id={id}
                name="quantity"
                modifier="s bgc-tr"
                value={quantity}
                resetValueOnClick
                min={1}
                onFocus={handleIngredientChange}
                onBlur={handleIngredientChange}
                onChange={handleIngredientChange}
              />
              <Input
                type="select"
                modifier="bgc-tr font-xs s"
                value={unit}
                id={id}
                name="unit"
                onChange={handleIngredientChange}
                placeholder="Choose unit..."
                selectOptions={SELECT_OPTIONS[INGREDIENT_STRING].unit}
              />
              <Button
                modifier="square m bgc-bg icon"
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
