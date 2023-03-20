/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import {
  MainContext, ToastContext, useMainContext, useToastContext,
} from '../../Context';
import {
  DISH_STRING,
  INGREDIENT_STRING,
  MENU_STRING,
} from '../../constants';
import Button from '../Button';
import { useLongPress } from '../../Hooks';

function Header() {
  const {
    view, dishes, ingredients, setContextState,
  } = useMainContext(MainContext);
  const { addToast } = useToastContext(ToastContext);

  const handleOnClick = (newView) => {
    if (newView !== view) setContextState('view', newView);
  };

  const handleCopyList = (value) => {
    if (value === 'menu') return;
    const items = value === 'dish' ? dishes : ingredients;
    navigator.clipboard.writeText(JSON.stringify(items));
    addToast(`Copied ${value} list to clipboard`, 'info');
  };

  const longPressProps = useLongPress({
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
            buttonIcon={MENU_STRING}
            onClick={() => handleOnClick(MENU_STRING)}
          />
          <Button
            {...longPressProps}
            value={DISH_STRING}
            modifier={checkIfSelected(DISH_STRING)}
            buttonIcon={DISH_STRING}
            onClick={() => handleOnClick(DISH_STRING)}
          />
          <Button
            {...longPressProps}
            value={INGREDIENT_STRING}
            modifier={checkIfSelected(INGREDIENT_STRING)}
            buttonIcon={INGREDIENT_STRING}
            onClick={() => handleOnClick(INGREDIENT_STRING)}
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
