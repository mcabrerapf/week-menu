/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import ShopingListSectionItem from './ShoppingListSectionItem';
import { ModalContext } from '../../../Contexts/ModalContext';
import Icon from '../../Icon';
import { SHOPING_LIST_ITEM_STRING } from '../../../constants';

function ShopingListSection({ ingredients, name }) {
  const { addModal } = useContext(ModalContext);

  const handleOnClick = (data) => {
    addModal({
      type: SHOPING_LIST_ITEM_STRING,
      modalData: data,
      modifier: 'full',
    });
  };

  return (
    <div className="shoping-list-section col">
      <div className="row pad-10 border-b">
        <Icon modifier="icon-xl" iconName={name} />
      </div>
      <div className="col gap-10 pad-10">
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
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ShopingListSection;
