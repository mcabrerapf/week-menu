/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import ShopingListSectionItem from './ShoppingListSectionItem';
import { ModalContext } from '../../../Contexts/ModalContext';
import Icon from '../../Icon';

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
    <div className="shoping-list-section col">
      <div className="row pad-5 border-b">
        <Icon modifier="icon-xl" iconName={label} />
      </div>
      <div className="col gap-5 pad-5">
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
