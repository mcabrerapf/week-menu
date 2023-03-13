import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';

function DisplayModal({
  modalData, setModalMode,
}) {
  const {
    unit, type, description, instructions, ingredients,
  } = modalData;

  return (
    <div className="list-modal-content-display">
      <div className="list-modal-content-display-props">
        {type && (
        <div className="list-modal-content-display-props-prop">
          <span>
            <strong>Type: </strong>
            {type}
          </span>

        </div>
        )}
        {unit && (
        <div className="list-modal-content-display-props-prop">
          <span>
            <strong>Unit: </strong>
            {unit}
          </span>

        </div>
        )}
        {ingredients && (
        <ul className="list-modal-content-display-props-ingredients">
          <li
            className="list-modal-content-display-props-ingredients-label"
          >
            Ingredients:
          </li>
          {ingredients.map(({ id: ingId, name: ingName, quantity }) => (
            <li key={ingId}>
              -
              {' '}
              {ingName}
              :
              {' '}
              {quantity}
            </li>
          ))}
        </ul>
        )}
        {description && (
        <div className="list-modal-content-display-props-prop">
          <span>
            <strong>Description: </strong>
            {description}
          </span>
        </div>
        )}
        {instructions && (
        <div className="list-modal-content-display-props-prop">
          <span>
            <strong>Instructions: </strong>
            {instructions}
          </span>
        </div>
        )}
      </div>
      <Button modifier="edit" buttonText="Edit" onClick={() => setModalMode(2)} />
    </div>
  );
}

DisplayModal.propTypes = {
  setModalMode: PropTypes.func.isRequired,
  modalData: PropTypes.shape(),

};

DisplayModal.defaultProps = {
  modalData: {},
};

export default DisplayModal;
