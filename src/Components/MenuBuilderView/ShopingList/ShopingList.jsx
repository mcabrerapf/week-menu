import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ToastContext } from '../../../Contexts/ToastContext';
import { buildIngredientSections } from '../../helpers';
import './ShopingList.css';
import ShopingListSection from './ShopingListSection';
import Button from '../../Button';
import Icon from '../../Icon';

function ShopingList({ week }) {
  const { addToast } = useContext(ToastContext);
  const ingredienSections = buildIngredientSections(week);

  const handleCopyShopingList = () => {
    const shopingListItems = [];
    ingredienSections.forEach(({ name, ingredients }, index) => {
      if (!ingredients || !ingredients.length) return;
      if (index !== 0)shopingListItems.push('\n');
      shopingListItems.push(name);
      shopingListItems.push('------');
      ingredients.forEach((ingredient) => {
        if (ingredient.checked) return;
        const { name: iName, quantity, unit } = ingredient;
        shopingListItems.push(`${iName}: ${quantity}${unit}`);
      });
    });
    navigator.clipboard.writeText(shopingListItems.join('\n'));
    addToast('Coppied shoping list to clipboard', 'info');
  };

  return (
    <div className="h-f">
      <div className="col h-f w-f border-rad-10 pad-15 bgc-b">
        <Button modifier="shopping-list-copy-button l icon" onClick={handleCopyShopingList}>
          <Icon iconName="copy" />
        </Button>
        <div className="col overflow-y gap-5 pad-l-5 font-s">
          {ingredienSections.map(({ value, ingredients }) => {
            if (!ingredients.length) return null;
            return (
              <ShopingListSection key={value} name={value} ingredients={ingredients} />
            );
          })}
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
