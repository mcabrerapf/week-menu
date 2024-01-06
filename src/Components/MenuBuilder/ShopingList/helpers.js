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

export { copyShopingList };
