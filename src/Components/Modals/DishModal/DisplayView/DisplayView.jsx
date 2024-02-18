/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import './DisplayView.css';
import Button from '../../../Button';
import Icon from '../../../Icon';
import { INGREDIENT_UNITS_MATCHES } from '../../../../constants/INGREDIENT';
import { orderIngredientsBySection } from '../../../helpers';

function DisplayView({
  dishData,
  setModalView,
}) {
  const {
    types, servings, time, instructions, ingredients,
  } = dishData;

  const displayTime = !!time && !!(time.hours || time.minutes);
  const displayTypes = !!types && !!types.length;
  const orderedIngredients = orderIngredientsBySection(ingredients);

  return (
    <div className="dish-display-view col j-bet pad-10 gap-10">
      <div className="display-view-info col gap-5">
        <div className="display-view-info-header row gap-20 pad-b-5 border-b">
          {displayTypes && (
          <div className="row width-a">
            {types.map((tType) => <Icon key={tType} iconName={tType} modifier="icon-l" />)}
          </div>
          )}
          {servings && (
          <div className="row w-a centered gap-10">
            <Icon iconName="people" modifier="icon-l" />
            <span className="label">
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
        <div className="display-view-info-content col gap-10 overflow-y">
          {!!orderedIngredients.length
        && (
        // TODO turnn nthis list into a component
        <div className="col gap-5">
          {orderedIngredients.map((ingredientSection) => {
            const { value, ingredients: sectionIngredients } = ingredientSection;
            return (
              <div className="col" key={value}>
                <div
                  className="row gap-5 w-10 pad-v-5 border-b"
                >
                  <Icon modifier="icon" iconName={value} />
                </div>
                <div className="col gap-10 pad-v-10">
                  {sectionIngredients.map((ingredient) => {
                    const {
                      id: ingId, name: ingName, quantity, unit: ingUnit,
                    } = ingredient;
                    return (
                      <li key={`${ingId}-${ingUnit}`} className="row gap-5 text-a-l">
                        <span>- </span>
                        <span>{ingName}</span>
                        <span className="label">
                          {quantity}
                          {INGREDIENT_UNITS_MATCHES[ingUnit]}
                        </span>

                      </li>
                    );
                  })}
                </div>
              </div>
            );
          })}
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
          <div className="col border-t pad-t-10">
            <ul className="col gap-5">
              {instructions.map((ins, i) => (
                <li key={i} className="row gap-5 text-a-l">
                  <span>{`${i + 1}.`}</span>
                  <span>{ins}</span>
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>
      </div>
      <div className="dish-footer">
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
