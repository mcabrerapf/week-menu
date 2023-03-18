import React from 'react';
import PropTypes from 'prop-types';

function ShoppingListModalContent({
  modalData,
}) {
  const { dishes = [] } = modalData;

  return (
    <ul className="shopping-list-modal-content-list">
      {dishes.map((dish) => (
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
