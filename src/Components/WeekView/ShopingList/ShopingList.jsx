import React from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import ShopingListNoteSection from './ShopingListNoteSection';
import { ToastContext, useToastContext } from '../../../Context';
import Button from '../../Button';

const INGREDIENT_TYPES = ['MEAT', 'FISH', 'FRUIT', 'VEGETABLE', 'SAUCE', 'LIQUOR', 'SPICE', 'OTHER'];

function ShopingList({ ingredienSections, hidden }) {
  const { addToast } = useToastContext(ToastContext);
  const handleCopyShopingList = () => {
    const shopingListItems = [];
    Object.keys(ingredienSections).forEach((sectionKey) => {
      const sectionData = ingredienSections[sectionKey];
      sectionData.forEach((data) => {
        const { name, quantity } = data;
        shopingListItems.push(`${name}: ${quantity}`);
      });
    });
    navigator.clipboard.writeText(JSON.stringify(shopingListItems.join(', ')));
    addToast('Coppied shoping list to clipboard', 'info');
  };

  if (!ingredienSections) return null;
  const className = hidden ? 'shopping-list no-show' : 'shopping-list';

  return (

    <div
        // eslint-disable-next-line react/jsx-props-no-spreading
      className={className}
    >
      <Button modifier="shopping-list-copy-button" onClick={handleCopyShopingList}>
        <i className="fa fa-clipboard" aria-hidden="true" />
      </Button>
      {INGREDIENT_TYPES.map((type) => {
        const sectionData = ingredienSections[type];
        if (!sectionData) return null;
        return (
          <ShopingListNoteSection key={type} label={type} ingredients={sectionData} />
        );
      })}
    </div>

  );
}

ShopingList.propTypes = {
  hidden: PropTypes.bool.isRequired,
  ingredienSections: PropTypes.shape(),

};

ShopingList.defaultProps = {
  ingredienSections: null,
};

export default ShopingList;
