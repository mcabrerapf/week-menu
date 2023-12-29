import React from 'react';
import PropTypes from 'prop-types';

function ShoppingListItemModal({
  modalData,
}) {
  const { dishes = [] } = modalData;

  return (
    <div className="shopping-list-modal-content pad-10">
      <ul className="shopping-list-modal-content-list">
        {dishes.map((dish) => (
          <li key={dish} className="shopping-list-modal-content-list--item">
            -
            {' '}
            {dish}
          </li>
        ))}
      </ul>
    </div>

  );
}

ShoppingListItemModal.propTypes = {
  modalData: PropTypes.shape().isRequired,
};

export default ShoppingListItemModal;
