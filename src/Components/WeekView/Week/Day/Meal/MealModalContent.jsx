import React from 'react';
import PropTypes from 'prop-types';
import './Meal.css';

// TODO: refactor
function MealModalContent({ meal }) {
  const {
    description, instructions, time, ingredients, tags,
  } = meal;
  const parsedTags = tags.map((tag, i) => {
    if (i + 1 < tags.length) return `${tag}, `;
    return tag;
  });

  const parsedIngredients = ingredients.map(({ label }, i) => {
    if (i + 1 < ingredients.length) return `${label}, `;
    return label;
  });

  return (
    <div className="meal-modal-content">
      <ul>
        {!!parsedTags.length && (
        <li>
          <span>Tags:</span>
          {' '}
          {parsedTags}
        </li>
        )}
        {time && (
        <li>
          <span>Time:</span>
          {' '}
          {time}
        </li>
        )}
        <li>
          <span>Ingredients:</span>
          {' '}
          {parsedIngredients}
        </li>
        {description && (
        <li>
          <span>Description:</span>
          {' '}
          {description}
        </li>
        )}
        {instructions && (
        <li>
          <span>Instuctions:</span>
          {' '}
          {instructions}
        </li>
        )}
      </ul>
    </div>
  );
}

MealModalContent.propTypes = {
  meal: PropTypes.shape({
    label: PropTypes.string,
    description: PropTypes.string,
    instructions: PropTypes.string,
    time: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.shape()),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default MealModalContent;
