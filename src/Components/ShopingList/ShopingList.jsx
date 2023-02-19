import React from 'react';
import ShopingListSection from './ShopingListSection';
import { INGREDIENT_TYPES } from '../constants/INGREDIENTS';

function ShopingList(ingredients) {
  console.log(ingredients);
  if (!ingredients) return null;
  return (
    <div>
      <ShopingListSection label={INGREDIENT_TYPES.meat} />
      <ShopingListSection label={INGREDIENT_TYPES.fish} />
      <ShopingListSection label={INGREDIENT_TYPES.vegetables} />
      <ShopingListSection label={INGREDIENT_TYPES.fruits} />
      <ShopingListSection label={INGREDIENT_TYPES.other} />
    </div>
  );
}

export default ShopingList;
