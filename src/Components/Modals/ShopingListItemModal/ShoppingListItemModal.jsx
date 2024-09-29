import React from 'react';
import PropTypes from 'prop-types';

function ShoppingListItemModal({
  modalData,
}) {
  const { ingredientData: { dishes = [] } = {} } = modalData;

  return (
    <div className="col pad-20">
      <ul className="col">
        {dishes.map((dish) => {
          const {
            id: dishId, name, quantity, unit,
          } = dish;
          return (
            <li key={dishId} className="row gap-5 font-l">
              <span>{`- ${name}`}</span>
              <span className="label">
                {quantity}
                {unit}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

ShoppingListItemModal.propTypes = {
  modalData: PropTypes.shape().isRequired,
};

export default ShoppingListItemModal;
