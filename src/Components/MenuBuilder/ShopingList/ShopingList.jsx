/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ShopingList.scss';
import { copyShopingList } from './helpers';
import { buildShopingLists, deepCopy } from '../../helpers';
import { ToastContext } from '../../../Contexts';
import ShopingListSection from './ShopingListSection';
import Button from '../../Button';
import Icon from '../../Icon';

function ShopingList({ show, weeks, selectedWeekIndex }) {
  const { addToast } = useContext(ToastContext);
  const [allShopingLists, setAllShoppingLists] = useState([]);
  const [isCollectiveListActive, setIsCollectiveListActive] = useState(false);
  const indexToUse = isCollectiveListActive ? allShopingLists.length - 1 : selectedWeekIndex;
  const selectedShopingList = allShopingLists[indexToUse] || [];

  useEffect(
    () => {
      const shopingLists = buildShopingLists(weeks);
      setIsCollectiveListActive(false);
      setAllShoppingLists(shopingLists);
    },
    [weeks],
  );

  useEffect(
    () => {
      setIsCollectiveListActive(false);
    },
    [selectedWeekIndex],
  );

  const handleCopyShopingList = () => {
    copyShopingList(selectedShopingList);
    addToast('Coppied shoping list to clipboard', 'info');
  };

  const handleToggleCollectiveList = () => {
    setIsCollectiveListActive(!isCollectiveListActive);
  };

  const updatedShopingList = (ingredientIndex, sectionIndex) => {
    const copiedLists = deepCopy(allShopingLists);
    const selectedCopiedList = copiedLists[indexToUse];
    selectedCopiedList[sectionIndex].ingredients[ingredientIndex].checked = !selectedCopiedList[sectionIndex].ingredients[ingredientIndex].checked;
    setAllShoppingLists(copiedLists);
  };

  const hasMoreThanOneList = allShopingLists.length > 2;

  return (
    <div className={`shopping-list col h-f w-f border-box border-rad-10 pad-15 bgc-primary overflow-y${show ? '' : ' hidden'}`}>
      <div className="shoping-list__buttons col">
        <Button modifier="shoping-list__buttons__copy bgc-trans icon" onClick={handleCopyShopingList}>
          <Icon iconName="clipboard" />
        </Button>
        {hasMoreThanOneList && (
        <Button modifier="shoping-list__buttons__weeks icon" onClick={handleToggleCollectiveList}>
          <Icon iconName={`check${isCollectiveListActive ? '-double' : ''}`} />
        </Button>
        )}
      </div>
      <div className="shopping-list__sections col h-f w-f overflow-y gap-5">
        {selectedShopingList.map(({ value, ingredients }, index) => (
          <ShopingListSection
            key={value}
            name={value}
            ingredients={ingredients}
            index={index}
            updatedShopingList={updatedShopingList}
          />
        ))}
      </div>
    </div>
  );
}

ShopingList.propTypes = {
  show: PropTypes.bool.isRequired,
  selectedWeekIndex: PropTypes.number.isRequired,
  weeks: PropTypes.arrayOf(PropTypes.shape()).isRequired,

};

export default ShopingList;
