/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import Input from '../../Input';

function ShopingListNoteSectionItem({
  ingredient, handleOnClick,
}) {
  const [gotIt, setGotIt] = useState(false);

  const {
    name, quantity, unit,
  } = ingredient;
  const className = gotIt ? 'shoping-list-section-items-item-name got-it' : 'shoping-list-section-items-item-name';
  const parsedLabel = `${name} (${quantity}${unit})`;

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

ShopingListNoteSectionItem.propTypes = {
  ingredient: PropTypes.shape().isRequired,
  handleOnClick: PropTypes.func.isRequired,
};

export default ShopingListNoteSectionItem;
