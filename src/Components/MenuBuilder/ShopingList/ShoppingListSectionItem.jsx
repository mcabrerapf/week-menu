/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../Input';
import { capitalizeFirstLetter } from '../../helpers';
import { INGREDIENT_UNITS_MATCHES } from '../../../constants/INGREDIENT';
import { converIngredientUnitQuantity } from './helpers';

function ShopingListSectionItem({
  ingredient,
  handleOnClick,
  updatedShopingList,
  sectionIndex,
  index,
}) {
  const {
    name, quantity, unit, checked,
  } = ingredient;

  const parsedName = capitalizeFirstLetter(name);
  const [convertedQuantity, convertedUnit] = converIngredientUnitQuantity(quantity, unit);
  const parsedUnit = INGREDIENT_UNITS_MATCHES[convertedUnit];
  const parsedLabel = `${name}(${quantity}${parsedUnit})`;

  return (
    <div
      className="shoping-list-section-item row a-c gap-5"
    >
      <Input
        id={parsedLabel}
        type="checkbox"
        modifier="xs"
        value={checked}
        onChange={() => updatedShopingList(index, sectionIndex)}
      />
      <span
        className={checked ? 'pad-l-5 strike' : 'pad-l-5'}
        role="button"
        tabIndex={0}
        onClick={() => handleOnClick(ingredient)}
        onKeyDown={() => handleOnClick(ingredient)}
      >
        {parsedName}

      </span>
      <span className="label">
        {convertedQuantity}
        {convertedUnit}
      </span>
    </div>
  );
}

ShopingListSectionItem.propTypes = {
  ingredient: PropTypes.shape().isRequired,
  handleOnClick: PropTypes.func.isRequired,
  updatedShopingList: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  sectionIndex: PropTypes.number.isRequired,
};

export default ShopingListSectionItem;
