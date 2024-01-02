import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ToastContext } from '../../../Contexts/ToastContext';
import { buildIngredientSections } from '../../helpers';
import './ShopingList.css';
import ShopingListSection from './ShopingListSection';
import Button from '../../Button';
import Icon from '../../Icon';

function ShopingList({ menuDishes, menuPeople }) {
  const { addToast } = useContext(ToastContext);
  const ingredienSections = buildIngredientSections(menuDishes, menuPeople);

  const handleCopyShopingList = () => {
    const shopingListItems = [];
    Object.keys(ingredienSections).forEach((sectionKey) => {
      const sectionData = ingredienSections[sectionKey];
      sectionData.forEach((data) => {
        const { name, quantity, unit } = data;
        shopingListItems.push(`${name}: ${quantity}${unit}`);
      });
    });
    navigator.clipboard.writeText(shopingListItems.join('\n'));
    addToast('Coppied shoping list to clipboard', 'info');
  };

  if (!ingredienSections.length) return null;

  return (
    <div className="col h-f w-f border-rad-10 pad-10 gap-10 bgc-b">
      <Button modifier="shopping-list-copy-button l icon" onClick={handleCopyShopingList}>
        <Icon iconName="copy" />
      </Button>
      <div className="col overflow-y gap-5 pad-l-5 font-s">
        {ingredienSections.map(({ name, ingredients }) => {
          if (!ingredients.length) return null;
          return (
            <ShopingListSection key={name} name={name} ingredients={ingredients} />
          );
        })}
      </div>
    </div>
  );
}

ShopingList.propTypes = {
  menuDishes: PropTypes.arrayOf(PropTypes.shape()),
  menuPeople: PropTypes.number,

};

ShopingList.defaultProps = {
  menuDishes: [],
  menuPeople: 1,
};

export default ShopingList;
