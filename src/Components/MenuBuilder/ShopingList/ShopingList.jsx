/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
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

  const className = `shopping-list col h-a w-a border-rad-10 pad-15 bgc-b overflow-y${show ? '' : ' hidden'}`;
  const hasMoreThanOneList = allShopingLists.length > 2;

  return (
    <div className={className}>
      <div className="shoping-list-buttons col">
        <Button modifier="shopping-list-copy-button xl icon-xl" onClick={handleCopyShopingList}>
          <Icon iconName="clipboard" />
        </Button>
        {hasMoreThanOneList && (
        <Button modifier="shopping-list-copy-button xl icon-xl" onClick={handleToggleCollectiveList}>
          <Icon iconName={`check${isCollectiveListActive ? '-double' : ''}`} />
        </Button>
        )}
      </div>

      <div className="shoping-list-content col h-a w-f overflow-y gap-5 font-m">
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
