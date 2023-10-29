/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import { capitalizeFirstLetter } from '../../helpers';
import ShopingListSectionItem from './ShoppingListSectionItem';
import { ModalContext } from '../../../Contexts/ModalContext';

function ShopingListSection({ ingredients, label }) {
  const { addModal } = useContext(ModalContext);

  const handleOnClick = (data) => {
    addModal({
      type: 'shopingListItem',
      modalData: data,
      modifier: 'full',
    });
  };

  if (!ingredients.length) return null;

  return (
    <div className="shoping-list-section">
      <h3 className="shoping-list-section-header">{capitalizeFirstLetter(label)}</h3>
      <div className="shoping-list-section-items">
        {ingredients.map((ingredient, i) => {
          const { id } = ingredient;

          return (
            <ShopingListSectionItem
              key={`${id}-${i}`}
              ingredient={ingredient}
              handleOnClick={handleOnClick}
            />

          );
        })}
      </div>

    </div>

  );
}

ShopingListSection.propTypes = {
  label: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ShopingListSection;
