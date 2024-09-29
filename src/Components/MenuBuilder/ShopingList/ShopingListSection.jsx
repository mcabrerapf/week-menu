/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShopingListSectionItem from './ShoppingListSectionItem';
import Icon from '../../Icon';
import Modal from '../../Modal';
import { SHOPING_LIST_ITEM_STRING } from '../../../constants/STRINGS';

function ShopingListSection({
  ingredients, name, index, updatedShopingList,
}) {
  const [showSection, setShowSection] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleOnClick = (data) => {
    setModalData({
      type: SHOPING_LIST_ITEM_STRING,
      ingredientData: data,
      headerText: data.name,
      modifier: 'f',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <div className="shopping-list__sections__section col">
      <div
        className="shopping-list__sections__section__icon row border-box pointer a-c h-4 pad-5 gap-10 border-b"
        role="button"
        onClick={() => setShowSection(!showSection)}
      >
        <Icon modifier="icon-xl" iconName={name} />
        <Icon modifier="icon-xl" iconName={`chevron-${showSection ? 'd' : 'u'}`} />
      </div>
      <div className="shopping-list__sections__section__items col border-box gap-10 pad-t-10">
        {showSection && ingredients.map((ingredient, i) => {
          const { id, unit, quantity } = ingredient;

          return (
            <ShopingListSectionItem
              // eslint-disable-next-line react/no-array-index-key
              key={`${id}-${unit}-${quantity}-${i}`}
              ingredient={ingredient}
              handleOnClick={handleOnClick}
              sectionIndex={index}
              index={i}
              updatedShopingList={updatedShopingList}
            />

          );
        })}
      </div>
      {showModal && <Modal modalData={modalData} closeModal={closeModal} />}
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
