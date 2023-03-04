import React from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import ShopingListSection from './ShopingListSection';
import { INGREDIENT_TYPES } from '../constants/INGREDIENTS';

function ShopingList({ ingredients }) {
  if (!ingredients) return null;
  const ingredientTypes = Object.keys(INGREDIENT_TYPES).map((key) => INGREDIENT_TYPES[key]);

  return (
    <div className="shoping-list">
      {ingredientTypes
        .map((type) => <ShopingListSection key={type} label={type} ingredients={ingredients} />)}
    </div>
  );
}

ShopingList.propTypes = {
  ingredients: PropTypes.arrayOf().isRequired,
};

export default ShopingList;
