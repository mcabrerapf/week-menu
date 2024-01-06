/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import ShopingListSectionItem from './ShoppingListSectionItem';
import { ModalContext } from '../../../Contexts';
import Icon from '../../Icon';
import { SHOPING_LIST_ITEM_STRING } from '../../../constants/STRINGS';

function ShopingListSection({
  ingredients, name, index, updatedShopingList,
}) {
  const { addModal } = useContext(ModalContext);
  const [showSection, setShowSection] = useState(true);

  const handleOnClick = (data) => {
    addModal({
      type: SHOPING_LIST_ITEM_STRING,
      modalData: data,
      modifier: 'full',
    });
  };

  return (
    <div className="shoping-list-section col">
      <div
        className="row pad-5 gap-5 border-b"
        role="button"
        onClick={() => setShowSection(!showSection)}
      >
        <Icon modifier="icon" iconName={name} />
        {showSection && <Icon modifier="icon" iconName="chevron-d" />}
        {!showSection && <Icon modifier="icon" iconName="chevron-u" />}
      </div>
      <div className="col gap-10 pad-t-10">
        {showSection && ingredients.map((ingredient, i) => {
          const { id } = ingredient;

          return (
            <ShopingListSectionItem
              key={`${id}-${i}`}
              ingredient={ingredient}
              handleOnClick={handleOnClick}
              sectionIndex={index}
              index={i}
              updatedShopingList={updatedShopingList}
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
  updatedShopingList: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default ShopingListSection;
