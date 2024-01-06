/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import Input from '../../Input';
import { capitalizeFirstLetter } from '../../helpers';

// const checkUnitConversion = (q, u) => {
//   if (q > 999) {
//     const parsedQUantity = (q / 1000).toFixed(1);
//     if (u === 'mg') return [parsedQUantity, 'g'];
//     if (u === 'g') return [parsedQUantity, 'kg'];
//     if (u === 'ml') return [parsedQUantity, 'l'];
//   }
//   if (q < 1) {
//     const parsedQUantity = (q * 1000).toFixed(0);
//     if (u === 'g') return [parsedQUantity, 'mg'];
//     if (u === 'kg') return [parsedQUantity, 'g'];
//     if (u === 'l') return [parsedQUantity, 'ml'];
//   }
//   return [q, u];
// };

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
  const parsedLabel = `${capitalizeFirstLetter(name)} (${quantity}${unit})`;

  return (
    <div
      className="shoping-list-item row a-c gap-5"
    >
      <Input
        id={parsedLabel}
        type="checkbox"
        modifier="xs"
        value={checked}
        onChange={() => updatedShopingList(index, sectionIndex)}
      />
      <span
        className={checked ? 'strike' : ''}
        role="button"
        tabIndex={0}
        onClick={() => handleOnClick(ingredient)}
        onKeyDown={() => handleOnClick(ingredient)}
      >
        {parsedName}

      </span>
      <span className="label">
        {quantity}
        {unit}
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
