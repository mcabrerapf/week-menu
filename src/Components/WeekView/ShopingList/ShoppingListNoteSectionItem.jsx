import React from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';

function ShopingListNoteSectionItem({
  ingredient, label, handleOnClick,
}) {
  return (
    <span
      role="button"
      tabIndex={0}
      className="ingredient-item"
      onClick={() => handleOnClick(ingredient)}
      onKeyDown={() => handleOnClick(ingredient)}
    >
      {label}
    </span>
  );
}

ShopingListNoteSectionItem.propTypes = {
  label: PropTypes.string.isRequired,
  ingredient: PropTypes.shape().isRequired,
  handleOnClick: PropTypes.func.isRequired,
};

export default ShopingListNoteSectionItem;
