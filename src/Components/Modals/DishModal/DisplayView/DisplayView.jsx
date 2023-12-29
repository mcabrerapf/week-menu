/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './DisplayView.css';
// import { capitalizeFirstLetter } from '../../../helpers';
import Button from '../../../Button';
import Icon from '../../../Icon';

function DisplayView({
  dishData,
  setModalView,
}) {
  const {
    types, servings, time, instructions, ingredients,
  } = dishData;

  const displayTime = !!time && !!(time.hours || time.minutes);

  return (
    <div className="modal-content-dish-view col justify-between pad-10 gap-10">
      <div className="dish-props col gap-20">
        <div className="row gap-20">
          {!!types && !!types.length && (
          <div className="row width-a">
            {/* <span> */}
            {/* <strong>Type: </strong> */}
            {types.map((tType) => <Icon iconName={tType} modifier="icon-l" />)}
            {/* </span> */}

          </div>
          )}
          {servings && (
          <div className="row width-a gap-5">
            <Icon iconName="people" modifier="icon-l" />
            <span>
              {' '}
              {servings}
            </span>

          </div>
          )}

          {displayTime && (
          <div className="row width-a gap-5">
            <Icon iconName="clock" modifier="icon-l" />
            <span>
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
                <li key={ingId}>
                  {`- ${ingName}: ${quantity}`}
                  <b>{ingUnit}</b>
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
              <li key={i}>
                {i + 1}
                .
                {' '}
                {ins}
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
