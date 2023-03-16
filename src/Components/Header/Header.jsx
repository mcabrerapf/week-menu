/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { MainContext, useMainContext } from '../../Context';
import {
  DISHES_STRING,
  DISH_STRING,
  INGREDIENTS_STRING,
  INGREDIENT_STRING,
  MENUS_STRING,
  MENU_STRING,
} from '../../constants';
import { capitalizeFirstLetter } from '../helpers';
import Button from '../Button';
import { useLongPress } from '../../Hooks';

function Header() {
  const {
    view, dishes, ingredients, setContextState,
  } = useMainContext(MainContext);

  const handleOnClick = (newView) => {
    if (newView !== view) setContextState('view', newView);
  };

  const handleCopyList = async (value) => {
    if (value === 'menu') return;
    const items = value === 'dish' ? dishes : ingredients;
    navigator.clipboard.writeText(JSON.stringify(items));
    console.log(`Copied ${value} list to clipboard`);
  };

  const longPressProps = useLongPress({
    onClick: ({ target: { value } }) => handleOnClick(value),
    onLongPress: ({ target: { value } }) => handleCopyList(value),
  });

  const checkIfSelected = (check) => (view === check ? 'selected' : '');

  return (
    <header className="header">
      <div className="header-buttons">
        <div className="view-buttons">
          <Button
            {...longPressProps}
            value={MENU_STRING}
            modifier={checkIfSelected(MENU_STRING)}
            buttonText={capitalizeFirstLetter(MENUS_STRING)}
          />
          <Button
            {...longPressProps}
            value={DISH_STRING}
            modifier={checkIfSelected(DISH_STRING)}
            buttonText={capitalizeFirstLetter(DISHES_STRING)}
          />
          <Button
            {...longPressProps}
            value={INGREDIENT_STRING}
            modifier={checkIfSelected(INGREDIENT_STRING)}
            buttonText={capitalizeFirstLetter(INGREDIENTS_STRING)}
          />
        </div>
        {/* <Button
          modifier="signout-button"
          onClick={signOut}
        >
          <i className="fa fa-sign-out" aria-hidden="true" />
        </Button> */}

      </div>
    </header>
  );
}

Header.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default Header;
