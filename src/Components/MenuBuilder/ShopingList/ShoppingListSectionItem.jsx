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
      className="shopping-list__sections__section__items__item row a-c gap-5"
    >
      <Input
        id={parsedLabel}
        type="checkbox"
        value={checked}
        onChange={() => updatedShopingList(index, sectionIndex)}
      />
      <span
        className={checked ? 'pad-l-5 font-l strike' : 'pad-l-5 font-l'}
        role="button"
        tabIndex={0}
        onClick={() => handleOnClick(ingredient)}
        onKeyDown={() => handleOnClick(ingredient)}
      >
        {parsedName}

      </span>
      <span className="label font-l">
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
