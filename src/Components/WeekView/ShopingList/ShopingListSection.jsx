import React from 'react';
import PropTypes from 'prop-types';
import ShopingListItem from './ShopingListItem';
import { getSectionIngredients } from '../../helpers';

function ShopingListSection({ label, ingredients }) {
  const sectionLabel = label.toUpperCase();
  const shoppingListItems = [];
  getSectionIngredients(shoppingListItems, label, ingredients);
  if (!shoppingListItems.length) return null;

  return (
    <div className="shoping-list-section">
      <span className="shoping-list-section-label">{sectionLabel}</span>
      <div className="shoping-list-section-items">
        {shoppingListItems.map((item) => (
          <ShopingListItem key={item} label={item} />
        ))}
      </div>
    </div>
  );
}

ShopingListSection.propTypes = {
  label: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ShopingListSection;
