import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import './DisplayMode.css';

function DisplayMode({
  modalData, setModalMode, buttonText,
}) {
  const {
    name, unit, type, description, instructions, ingredients,
  } = modalData;

  return (
    <div className="display-mode">
      <div className="display-mode-props">
        {name && (
        <div className="display-mode-props-prop">
          <span>
            <strong>Name: </strong>
            {name}
          </span>

        </div>
        )}
        {type && (
        <div className="display-mode-props-prop">
          <span>
            <strong>Type: </strong>
            {type}
          </span>

        </div>
        )}
        {unit && (
        <div className="display-mode-props-prop">
          <span>
            <strong>Unit: </strong>
            {unit}
          </span>

        </div>
        )}
        {ingredients && (
        <ul className="display-mode-props-ingredients">
          <li
            className="display-mode-props-ingredients-label"
          >
            Ingredients:
          </li>
          {ingredients.map(({
            id: ingId, name: ingName, quantity, unit: ingUnit,
          }) => (
            <li key={ingId}>
              {`- ${ingName}: ${quantity} (${ingUnit})`}
            </li>
          ))}
        </ul>
        )}
        {description && (
        <div className="display-mode-props-prop">
          <span>
            <strong>Description: </strong>
            {description}
          </span>
        </div>
        )}
        {instructions && (
        <div className="display-mode-props-prop">
          <span>
            <strong>Instructions: </strong>
            {instructions}
          </span>
        </div>
        )}
      </div>
      <Button modifier="edit" buttonText={buttonText} onClick={() => setModalMode('edit')} />
    </div>
  );
}

DisplayMode.propTypes = {
  setModalMode: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  modalData: PropTypes.shape(),

};

DisplayMode.defaultProps = {
  modalData: {},
  buttonText: '',
};

export default DisplayMode;
