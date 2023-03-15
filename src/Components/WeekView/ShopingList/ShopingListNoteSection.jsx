/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import { capitalizeFirstLetter } from '../../helpers';
import ShopingListNoteSectionItem from './ShoppingListNoteSectionItem';
import Modal from '../../Modal';
import ShoppingListModalContent from './ShoppingListModalContent';

function ShopingListNoteSection({ ingredients, label }) {
  const [showTooltip, setShowTooltip] = useState({ show: false, modalData: null });
  const { show, modalData } = showTooltip;

  const handleOnClick = (data) => {
    setShowTooltip({ show: !show, modalData: data });
  };

  if (!ingredients.length) return null;

  return (
    <div className="shoping-list-section">
      <h3 className="shoping-list-section-header">{capitalizeFirstLetter(label)}</h3>
      <div className="shoping-list-section-items">
        {ingredients.map((ingredient) => {
          const { id } = ingredient;

          return (
            <ShopingListNoteSectionItem
              key={id}
              ingredient={ingredient}
              handleOnClick={handleOnClick}
            />

          );
        })}
      </div>
      {show && modalData && (
        <Modal headerText={modalData.name} hideModal={handleOnClick}>
          <ShoppingListModalContent
            modalData={modalData}
          />
        </Modal>
      )}
    </div>

  );
}

ShopingListNoteSection.propTypes = {
  label: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ShopingListNoteSection;
