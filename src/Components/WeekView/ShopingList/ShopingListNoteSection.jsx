/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import { capitalizeFirstLetter, parseIngredientLabel } from '../../helpers';
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
    <div className="type-section">
      <h3 className="type-section-header">{capitalizeFirstLetter(label)}</h3>
      <p className="type-section-items">
        {ingredients.map((ingredient, i) => {
          const { name, quantity } = ingredient;
          const { length } = ingredients;
          const parsedLabel = parseIngredientLabel(name, i, length, quantity);

          return (
            <ShopingListNoteSectionItem
              key={parsedLabel}
              label={parsedLabel}
              ingredient={ingredient}
              quantity={quantity}
              handleOnClick={handleOnClick}
            />

          );
        })}
      </p>
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
