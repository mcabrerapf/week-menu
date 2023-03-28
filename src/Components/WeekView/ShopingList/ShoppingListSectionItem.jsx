/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import Input from '../../Input';
import { capitalizeFirstLetter } from '../../helpers';

const checkUnitConversion = (q, u) => {
  if (q > 999) {
    const parsedQUantity = (q / 1000).toFixed(1);
    if (u === 'mg') return [parsedQUantity, 'g'];
    if (u === 'g') return [parsedQUantity, 'kg'];
    if (u === 'ml') return [parsedQUantity, 'l'];
  }
  if (q < 1) {
    const parsedQUantity = (q * 1000).toFixed(0);
    if (u === 'g') return [parsedQUantity, 'mg'];
    if (u === 'kg') return [parsedQUantity, 'g'];
    if (u === 'l') return [parsedQUantity, 'ml'];
  }
  return [q, u];
};

function ShopingListSectionItem({
  ingredient, handleOnClick,
}) {
  const [gotIt, setGotIt] = useState(false);

  const {
    name, quantity, unit,
  } = ingredient;
  const className = gotIt ? 'shoping-list-section-items-item-name got-it' : 'shoping-list-section-items-item-name';
  const [convertedQuantity, convertedUnit] = checkUnitConversion(quantity, unit);
  const parsedLabel = `${capitalizeFirstLetter(name)} (${convertedQuantity}${convertedUnit})`;

  return (
    <div
      className="shoping-list-section-items-item"
    >
      <Input
        modifier="shoping-list-section-items-item-checkbox"
        id={parsedLabel}
        type="checkbox"
        value={gotIt}
        onChange={() => setGotIt(!gotIt)}
      >
        <span
          className={className}
          role="button"
          tabIndex={0}
          onClick={() => handleOnClick(ingredient)}
          onKeyDown={() => handleOnClick(ingredient)}
        >
          {parsedLabel}
        </span>
      </Input>
    </div>
  );
}

ShopingListSectionItem.propTypes = {
  ingredient: PropTypes.shape().isRequired,
  handleOnClick: PropTypes.func.isRequired,
};

export default ShopingListSectionItem;
