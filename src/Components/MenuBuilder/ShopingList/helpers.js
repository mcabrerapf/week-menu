import { findByKey } from '../../helpers';

/* eslint-disable import/prefer-default-export */
const copyShopingList = (ingredietnSections) => {
  const shopingListItems = [];
  ingredietnSections.forEach(({ name, ingredients }) => {
    if (!ingredients || !ingredients.length) return;
    const hasUnchecked = !!findByKey(ingredients, false, 'checked');

    if (!hasUnchecked) return;
    shopingListItems.push(name);
    shopingListItems.push('------');
    ingredients.forEach((ingredient) => {
      if (ingredient.checked) return;
      const { name: iName, quantity, unit } = ingredient;
      shopingListItems.push(`${iName}: ${quantity}${unit}`);
    });
    shopingListItems.push('\n');
  });
  navigator.clipboard.writeText(shopingListItems.join('\n'));
};

const converIngredientUnitQuantity = (q, u) => {
  if (q > 999) {
    const parsedQUantity = (q / 1000).toFixed(1);
    if (u === 'mg') return [parsedQUantity, 'g'];
    if (u === 'g') return [parsedQUantity, 'kg'];
    if (u === 'ml') return [parsedQUantity, 'l'];
  }
  if (q < 1) {
    const parsedQUantity = (q * 1000).toFixed(0);
    if (u === 'g') return [parsedQUantity, 'mg'];
    if (u === 'kg') return [parsedQUantity, 'g'];
    if (u === 'l') return [parsedQUantity, 'ml'];
  }
  return [q, u];
};

export { copyShopingList, converIngredientUnitQuantity };
