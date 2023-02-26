import React from 'react';
import PropTypes from 'prop-types';
import ShopingListItem from './ShopingListItem';

function checkIngredient(ingredient, label, addedItems) {
  const { label: currentLabel, type: currentType } = ingredient;
  if (currentType !== label) return false;
  const isIn = !!addedItems.find((item) => item === currentLabel);
  if (isIn) return false;
  return true;
}

function ShopingListSection({ label, ingredients }) {
  const sectionLabel = label.toUpperCase();
  const addedItems = [];

  return (
    <div className="shoping-list-section">
      <span className="shoping-list-section-label">{sectionLabel}</span>
      <div className="shoping-list-section-items">
        {ingredients.map((ingredient) => {
          const { label: currentLabel } = ingredient;
          const shouldRender = checkIngredient(ingredient, label, addedItems);
          if (!shouldRender) return null;
          addedItems.push(currentLabel);

          return (
            <ShopingListItem key={currentLabel} label={currentLabel} />
          );
        })}
      </div>
    </div>
  );
}

ShopingListSection.propTypes = {
  label: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf().isRequired,
};

export default ShopingListSection;
