import React from 'react';
import PropTypes from 'prop-types';
import ShopingListItem from './ShopingListItem';

function ShopingListSection({ label, ingredients }) {
  const sectionLabel = label.toUpperCase();
  const addedItems = [];
  ingredients.forEach((ingredient) => {
    const { label: currentLabel, type: currentType } = ingredient;
    if (currentType !== label) return;
    const isIn = !!addedItems.find((item) => item === currentLabel);
    if (isIn) return;
    addedItems.push(currentLabel);
  });
  if (!addedItems.length) return null;

  return (
    <div className="shoping-list-section">
      <span className="shoping-list-section-label">{sectionLabel}</span>
      <div className="shoping-list-section-items">
        {addedItems.map((label) => (
          <ShopingListItem key={label} label={label} />
        ))}
      </div>
    </div>
  );
}

ShopingListSection.propTypes = {
  label: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf().isRequired,
};

export default ShopingListSection;
