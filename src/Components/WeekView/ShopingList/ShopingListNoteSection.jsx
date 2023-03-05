/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import { capitalizeFirstLetter, parseIngredientLabel } from '../../helpers';
import ShopingListNoteSectionItem from './ShoppingListNoteSectionItem';
import Modal from '../../Modal';
import ShoppingListToolTip from './ShoppingListToolTip';

function ShopingListNoteSection({ ingredients, label }) {
  const [showTooltip, setShowTooltip] = useState({ show: false, modalProps: {}, tooltipProps: {} });
  const { show, modalProps, tooltipProps } = showTooltip;

  const handleOnClick = (props = {}) => {
    setShowTooltip({ ...props, show: !show });
  };

  if (!ingredients.length) return null;

  return (
    <div className="type-section">
      <h3 className="type-section-header">{capitalizeFirstLetter(label)}</h3>
      <p className="type-section-items">
        {ingredients.map(({ dishes, label: ingredientLabel, quantity }, i) => {
          const { length } = ingredients;
          const parsedLabel = parseIngredientLabel(ingredientLabel, i, length, quantity);
          return (
            <ShopingListNoteSectionItem
              key={parsedLabel}
              label={parsedLabel}
              baseLabel={ingredientLabel}
              dishes={dishes}
              setShowTooltip={handleOnClick}
            />

          );
        })}
      </p>
      {show && (
        <Modal {...modalProps} hideModal={handleOnClick}>
          <ShoppingListToolTip
            {...tooltipProps}
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
