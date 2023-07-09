import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import './DisplayMode.css';
import { capitalizeFirstLetter } from '../../helpers';

function DisplayMode({
  modalData, setModalMode, buttonText,
}) {
  const {
    types, servings, time, description, instructions, ingredients,
  } = modalData;

  return (
    <div className="display-mode">
      <div className="display-mode-props">
        {/* {type && (
        <div className="display-mode-props-prop">
          <span>
            <strong>Type: </strong>
            {type}
          </span>

        </div>
        )} */}
        {/* {unit && (
        <div className="display-mode-props-prop">
          <span>
            <strong>Unit: </strong>
            {unit}
          </span>

        </div>
        )} */}
        {types && types.length && (
        <div className="display-mode-props-prop block-prop">
          <span>
            <strong>Type: </strong>
            {types.map((tType) => capitalizeFirstLetter(tType)).join('')}
          </span>

        </div>
        )}
        {servings && (
        <div className="display-mode-props-prop block-prop">
          <span>
            <strong>Serves: </strong>
            {servings}
          </span>

        </div>
        )}

        {time && (
        <div className="display-mode-props-prop block-prop">
          <span>
            <strong>Time: </strong>
            {time.hours}
            :
            {time.minutes}
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
          <h4>Description: </h4>
          <p>{description}</p>
        </div>
        )}
        {instructions && (
        <div className="display-mode-props-prop">
          <h4>Instructions: </h4>
            {instructions.split('---').map((ins, i) => (
              <p>
                {i + 1}
                .
                {' '}
                {ins}
              </p>
            ))}

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
