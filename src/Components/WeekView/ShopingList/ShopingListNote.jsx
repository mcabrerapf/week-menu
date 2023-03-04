import React from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import ShopingListNoteSection from './ShopingListNoteSection';

function ShopingListNote({ ingredients }) {
  return (
    <div className="shoping-list-note">
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
  ingredients: PropTypes.PropTypes.shape().isRequired,
};

export default ShopingListNote;
