import React from 'react';
import ShopingListItem from './ShopingListItem';

function ShopingListSection({ label, ingredients }) {
  if (!ingredients.length) return null;
  const sectionLabel = label.toUpperCase();
  const addedItems = [];

  return (
    <div className="shoping-list-section">
      <span className="shoping-list-section-label">{sectionLabel}</span>
      <div className="shoping-list-section-items">
        {ingredients.map((ingredient) => {
          const { label: currentLabel, type: currentType } = ingredient;
          if (currentType !== label) return null;
          const isIn = !!addedItems.find((item) => item === currentLabel);
          console.log({ currentLabel, isIn, addedItems });
          if (isIn) return null;
          addedItems.push(currentLabel);
          return (
            <ShopingListItem key={currentLabel} label={currentLabel} />
          );
        })}
      </div>
    </div>
  );
}

export default ShopingListSection;
