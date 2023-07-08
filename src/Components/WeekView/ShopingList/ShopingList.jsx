import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ToastContext } from '../../../Contexts/ToastContext';
import { buildIngredientSections } from '../../helpers';
import './ShopingList.css';
import ShopingListSection from './ShopingListSection';
import Button from '../../Button';

const INGREDIENT_TYPES = ['MEAT', 'FISH', 'FRUIT', 'VEGETABLE', 'SAUCE', 'LIQUOR', 'SPICE', 'OTHER'];

function ShopingList({ menuDishes, menuPeople, hidden }) {
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

  if (!ingredienSections) return null;
  const className = hidden ? 'shopping-list no-show' : 'shopping-list';

  return (

    <div
      className={className}
    >
      <Button modifier="shopping-list-copy-button" onClick={handleCopyShopingList}>
        <i className="fa fa-clipboard" aria-hidden="true" />
      </Button>
      <div className="shopping-list-sections">
        {INGREDIENT_TYPES.map((type) => {
          const sectionData = ingredienSections[type];
          if (!sectionData) return null;
          return (
            <ShopingListSection key={type} label={type} ingredients={sectionData} />
          );
        })}
      </div>

    </div>

  );
}

ShopingList.propTypes = {
  hidden: PropTypes.bool.isRequired,
  menuDishes: PropTypes.arrayOf(PropTypes.shape()),
  menuPeople: PropTypes.number,

};

ShopingList.defaultProps = {
  menuDishes: [],
  menuPeople: 1,
};

export default ShopingList;
