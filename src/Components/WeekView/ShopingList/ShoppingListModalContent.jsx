import React from 'react';
import PropTypes from 'prop-types';

function ShoppingListModalContent({
  dishes,
}) {
  const uniqueDishes = [...new Set([...dishes])];

  return (
    <div
      className="shopping-list-modal-content"

    >
      <ul className="shopping-list-modal-content-list">
        {uniqueDishes.map((dish) => (
          <li key={dish} className="shopping-list-modal-content-item">
            {' '}
            -
            {' '}
            {dish}
          </li>
        ))}
      </ul>
    </div>
  );
}

ShoppingListModalContent.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ShoppingListModalContent;
