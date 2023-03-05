import React from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import ShopingListNoteSection from './ShopingListNoteSection';

function ShopingListNote({ ingredients, hidden }) {
  if (!ingredients) return null;

  return (
    <div className="shoping-list-note" style={{ display: hidden ? 'none' : 'block' }}>
      {Object.keys(ingredients).map((sectionKey) => {
        const sectionData = ingredients[sectionKey];
        return (
          <ShopingListNoteSection key={sectionKey} label={sectionKey} ingredients={sectionData} />
        );
      })}
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
