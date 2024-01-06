/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './DisplayView.css';
import Button from '../../../Button';
import Icon from '../../../Icon';
import { INGREDIENT_UNITS_MATCHES } from '../../../../constants/INGREDIENT';

function DisplayView({
  dishData,
  setModalView,
}) {
  const {
    types, servings, time, instructions, ingredients,
  } = dishData;

  const displayTime = !!time && !!(time.hours || time.minutes);

  return (
    <div className="modal-content-dish-view col j-bet pad-10 gap-10">
      <div className="col gap-20 overflow-y">
        <div className="row gap-20">
          {!!types && !!types.length && (
          <div className="row width-a">
            {types.map((tType) => <Icon key={tType} iconName={tType} modifier="icon-l" />)}
          </div>
          )}
          {servings && (
          <div className="row w-a centered gap-10">
            <Icon iconName="people" modifier="icon-l" />
            <span className="label">
              {' '}
              {servings}
            </span>
          </div>
          )}

          {displayTime && (
          <div className="row w-a centered gap-10">
            <Icon iconName="clock" modifier="icon-l" />
            <span className="label">
              {time.hours}
              :
              {time.minutes}
            </span>

          </div>
          )}
        </div>
        {!!ingredients && !!ingredients.length && (
          <div className="col border-t pad-5">
            <ul className="col gap-5">
              {ingredients.map(({
                id: ingId, name: ingName, quantity, unit: ingUnit,
              }) => (
                <li key={ingId} className="row gap-5 text-a-l">
                  <span>- </span>
                  <span>{ingName}</span>
                  <span className="label">
                    {quantity}
                    {INGREDIENT_UNITS_MATCHES[ingUnit]}
                  </span>

                </li>
              ))}
            </ul>
          </div>

        )}
        {/* {description && (
        <div className="col">
          <span>
            <strong>Description: </strong>
          </span>
          <p>{description}</p>
        </div>
        )} */}
        {instructions && (
        <div className="col border-t pad-5">
          <ul className="col gap-5">
            {instructions.split('---').map((ins, i) => (
              <li key={i} className="row gap-5 text-a-l">
                <span>{`${i + 1}.`}</span>
                <span>{ins}</span>
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
      <div>
        <Button modifier="icon" onClick={() => setModalView('edit')}>
          <Icon iconName="edit" />
        </Button>
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
