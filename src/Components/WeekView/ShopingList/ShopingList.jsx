import React from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import ShopingListNoteSection from './ShopingListNoteSection';
import { useLongPress } from '../../../Hooks';

const INGREDIENT_TYPES = ['MEAT', 'FISH', 'FRUIT', 'VEGETABLE', 'SAUCE', 'LIQUOR', 'SPICE', 'OTHER'];

function ShopingList({ ingredienSections, hidden }) {
  const handleCopyShopingList = () => {
    const shopingListItems = [];
    Object.keys(ingredienSections).forEach((sectionKey) => {
      const sectionData = ingredienSections[sectionKey];
      sectionData.forEach((data) => {
        const { name, quantity } = data;
        shopingListItems.push(`${name}: ${quantity}`);
      });
    });
    navigator.clipboard.writeText(JSON.stringify(shopingListItems.join(', ')));
  };
  const longPressProps = useLongPress({ onLongPress: () => handleCopyShopingList() });

  if (!ingredienSections) return null;
  const className = hidden ? 'shopping-list no-show' : 'shopping-list';

  return (

    <div
        // eslint-disable-next-line react/jsx-props-no-spreading
      {...longPressProps}
      className={className}
    >
      {INGREDIENT_TYPES.map((type) => {
        const sectionData = ingredienSections[type];
        if (!sectionData) return null;
        return (
          <ShopingListNoteSection key={type} label={type} ingredients={sectionData} />
        );
      })}
    </div>

  );
}

ShopingList.propTypes = {
  hidden: PropTypes.bool.isRequired,
  ingredienSections: PropTypes.shape(),

};

ShopingList.defaultProps = {
  ingredienSections: null,
};

export default ShopingList;
