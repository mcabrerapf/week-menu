/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React from 'react';
import useFilterView from './useFilterView';
import { INGREDIENT_TYPES } from '../../../../constants/INGREDIENT';
import Button from '../../../Button';
import Icon from '../../../Icon';

function FilterView(props) {
  const {
    currentData,
    allIngredients,
    allDishes,
    showIngredients,
    showDishes,
    ingredientsArrowIcon,
    dishesArrowIcon,
    setShowIngredients,
    setShowDishes,
    handleButtonClick,
  } = useFilterView(props);

  const { filters: { ingredientTypes, ingredients, dishes } } = currentData;

  return (
    <div className="menu-builder-modal-content col pad-h-5 gap-5">
      <div className="row wrap gap-5 h-10">
        {INGREDIENT_TYPES
          .map(({ value }) => (
            <Button
              key={value}
              modifier="icon-l l"
              fakeDisabled={ingredientTypes.includes(value)}
              name="type"
              value={value}
              onClick={() => handleButtonClick(value, ingredientTypes.includes(value), 'ingredientTypes')}
            >
              <Icon iconName={value} />
            </Button>
          ))}
      </div>
      <div
        className="row pointer centered pad-5 gap-5 border-b"
        role="button"
        onClick={() => setShowIngredients(!showIngredients)}
      >
        <Icon modifier="icon-xl" iconName="ingredient" />
        <Icon modifier="icon" iconName={ingredientsArrowIcon} />
      </div>
      {showIngredients && (
      <div className="row wrap gap-5 h-10">
        {allIngredients.map(({ id, name }) => (
          <Button
            key={id}
            modifier="w-a"
            fakeDisabled={ingredients.includes(id)}
            onClick={() => handleButtonClick(id, ingredients.includes(id), 'ingredients')}
            name="ingredients"
            value={id}
          >
            {name}
          </Button>
        ))}
      </div>
      )}
      <div
        className="row pointer centered pad-5 gap-5 border-b"
        role="button"
        onClick={() => setShowDishes(!showDishes)}
      >
        <Icon modifier="icon-xl" iconName="dish" />
        <Icon modifier="icon" iconName={dishesArrowIcon} />
      </div>
      {showDishes && (
      <div className="row wrap gap-5 h-10">
        {allDishes.map(({ id, name }) => (
          <Button
            key={id}
            modifier="w-a"
            fakeDisabled={dishes.includes(id)}
            onClick={() => handleButtonClick(id, dishes.includes(id), 'dishes')}
            name="dishes"
            value={id}
          >
            {name}
          </Button>
        ))}
      </div>
      )}
    </div>
  );
}

export default FilterView;
