/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import { buildIngredientSections, deepCopy } from '../../helpers';
import { ToastContext } from '../../../Contexts';
import ShopingListSection from './ShopingListSection';
import Button from '../../Button';
import Icon from '../../Icon';
import { copyShopingList } from './helpers';

function ShopingList({ week }) {
  const { addToast } = useContext(ToastContext);
  const [ingredietnSections, setIngredientSections] = useState([]);

  useEffect(() => {
    const builtSections = buildIngredientSections(week);
    setIngredientSections(builtSections);
  }, [week]);

  const handleCopyShopingList = () => {
    copyShopingList(ingredietnSections);
    addToast('Coppied shoping list to clipboard', 'info');
  };

  const updatedShopingList = (ingredientIndex, sectionIndex) => {
    const copiedList = deepCopy(ingredietnSections);
    copiedList[sectionIndex].ingredients[ingredientIndex].checked = !copiedList[sectionIndex].ingredients[ingredientIndex].checked;
    setIngredientSections(copiedList);
  };

  return (
    <div className="h-f w-f">
      <div className="col h-f w-f border-rad-10 bgc-b">
        <Button modifier="shopping-list-copy-button l icon" onClick={handleCopyShopingList}>
          <Icon iconName="copy" />
        </Button>
        <div className="col overflow-y gap-5 font-s">
          {ingredietnSections.map(({ value, ingredients }, index) => (
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
    </div>

  );
}

ShopingList.propTypes = {
  week: PropTypes.shape(),

};

ShopingList.defaultProps = {
  week: {},
};

export default ShopingList;
