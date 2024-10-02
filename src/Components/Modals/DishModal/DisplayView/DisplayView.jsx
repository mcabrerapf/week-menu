/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './DisplayView.scss';
import Button from '../../../Button';
import Icon from '../../../Icon';
import { INGREDIENT_UNITS_MATCHES } from '../../../../constants/INGREDIENT';
import { ToastContext } from '../../../../Contexts';
import { copyDishToClipboard } from '../helpers';

function DisplayView({
  dishData,
  setModalView,
  hideFooter,
}) {
  const {
    types, servings, time, instructions, ingredients,
  } = dishData;
  const { addToast } = useContext(ToastContext);
  const displayTime = !!time && !!(time.hours || time.minutes);
  const displayTypes = !!types && !!types.length;

  const handleCopyDishToClipboard = () => {
    copyDishToClipboard(dishData);
    addToast('Coppied dish to clipboard', 'info');
  };

  return (
    <div className="dish-display-view col j-bet pad-10 gap-10 border-box">
      <div className="dish-display-view__info col gap-5">
        <div className="dish-display-view__info__header row j-bet pad-b-5 border-b">
          <div className="row centered gap-15">
            {displayTypes && (
            <div className="row w-a gap-5">
              {types.map((tType) => <Icon key={tType} iconName={tType} modifier="icon" />)}
            </div>
            )}
            {servings && (
            <div className="row w-a centered gap-10">
              <Icon iconName="people" modifier="icon" />
              <span className="font-l label">
                {servings}
              </span>
            </div>
            )}
            {displayTime && (
            <div className="row w-a centered gap-10">
              <Icon iconName="clock" modifier="icon" />
              <span className="font-l label">
                {time.hours}
                :
                {time.minutes}
              </span>
            </div>
            )}
          </div>
          <div className="row">
            <Button modifier="icon" onClick={handleCopyDishToClipboard}>
              <Icon iconName="clipboard" />
            </Button>
          </div>
        </div>
        <div className="dish-display-view__info-content col gap-10 overflow-y">
          {!!ingredients.length
        && (
        <ul className="col gap-5">
          {ingredients.map((ingredient) => {
            const {
              id: ingId, name: ingName, quantity, unit: ingUnit,
            } = ingredient;
            return (
              <li key={`${ingId}-${ingUnit}`} className="row gap-5 font-l text-a-l">
                <span>- </span>
                <span>{ingName}</span>
                <span className="label">
                  {quantity}
                  {INGREDIENT_UNITS_MATCHES[ingUnit]}
                </span>

              </li>
            );
          })}
        </ul>
        )}
          {instructions && (
          <div className="col border-t pad-t-10">
            <ul className="col gap-5">
              {instructions.map((ins, i) => (
                <li key={i} className="row gap-5 font-l text-a-l">
                  <span>{`${i + 1}.`}</span>
                  <span>{ins}</span>
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>
      </div>
      {!hideFooter && (
      <div className="dish-display-view__footer w-f col">
        <Button
          modifier="icon"
          onClick={() => {
            setModalView('edit');
          }}
        >
          <Icon iconName="edit" />
        </Button>
      </div>
      )}
    </div>
  );
}

DisplayView.propTypes = {
  dishData: PropTypes.shape(),
  setModalView: PropTypes.func,
  hideFooter: PropTypes.bool,
};

DisplayView.defaultProps = {
  dishData: {},
  setModalView: () => {},
  hideFooter: false,
};

export default DisplayView;
