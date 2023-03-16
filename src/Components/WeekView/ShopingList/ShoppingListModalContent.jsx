import React from 'react';
import PropTypes from 'prop-types';

function ShoppingListModalContent({
  modalData,
}) {
  const { dishes = [] } = modalData;
  const uniqueDishes = [...new Set(dishes.map(({ name } = {}) => name))];

  return (
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
  );
}

ShoppingListModalContent.propTypes = {
  modalData: PropTypes.shape().isRequired,
};

export default ShoppingListModalContent;
