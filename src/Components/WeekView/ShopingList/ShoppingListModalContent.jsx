import React from 'react';
import PropTypes from 'prop-types';

function ShoppingListModalContent({
  modalData,
}) {
  const { dishes } = modalData;

  return (
    <div
      className="shopping-list-modal-content"

    >
      <ul className="shopping-list-modal-content-list">
        {dishes.map((dish) => (
          <li key={dish.id} className="shopping-list-modal-content-item">
            {' '}
            -
            {' '}
            {dish.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

ShoppingListModalContent.propTypes = {
  modalData: PropTypes.shape().isRequired,
};

export default ShoppingListModalContent;
