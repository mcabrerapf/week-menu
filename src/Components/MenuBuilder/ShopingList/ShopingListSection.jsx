/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import ShopingListSectionItem from './ShoppingListSectionItem';
import Icon from '../../Icon';
import { SHOPING_LIST_ITEM_STRING } from '../../../constants/STRINGS';
import Modal from '../../Modal';

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
    <div className="shoping-list-section col pad-l-15 pad-v-10">
      <div
        className="shoping-list-section-icon row pointer a-c pad-5 gap-5 border-b"
        role="button"
        onClick={() => setShowSection(!showSection)}
      >
        <Icon modifier="icon-xl" iconName={name} />
        <Icon modifier="icon" iconName={`chevron-${showSection ? 'd' : 'u'}`} />
      </div>
      <div className="col gap-10 pad-t-10">
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
