import React from 'react';
import PropTypes from 'prop-types';
import './ShopingList.css';
import { capitalizeFirstLetter } from '../../helpers';
import ShopingListNoteSectionItem from './ShoppingListNoteSectionItem';

const parseIngredientLabel = (label, i, length, quantity) => {
  const isLast = (i + 1) === length;
  const isFirst = i === 0;
  const parsedQuantity = `(${quantity})`;
  if (isFirst) return `- ${capitalizeFirstLetter(label)}${length > 1 ? ` ${parsedQuantity}, ` : ` ${parsedQuantity}`}`;
  return `${label} ${parsedQuantity}${isLast ? ' ' : ', '}`;
};
function ShopingListNoteSection({ ingredients, label }) {
  if (!ingredients.length) return null;

  return (
    <div className="type-section">
      <h3 className="type-section-header">{capitalizeFirstLetter(label)}</h3>
      <p className="type-section-items">
        {ingredients.map(({ dishes, label: ingredientLabel, quantity }, i) => {
          const { length } = ingredients;
          const parsedLabel = parseIngredientLabel(ingredientLabel, i, length, quantity);
          return (
            <ShopingListNoteSectionItem key={parsedLabel} label={parsedLabel} dishes={dishes} />

          );
        })}
      </p>
    </div>

  );
}

ShopingListNoteSection.propTypes = {
  label: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ShopingListNoteSection;
