import React from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import ShopingListNoteSection from './ShopingListNoteSection';
import { useLongPress } from '../../../Hooks';

function ShopingListNote({ ingredienSections, hidden }) {
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

  return (
    <div className="shoppin-list-note-container">
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...longPressProps}
        className="shoping-list-note"
        style={{ display: hidden ? 'none' : 'block' }}
      >
        {Object.keys(ingredienSections).map((sectionKey) => {
          const sectionData = ingredienSections[sectionKey];

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
  ingredienSections: PropTypes.shape(),

};

ShopingListNote.defaultProps = {
  ingredienSections: null,
};

export default ShopingListNote;
