import React from 'react';
import PropTypes from 'prop-types';
import './ShoppingListItemModal.css';

function ShoppingListItemModal({
  modalData,
}) {
  const { dishes = [] } = modalData;

  return (
    <ul className="shopping-list-modal-content-list">
      {dishes.map((dish) => (
        <li key={dish} className="shopping-list-modal-content-item">
          {dish}
        </li>
      ))}
    </ul>
  );
}

ShoppingListItemModal.propTypes = {
  modalData: PropTypes.shape().isRequired,
};

export default ShoppingListItemModal;
