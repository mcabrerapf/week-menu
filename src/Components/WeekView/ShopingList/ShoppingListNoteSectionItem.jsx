import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import ShoppingListToolTip from './ShoppingListToolTip';

function ShopingListNoteSectionItem({ dishes, label }) {
  const [showTooltip, setShowTooltip] = useState({ show: false, style: {} });
  const { show, style } = showTooltip;

  const handleOnClick = (e) => {
    const {
      target: { offsetLeft, offsetTop },
    } = e;
    const halfWidth = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const halfHeight = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
    const widthOffset = halfWidth < offsetLeft ? 15 : 45;
    const heightOffset = offsetTop < halfHeight ? 20 : -5 * (dishes.length + 1) - 50;
    const offsetTopToUse = offsetTop + heightOffset;
    const offsetLeftToUse = offsetLeft - widthOffset;
    setShowTooltip({ show: !show, style: { top: offsetTopToUse, left: offsetLeftToUse } });
  };

  return (
    <>
      <span role="button" tabIndex={0} className="ingredient-item" onClick={handleOnClick} onKeyDown={handleOnClick}>
        {label}
      </span>
      {show && (
      <ShoppingListToolTip
        ingredientLabel={label}
        dishes={dishes}
        style={style}
        setShowTooltip={setShowTooltip}
      />
      )}
    </>

  );
}

ShopingListNoteSectionItem.propTypes = {
  label: PropTypes.string.isRequired,
  dishes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ShopingListNoteSectionItem;
