/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import './DisplayMode.css';
import { capitalizeFirstLetter } from '../../helpers';

function DisplayMode({
  modalData, setModalMode,
}) {
  const {
    types, servings, time, description, instructions, ingredients,
  } = modalData;

  const displayTime = !!time && !!(time.hours || time.minutes);

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

        {displayTime && (
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
              {`- ${ingName}: ${quantity}`}
              <b>{ingUnit}</b>
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
              <p key={i}>
                {i + 1}
                .
                {' '}
                {ins}
              </p>
            ))}

        </div>
        )}
      </div>
      <div className="display-mode-footer">
        <Button modifier="edit" onClick={() => setModalMode('edit')}>
          <i className="fa fa-pencil" aria-hidden="true" />
        </Button>
        <Button modifier="edit" onClick={() => setModalMode('edit')}>
          <i className="fa fa-trash" aria-hidden="true" />
        </Button>
      </div>

    </div>
  );
}

DisplayMode.propTypes = {
  setModalMode: PropTypes.func.isRequired,
  modalData: PropTypes.shape(),

};

DisplayMode.defaultProps = {
  modalData: {},
};

export default DisplayMode;
