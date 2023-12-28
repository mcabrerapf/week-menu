/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './DisplayView.css';
import { capitalizeFirstLetter } from '../../../helpers';
import Button from '../../../Button';
import Icon from '../../../Icon';

function DisplayView({
  dishData,
  setModalView,
}) {
  const {
    types, servings, time, description, instructions, ingredients,
  } = dishData;

  const displayTime = !!time && !!(time.hours || time.minutes);

  return (
    <div className="display-view">
      <div className="display-view-props">
        {!!types && !!types.length && (
        <div className="display-view-props-prop block-prop">
          <span>
            <strong>Type: </strong>
            {types.map((tType) => capitalizeFirstLetter(tType)).join('')}
          </span>

        </div>
        )}
        {servings && (
        <div className="display-view-props-prop block-prop">
          <span>
            <strong>Serves: </strong>
            {servings}
          </span>

        </div>
        )}

        {displayTime && (
        <div className="display-view-props-prop block-prop">
          <span>
            <strong>Time: </strong>
            {time.hours}
            :
            {time.minutes}
          </span>

        </div>
        )}

        {!!ingredients && !!ingredients.length && (
        <ul className="display-view-props-ingredients">
          <li
            className="display-view-props-ingredients-label"
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
        <div className="display-view-props-prop">
          <h4>Description: </h4>
          <p>{description}</p>
        </div>
        )}
        {instructions && (
        <div className="display-view-props-prop">
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
      <div className="display-view-footer">
        <Button modifier="icon" onClick={() => setModalView('edit')}>
          <Icon iconName="edit" />
        </Button>
        {/* <Button modifier="delete">
          <DeleteIcon />
        </Button> */}
      </div>
    </div>
  );
}

DisplayView.propTypes = {
  dishData: PropTypes.shape(),
  setModalView: PropTypes.func.isRequired,

};

DisplayView.defaultProps = {
  dishData: {},
};

export default DisplayView;
