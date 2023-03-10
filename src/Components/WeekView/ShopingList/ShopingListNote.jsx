import React from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import ShopingListNoteSection from './ShopingListNoteSection';
import { useLongPress } from '../../../Hooks';

function ShopingListNote({ ingredients, hidden }) {
  const handleCopyShopingList = () => {
    const shopingListItems = [];
    Object.keys(ingredients).forEach((sectionKey) => {
      const sectionData = ingredients[sectionKey];
      sectionData.forEach((data) => {
        const { name, quantity } = data;
        shopingListItems.push(`${name}: ${quantity}`);
      });
    });
    navigator.clipboard.writeText(JSON.stringify(shopingListItems.join(', ')));
  };
  const longPressProps = useLongPress({ onLongPress: () => handleCopyShopingList() });

  if (!ingredients) return null;

  return (
    <div className="shoppin-list-note-container">
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...longPressProps}
        className="shoping-list-note"
        style={{ display: hidden ? 'none' : 'block' }}
      >
        {Object.keys(ingredients).map((sectionKey) => {
          const sectionData = ingredients[sectionKey];
          return (
            <ShopingListNoteSection key={sectionKey} label={sectionKey} ingredients={sectionData} />
          );
        })}
      </div>
    </div>

  );
}

ShopingListNote.propTypes = {
  hidden: PropTypes.bool.isRequired,
  ingredients: PropTypes.shape(),

};

ShopingListNote.defaultProps = {
  ingredients: null,
};

export default ShopingListNote;
